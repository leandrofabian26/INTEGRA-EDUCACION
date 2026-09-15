-- Esquema de INTEGRA para Supabase.
-- Pegar y ejecutar completo en: Panel de Supabase -> SQL Editor -> New query.

-- ---------- perfiles (datos de la cuenta que Auth no guarda) ----------
create table if not exists public.perfiles (
  id uuid primary key references auth.users (id) on delete cascade,
  correo text unique not null,
  nombre text not null,
  sede text not null default 'Vereda Agua bonita, San José del Guaviare',
  rol text not null default 'docente' check (rol in ('docente', 'facilitador')),
  creado_en timestamptz not null default now()
);

alter table public.perfiles enable row level security;

create policy "perfiles: lectura de cualquier usuario autenticado"
  on public.perfiles for select
  to authenticated
  using (true);

create policy "perfiles: cada quien crea/edita su propio perfil"
  on public.perfiles for all
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Sin esto, la política de arriba dejaría que cualquier docente se
-- autoasigne rol = 'facilitador' llamando directamente a la API. El
-- trigger revierte ese campo en cualquier cambio que llegue autenticado
-- como usuario normal (auth.role() = 'authenticated'); el cambio SÍ se
-- respeta cuando se hace desde el SQL Editor o el Table Editor de
-- Supabase (que no pasan por ese rol de la API).
create or replace function public.evitar_autoescalar_rol()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.role() = 'authenticated' and new.rol is distinct from old.rol then
    new.rol := old.rol;
  end if;
  return new;
end;
$$;

drop trigger if exists evitar_autoescalar_rol on public.perfiles;
create trigger evitar_autoescalar_rol
  before update on public.perfiles
  for each row
  execute function public.evitar_autoescalar_rol();

-- ---------- avance ----------
create table if not exists public.avance (
  correo text not null,
  modulo_id text not null,
  pasos_completados integer not null default 0,
  actualizado_en timestamptz not null default now(),
  primary key (correo, modulo_id)
);

alter table public.avance enable row level security;

create policy "avance: dueño lee y escribe lo suyo"
  on public.avance for all
  to authenticated
  using (correo = (select correo from public.perfiles where id = auth.uid()))
  with check (correo = (select correo from public.perfiles where id = auth.uid()));

-- ---------- foro ----------
create table if not exists public.foro (
  id text primary key,
  correo text not null,
  autor text not null,
  titulo text not null,
  texto text not null,
  creado_en timestamptz not null default now()
);

alter table public.foro enable row level security;

create policy "foro: cualquier autenticado lee"
  on public.foro for select to authenticated using (true);

create policy "foro: cada quien publica lo suyo"
  on public.foro for insert to authenticated
  with check (correo = (select correo from public.perfiles where id = auth.uid()));

-- ---------- respuestas del foro ----------
create table if not exists public.respuestas (
  id text primary key,
  mensaje_id text not null references public.foro (id) on delete cascade,
  correo text not null,
  autor text not null,
  texto text not null,
  creado_en timestamptz not null default now()
);

alter table public.respuestas enable row level security;

create policy "respuestas: cualquier autenticado lee"
  on public.respuestas for select to authenticated using (true);

create policy "respuestas: cada quien publica lo suyo"
  on public.respuestas for insert to authenticated
  with check (correo = (select correo from public.perfiles where id = auth.uid()));

-- ---------- cuestionarios ----------
create table if not exists public.cuestionarios (
  id text primary key,
  correo text not null,
  momento text not null check (momento in ('inicio', 'cierre')),
  respuestas jsonb not null,
  creado_en timestamptz not null default now()
);

alter table public.cuestionarios enable row level security;

create policy "cuestionarios: dueño lee y escribe lo suyo"
  on public.cuestionarios for all
  to authenticated
  using (correo = (select correo from public.perfiles where id = auth.uid()))
  with check (correo = (select correo from public.perfiles where id = auth.uid()));

-- ---------- chats privados ----------
create table if not exists public.chats (
  id text primary key,
  conversacion_id text not null,
  de text not null,
  para text not null,
  texto text not null,
  creado_en timestamptz not null default now(),
  leido boolean not null default false
);

alter table public.chats enable row level security;

create policy "chats: solo los dos participantes leen"
  on public.chats for select to authenticated
  using (
    (select correo from public.perfiles where id = auth.uid()) in (de, para)
  );

create policy "chats: cada quien envía lo suyo"
  on public.chats for insert to authenticated
  with check (de = (select correo from public.perfiles where id = auth.uid()));

create policy "chats: el destinatario puede marcar leído"
  on public.chats for update to authenticated
  using (para = (select correo from public.perfiles where id = auth.uid()))
  with check (para = (select correo from public.perfiles where id = auth.uid()));

-- ---------- eventos (registro de uso) ----------
create table if not exists public.eventos (
  id bigint generated always as identity primary key,
  correo text not null,
  tipo text not null,
  detalle text not null default '',
  fecha timestamptz not null default now(),
  en_linea boolean not null default true
);

alter table public.eventos enable row level security;

create policy "eventos: cada quien escribe lo suyo"
  on public.eventos for insert to authenticated
  with check (correo = (select correo from public.perfiles where id = auth.uid()));

-- ---------- materiales (archivos que suben los facilitadores) ----------
create table if not exists public.materiales (
  id text primary key,
  modulo_id text not null,
  nombre text not null,
  tipo text not null,
  tamanio_bytes bigint not null,
  storage_path text not null,
  subido_por text not null,
  creado_en timestamptz not null default now()
);

alter table public.materiales enable row level security;

create policy "materiales: cualquier autenticado lee"
  on public.materiales for select to authenticated using (true);

create policy "materiales: solo facilitadores publican"
  on public.materiales for insert to authenticated
  with check (
    exists (
      select 1 from public.perfiles
      where id = auth.uid() and rol = 'facilitador'
    )
  );

-- ---------- bucket de Storage para los archivos ----------
insert into storage.buckets (id, name, public)
values ('materiales', 'materiales', false)
on conflict (id) do nothing;

create policy "materiales-bucket: cualquier autenticado descarga"
  on storage.objects for select to authenticated
  using (bucket_id = 'materiales');

create policy "materiales-bucket: solo facilitadores suben"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'materiales'
    and exists (
      select 1 from public.perfiles
      where id = auth.uid() and rol = 'facilitador'
    )
  );
