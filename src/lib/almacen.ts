/*
  Almacén local de INTEGRA (IndexedDB).
  Todo lo que el docente hace queda guardado en este equipo, con o sin internet:
  - usuarios: cuentas creadas en este computador
  - avance: pasos completados por módulo
  - foro: mensajes escritos (pendientes de enviar o ya enviados)
  - eventos: registro de uso para la investigación (exportable a CSV)
*/
import { openDB, type DBSchema, type IDBPDatabase } from "idb";

export type Usuario = { correo: string; nombre: string; claveHash: string; sede: string; creadoEn: string };
export type Avance = { clave: string; correo: string; moduloId: string; pasosCompletados: number; actualizadoEn: string };
export type MensajeForo = {
  id: string; correo: string; autor: string; titulo: string; texto: string;
  creadoEn: string; estado: "pendiente" | "enviado"; enviadoEn?: string;
};
export type Evento = { id?: number; correo: string; tipo: string; detalle: string; fecha: string; enLinea: boolean };

interface EsquemaIntegra extends DBSchema {
  usuarios: { key: string; value: Usuario };
  avance: { key: string; value: Avance; indexes: { porCorreo: string } };
  foro: { key: string; value: MensajeForo; indexes: { porEstado: string } };
  eventos: { key: number; value: Evento; indexes: { porCorreo: string } };
}

let bd: Promise<IDBPDatabase<EsquemaIntegra>> | null = null;

function abrir() {
  if (!bd) {
    bd = openDB<EsquemaIntegra>("integra", 1, {
      upgrade(db) {
        db.createObjectStore("usuarios", { keyPath: "correo" });
        const av = db.createObjectStore("avance", { keyPath: "clave" });
        av.createIndex("porCorreo", "correo");
        const fo = db.createObjectStore("foro", { keyPath: "id" });
        fo.createIndex("porEstado", "estado");
        const ev = db.createObjectStore("eventos", { keyPath: "id", autoIncrement: true });
        ev.createIndex("porCorreo", "correo");
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
  await db.put("usuarios", { correo: c, nombre: nombre.trim(), claveHash: await hashClave(clave), sede: "Vereda Agua bonita, San José del Guaviare", creadoEn: ahora() });
  return { ok: true };
}

export async function validarUsuario(correo: string, clave: string): Promise<Usuario | null> {
  const db = await abrir();
  const u = await db.get("usuarios", correo.trim().toLowerCase());
  if (!u) return null;
  return u.claveHash === (await hashClave(clave)) ? u : null;
}

export async function obtenerUsuario(correo: string) {
  return (await abrir()).get("usuarios", correo);
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
    estado: enLinea ? "enviado" : "pendiente",
    enviadoEn: enLinea ? ahora() : undefined,
  };
  await (await abrir()).put("foro", m);
  return m;
}

/*
  Sincronización: cuando vuelve la señal, los mensajes pendientes se marcan como
  enviados. Cuando exista un servidor, este es el único punto que hay que
  conectar (enviar cada mensaje y esperar confirmación antes de marcarlo).
*/
export async function sincronizarPendientes(): Promise<number> {
  const db = await abrir();
  const pendientes = await db.getAllFromIndex("foro", "porEstado", "pendiente");
  for (const m of pendientes) {
    await db.put("foro", { ...m, estado: "enviado", enviadoEn: ahora() });
  }
  return pendientes.length;
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
