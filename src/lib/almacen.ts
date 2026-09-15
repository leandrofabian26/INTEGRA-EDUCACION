/*
  Almacén local de INTEGRA (IndexedDB).
  Todo lo que el docente hace queda guardado en este equipo, con o sin internet:
  - usuarios: cuentas creadas en este computador
  - avance: pasos completados por módulo
  - foro: mensajes escritos (pendientes de enviar o ya enviados)
  - eventos: registro de uso para la investigación (exportable a CSV)
*/
import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import { supabase, supabaseConfigurado } from "./supabaseClient";

export type Usuario = {
  correo: string; nombre: string; claveHash: string; sede: string; creadoEn: string;
  rol?: "docente" | "facilitador"; sincronizado?: boolean;
};
export type Avance = { clave: string; correo: string; moduloId: string; pasosCompletados: number; actualizadoEn: string };
export type MensajeForo = {
  id: string; correo: string; autor: string; titulo: string; texto: string;
  creadoEn: string; estado: "pendiente" | "enviado"; enviadoEn?: string;
};
export type Evento = { id?: number; correo: string; tipo: string; detalle: string; fecha: string; enLinea: boolean; sincronizado?: boolean };
export type RespuestaForo = { id: string; mensajeId: string; correo: string; autor: string; texto: string; creadoEn: string; estado: "pendiente" | "enviado"; enviadoEn?: string };
export type Cuestionario = { id: string; correo: string; momento: "inicio" | "cierre"; respuestas: Record<string, string | number>; creadoEn: string };
export type MensajeChat = {
  id: string; conversacionId: string; de: string; para: string; texto: string;
  creadoEn: string; estado: "pendiente" | "enviado"; enviadoEn?: string; leido: boolean;
};
export type Material = {
  id: string; moduloId: string; nombre: string; tipo: string; tamanioBytes: number;
  storagePath: string; subidoPor: string; creadoEn: string; disponibleOffline: boolean; blob?: Blob;
};

interface EsquemaIntegra extends DBSchema {
  usuarios: { key: string; value: Usuario };
  avance: { key: string; value: Avance; indexes: { porCorreo: string } };
  foro: { key: string; value: MensajeForo; indexes: { porEstado: string } };
  eventos: { key: number; value: Evento; indexes: { porCorreo: string } };
  respuestas: { key: string; value: RespuestaForo; indexes: { porMensaje: string; porEstado: string } };
  cuestionarios: { key: string; value: Cuestionario; indexes: { porCorreo: string } };
  chats: { key: string; value: MensajeChat; indexes: { porConversacion: string; porPara: string } };
  materiales: { key: string; value: Material; indexes: { porModulo: string } };
}

let bd: Promise<IDBPDatabase<EsquemaIntegra>> | null = null;

function abrir() {
  if (!bd) {
    bd = openDB<EsquemaIntegra>("integra", 4, {
      upgrade(db, versionAnterior) {
        if (versionAnterior < 1) {
          db.createObjectStore("usuarios", { keyPath: "correo" });
          const av = db.createObjectStore("avance", { keyPath: "clave" });
          av.createIndex("porCorreo", "correo");
          const fo = db.createObjectStore("foro", { keyPath: "id" });
          fo.createIndex("porEstado", "estado");
          const ev = db.createObjectStore("eventos", { keyPath: "id", autoIncrement: true });
          ev.createIndex("porCorreo", "correo");
        }
        if (versionAnterior < 2) {
          const re = db.createObjectStore("respuestas", { keyPath: "id" });
          re.createIndex("porMensaje", "mensajeId");
          re.createIndex("porEstado", "estado");
          const cu = db.createObjectStore("cuestionarios", { keyPath: "id" });
          cu.createIndex("porCorreo", "correo");
        }
        if (versionAnterior < 3) {
          const ch = db.createObjectStore("chats", { keyPath: "id" });
          ch.createIndex("porConversacion", "conversacionId");
          ch.createIndex("porPara", "para");
        }
        if (versionAnterior < 4) {
          const ma = db.createObjectStore("materiales", { keyPath: "id" });
          ma.createIndex("porModulo", "moduloId");
        }
      },
    });
  }
  return bd;
}

const ahora = () => new Date().toISOString();

/* ---------- sesión (quién está usando el equipo ahora) ---------- */
const CLAVE_SESION = "integra:sesion";
export function sesionActual(): string | null {
  try { return localStorage.getItem(CLAVE_SESION); } catch { return null; }
}
export function iniciarSesion(correo: string) { localStorage.setItem(CLAVE_SESION, correo); }
export function cerrarSesion() { localStorage.removeItem(CLAVE_SESION); }

/* ---------- usuarios ---------- */
export async function hashClave(clave: string): Promise<string> {
  if (crypto?.subtle) {
    const datos = new TextEncoder().encode("integra|" + clave);
    const buf = await crypto.subtle.digest("SHA-256", datos);
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  return "plano:" + clave; // navegadores muy antiguos sin crypto.subtle
}

export async function crearUsuario(nombre: string, correo: string, clave: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const db = await abrir();
  const c = correo.trim().toLowerCase();
  if (await db.get("usuarios", c)) return { ok: false, error: "Ya existe una cuenta con ese correo en este equipo. Pruebe entrar." };
  await db.put("usuarios", {
    correo: c, nombre: nombre.trim(), claveHash: await hashClave(clave),
    sede: "Vereda Agua bonita, San José del Guaviare", creadoEn: ahora(), rol: "docente", sincronizado: false,
  });
  void vincularConNube(c, clave);
  return { ok: true };
}

export async function validarUsuario(correo: string, clave: string): Promise<Usuario | null> {
  const db = await abrir();
  const c = correo.trim().toLowerCase();
  const u = await db.get("usuarios", c);
  if (u) {
    if (u.claveHash !== (await hashClave(clave))) return null;
    if (!u.sincronizado) void vincularConNube(u.correo, clave);
    return u;
  }
  // No existe en este equipo: puede ser un docente entrando desde un
  // computador distinto al que usó para registrarse. Si hay señal, se
  // intenta con la cuenta de la nube y, si coincide, se copia localmente
  // para que desde ahora también funcione sin conexión en este equipo.
  return await entrarDesdeNube(c, clave);
}

async function entrarDesdeNube(correo: string, clave: string): Promise<Usuario | null> {
  if (!supabaseConfigurado || !supabase || !navigator.onLine) return null;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email: correo, password: clave });
    if (error || !data.user) return null;
    const { data: perfil } = await supabase.from("perfiles").select("*").eq("id", data.user.id).maybeSingle();
    if (!perfil) return null;
    const nuevo: Usuario = {
      correo, nombre: perfil.nombre, claveHash: await hashClave(clave),
      sede: perfil.sede, creadoEn: perfil.creado_en, rol: perfil.rol, sincronizado: true,
    };
    await (await abrir()).put("usuarios", nuevo);
    return nuevo;
  } catch {
    return null;
  }
}

/*
  Vincula la cuenta local con Supabase Auth: intenta iniciar sesión y, si la
  cuenta todavía no existe en la nube, la crea (sirve tanto para el registro
  como para logins posteriores en un equipo que estuvo sin conexión antes).
  Es "mejor esfuerzo": nunca bloquea ni hace fallar el registro/login local,
  y solo se usa la contraseña en texto plano en este momento, en memoria,
  para esta llamada — nunca se guarda así en el almacén local.
  Una vez que supabase-js guarda la sesión (localStorage del navegador), los
  siguientes reinicios de la app en este mismo equipo ya no necesitan repetir
  este paso para poder sincronizar.
*/
async function vincularConNube(correo: string, clave: string): Promise<void> {
  if (!supabaseConfigurado || !supabase || !navigator.onLine) return;
  try {
    let uid: string | null = null;
    const { data: sesion, error: errorEntrar } = await supabase.auth.signInWithPassword({ email: correo, password: clave });
    if (!errorEntrar && sesion.user) uid = sesion.user.id;
    if (!uid) {
      const { data: registro, error: errorRegistro } = await supabase.auth.signUp({ email: correo, password: clave });
      if (errorRegistro || !registro.user) return;
      uid = registro.user.id;
    }
    const db = await abrir();
    const local = await db.get("usuarios", correo);
    await supabase.from("perfiles").upsert({
      id: uid, correo, nombre: local?.nombre ?? correo,
      sede: local?.sede ?? "Vereda Agua bonita, San José del Guaviare",
    });
    if (local) await db.put("usuarios", { ...local, sincronizado: true });
  } catch {
    /* sin conexión real o error de red: la cuenta sigue funcionando local y se reintenta después */
  }
}

export async function obtenerUsuario(correo: string) {
  return (await abrir()).get("usuarios", correo);
}

export async function listarColegas(correoActual: string): Promise<Usuario[]> {
  const todos = await (await abrir()).getAll("usuarios");
  return todos.filter((u) => u.correo !== correoActual).sort((a, b) => a.nombre.localeCompare(b.nombre));
}

/* ---------- avance ---------- */
export async function leerAvance(correo: string): Promise<Avance[]> {
  return (await abrir()).getAllFromIndex("avance", "porCorreo", correo);
}

export async function guardarAvance(correo: string, moduloId: string, pasosCompletados: number) {
  const db = await abrir();
  await db.put("avance", { clave: `${correo}|${moduloId}`, correo, moduloId, pasosCompletados, actualizadoEn: ahora() });
}

/* ---------- foro ---------- */
export async function leerForo(): Promise<MensajeForo[]> {
  const todos = await (await abrir()).getAll("foro");
  return todos.sort((a, b) => b.creadoEn.localeCompare(a.creadoEn));
}

export async function publicarEnForo(correo: string, autor: string, titulo: string, texto: string, enLinea: boolean): Promise<MensajeForo> {
  const m: MensajeForo = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    correo, autor, titulo, texto, creadoEn: ahora(),
    estado: "pendiente",
  };
  await (await abrir()).put("foro", m);
  if (enLinea) void sincronizarPendientes();
  return m;
}

/*
  Sincronización real con Supabase. Si el proyecto no está configurado
  (falta el .env) o no hay una sesión de nube todavía en este equipo, no
  hace nada y todo sigue funcionando solo local, como antes — nunca se
  marca algo como "enviado" a menos que de verdad haya llegado al servidor.
*/
export async function sincronizarPendientes(): Promise<number> {
  const db = await abrir();
  if (!supabaseConfigurado || !supabase || !navigator.onLine) return 0;

  const { data: sesion } = await supabase.auth.getSession();
  if (!sesion.session) return 0;

  const enviados = (await empujarForo(db)) + (await empujarRespuestas(db)) + (await empujarChats(db));
  await empujarAvanceYCuestionarios(db);
  await empujarEventos(db);
  await traerCambiosRemotos(db);
  return enviados;
}

async function empujarForo(db: IDBPDatabase<EsquemaIntegra>): Promise<number> {
  const pendientes = await db.getAllFromIndex("foro", "porEstado", "pendiente");
  let n = 0;
  for (const m of pendientes) {
    const { error } = await supabase!.from("foro").upsert({
      id: m.id, correo: m.correo, autor: m.autor, titulo: m.titulo, texto: m.texto, creado_en: m.creadoEn,
    });
    if (!error) { await db.put("foro", { ...m, estado: "enviado", enviadoEn: ahora() }); n++; }
  }
  return n;
}

async function empujarRespuestas(db: IDBPDatabase<EsquemaIntegra>): Promise<number> {
  const pendientes = await db.getAllFromIndex("respuestas", "porEstado", "pendiente");
  let n = 0;
  for (const r of pendientes) {
    const { error } = await supabase!.from("respuestas").upsert({
      id: r.id, mensaje_id: r.mensajeId, correo: r.correo, autor: r.autor, texto: r.texto, creado_en: r.creadoEn,
    });
    if (!error) { await db.put("respuestas", { ...r, estado: "enviado", enviadoEn: ahora() }); n++; }
  }
  return n;
}

async function empujarChats(db: IDBPDatabase<EsquemaIntegra>): Promise<number> {
  const pendientes = (await db.getAll("chats")).filter((m) => m.estado === "pendiente");
  let n = 0;
  for (const m of pendientes) {
    const { error } = await supabase!.from("chats").upsert({
      id: m.id, conversacion_id: m.conversacionId, de: m.de, para: m.para, texto: m.texto, creado_en: m.creadoEn, leido: m.leido,
    });
    if (!error) { await db.put("chats", { ...m, estado: "enviado", enviadoEn: ahora() }); n++; }
  }
  return n;
}

/* PK natural (correo+módulo, o id) del lado remoto: repetir el upsert cada ciclo es seguro. */
async function empujarAvanceYCuestionarios(db: IDBPDatabase<EsquemaIntegra>): Promise<void> {
  const correo = sesionActual();
  if (!correo) return;
  const avances = await db.getAllFromIndex("avance", "porCorreo", correo);
  for (const a of avances) {
    await supabase!.from("avance").upsert({
      correo: a.correo, modulo_id: a.moduloId, pasos_completados: a.pasosCompletados, actualizado_en: a.actualizadoEn,
    });
  }
  const cuestionarios = await db.getAllFromIndex("cuestionarios", "porCorreo", correo);
  for (const c of cuestionarios) {
    await supabase!.from("cuestionarios").upsert({
      id: c.id, correo: c.correo, momento: c.momento, respuestas: c.respuestas, creado_en: c.creadoEn,
    });
  }
}

async function empujarEventos(db: IDBPDatabase<EsquemaIntegra>): Promise<void> {
  const correo = sesionActual();
  if (!correo) return;
  const propios = (await db.getAllFromIndex("eventos", "porCorreo", correo)).filter((e) => !e.sincronizado);
  for (const e of propios) {
    const { error } = await supabase!.from("eventos").insert({
      correo: e.correo, tipo: e.tipo, detalle: e.detalle, fecha: e.fecha, en_linea: e.enLinea,
    });
    if (!error && e.id !== undefined) await db.put("eventos", { ...e, sincronizado: true });
  }
}

/*
  Trae lo que hayan publicado colegas desde otros equipos: foro, respuestas
  y material. El "leído" del chat queda local (nunca se sobrescribe de
  vuelta a "no leído": es un límite conocido, no un descuido).
*/
async function traerCambiosRemotos(db: IDBPDatabase<EsquemaIntegra>): Promise<void> {
  const correo = sesionActual();
  if (!correo) return;

  const { data: perfil } = await supabase!.from("perfiles").select("nombre, sede, rol").eq("correo", correo).maybeSingle();
  if (perfil) {
    const local = await db.get("usuarios", correo);
    if (local) await db.put("usuarios", { ...local, rol: perfil.rol, sede: perfil.sede ?? local.sede });
  }

  const { data: foroRemoto } = await supabase!.from("foro").select("*");
  for (const f of foroRemoto ?? []) {
    await db.put("foro", {
      id: f.id, correo: f.correo, autor: f.autor, titulo: f.titulo, texto: f.texto,
      creadoEn: f.creado_en, estado: "enviado", enviadoEn: f.creado_en,
    });
  }

  const { data: respuestasRemotas } = await supabase!.from("respuestas").select("*");
  for (const r of respuestasRemotas ?? []) {
    await db.put("respuestas", {
      id: r.id, mensajeId: r.mensaje_id, correo: r.correo, autor: r.autor, texto: r.texto,
      creadoEn: r.creado_en, estado: "enviado", enviadoEn: r.creado_en,
    });
  }

  const { data: chatsRemotos } = await supabase!.from("chats").select("*");
  for (const m of chatsRemotos ?? []) {
    const existente = await db.get("chats", m.id);
    await db.put("chats", {
      id: m.id, conversacionId: m.conversacion_id, de: m.de, para: m.para, texto: m.texto,
      creadoEn: m.creado_en, estado: "enviado", enviadoEn: m.creado_en,
      leido: (existente?.leido ?? false) || m.leido,
    });
  }

  const { data: materialesRemotos } = await supabase!.from("materiales").select("*");
  for (const mat of materialesRemotos ?? []) {
    const existente = await db.get("materiales", mat.id);
    await db.put("materiales", {
      id: mat.id, moduloId: mat.modulo_id, nombre: mat.nombre, tipo: mat.tipo,
      tamanioBytes: mat.tamanio_bytes, storagePath: mat.storage_path, subidoPor: mat.subido_por,
      creadoEn: mat.creado_en, disponibleOffline: existente?.disponibleOffline ?? false, blob: existente?.blob,
    });
  }
}

/* ---------- material de los módulos ---------- */
export async function listarMateriales(moduloId: string): Promise<Material[]> {
  const todos = await (await abrir()).getAllFromIndex("materiales", "porModulo", moduloId);
  return todos.sort((a, b) => b.creadoEn.localeCompare(a.creadoEn));
}

export async function subirMaterial(moduloId: string, archivo: File, correo: string): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!supabaseConfigurado || !supabase) return { ok: false, error: "Subir material requiere tener configurado el proyecto en la nube." };
  if (!navigator.onLine) return { ok: false, error: "No hay conexión a internet en este momento. Intente cuando vuelva la señal." };

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const ruta = `${moduloId}/${id}-${archivo.name}`;
  const { error: errorSubida } = await supabase.storage.from("materiales").upload(ruta, archivo);
  if (errorSubida) return { ok: false, error: "No se pudo subir el archivo: " + errorSubida.message };

  const fila = {
    id, modulo_id: moduloId, nombre: archivo.name, tipo: archivo.type || "application/octet-stream",
    tamanio_bytes: archivo.size, storage_path: ruta, subido_por: correo,
  };
  const { error: errorFila } = await supabase.from("materiales").insert(fila);
  if (errorFila) return { ok: false, error: "El archivo se subió pero no se pudo registrar: " + errorFila.message };

  await (await abrir()).put("materiales", {
    id, moduloId, nombre: fila.nombre, tipo: fila.tipo, tamanioBytes: fila.tamanio_bytes,
    storagePath: ruta, subidoPor: correo, creadoEn: ahora(), disponibleOffline: false,
  });
  return { ok: true };
}

export async function descargarMaterial(id: string): Promise<Blob | null> {
  const db = await abrir();
  const material = await db.get("materiales", id);
  if (!material) return null;
  if (material.blob) return material.blob;
  if (!navigator.onLine || !supabaseConfigurado || !supabase) return null;
  const { data, error } = await supabase.storage.from("materiales").download(material.storagePath);
  if (error || !data) return null;
  await db.put("materiales", { ...material, blob: data, disponibleOffline: true });
  return data;
}

/* ---------- respuestas del foro ---------- */
export async function leerRespuestas(mensajeId: string): Promise<RespuestaForo[]> {
  const r = await (await abrir()).getAllFromIndex("respuestas", "porMensaje", mensajeId);
  return r.sort((a, b) => a.creadoEn.localeCompare(b.creadoEn));
}

export async function contarRespuestas(): Promise<Record<string, number>> {
  const todas = await (await abrir()).getAll("respuestas");
  return todas.reduce<Record<string, number>>((acc, r) => { acc[r.mensajeId] = (acc[r.mensajeId] ?? 0) + 1; return acc; }, {});
}

export async function responderEnForo(mensajeId: string, correo: string, autor: string, texto: string, enLinea: boolean) {
  const r: RespuestaForo = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    mensajeId, correo, autor, texto, creadoEn: ahora(),
    estado: "pendiente",
  };
  await (await abrir()).put("respuestas", r);
  if (enLinea) void sincronizarPendientes();
  return r;
}

/* ---------- cuestionario de autopercepción ---------- */
export async function guardarCuestionario(correo: string, momento: "inicio" | "cierre", respuestas: Record<string, string | number>) {
  const c: Cuestionario = { id: `${correo}|${momento}|${Date.now()}`, correo, momento, respuestas, creadoEn: ahora() };
  await (await abrir()).put("cuestionarios", c);
  return c;
}

export async function cuestionariosDe(correo: string): Promise<Cuestionario[]> {
  return (await abrir()).getAllFromIndex("cuestionarios", "porCorreo", correo);
}

export async function leerCuestionarios(): Promise<Cuestionario[]> {
  return (await abrir()).getAll("cuestionarios");
}

export function cuestionariosACSV(lista: Cuestionario[], claves: string[]): string {
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const filas = lista.map((c) => [c.creadoEn, c.correo, c.momento, ...claves.map((k) => c.respuestas[k])].map(esc).join(";"));
  return ["fecha;usuario;momento;" + claves.join(";"), ...filas].join("\n");
}

/*
  ---------- chat privado (uno a uno, entre colegas de la misma sede) ----------
  Mismo almacén local que el resto: los dos participantes usan este mismo
  equipo, así que no hace falta servidor para que se "envíen" el mensaje.
  Solo se puede leer la conversación pidiendo los dos correos exactos, así
  que nunca aparece mezclada con el foro público.
*/
function idConversacion(a: string, b: string): string {
  return [a, b].map((c) => c.trim().toLowerCase()).sort().join("|");
}

export async function enviarMensajeChat(de: string, para: string, texto: string, enLinea: boolean): Promise<MensajeChat> {
  const m: MensajeChat = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    conversacionId: idConversacion(de, para),
    de, para, texto: texto.trim(), creadoEn: ahora(),
    estado: "pendiente",
    leido: false,
  };
  await (await abrir()).put("chats", m);
  if (enLinea) void sincronizarPendientes();
  return m;
}

export async function leerConversacion(a: string, b: string): Promise<MensajeChat[]> {
  const mensajes = await (await abrir()).getAllFromIndex("chats", "porConversacion", idConversacion(a, b));
  return mensajes.sort((x, y) => x.creadoEn.localeCompare(y.creadoEn));
}

export async function marcarConversacionLeida(propio: string, otro: string) {
  const db = await abrir();
  const sinLeer = (await db.getAllFromIndex("chats", "porConversacion", idConversacion(propio, otro)))
    .filter((m) => m.para === propio && !m.leido);
  for (const m of sinLeer) await db.put("chats", { ...m, leido: true });
}

export async function listarConversaciones(correo: string): Promise<{ colega: Usuario; ultimo: MensajeChat | null; noLeidos: number }[]> {
  const colegas = await listarColegas(correo);
  const filas = await Promise.all(colegas.map(async (colega) => {
    const mensajes = await leerConversacion(correo, colega.correo);
    const ultimo = mensajes.length ? mensajes[mensajes.length - 1] : null;
    const noLeidos = mensajes.filter((m) => m.para === correo && !m.leido).length;
    return { colega, ultimo, noLeidos };
  }));
  return filas.sort((a, b) => {
    if (!a.ultimo && !b.ultimo) return a.colega.nombre.localeCompare(b.colega.nombre);
    if (!a.ultimo) return 1;
    if (!b.ultimo) return -1;
    return b.ultimo.creadoEn.localeCompare(a.ultimo.creadoEn);
  });
}

export async function contarChatsNoLeidos(correo: string): Promise<number> {
  const recibidos = await (await abrir()).getAllFromIndex("chats", "porPara", correo);
  return recibidos.filter((m) => !m.leido).length;
}

/* ---------- eventos (registro de uso) ---------- */
export async function registrarEvento(correo: string, tipo: string, detalle = "") {
  try {
    await (await abrir()).add("eventos", { correo, tipo, detalle, fecha: ahora(), enLinea: navigator.onLine });
  } catch { /* el registro nunca debe interrumpir al docente */ }
}

export async function leerEventos(): Promise<Evento[]> {
  return (await abrir()).getAll("eventos");
}

export function eventosACSV(eventos: Evento[]): string {
  const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
  const filas = eventos.map((e) => [e.fecha, e.correo, e.tipo, e.detalle, e.enLinea ? "con conexión" : "sin conexión"].map(esc).join(";"));
  return ["fecha;usuario;evento;detalle;conexion", ...filas].join("\n");
}
