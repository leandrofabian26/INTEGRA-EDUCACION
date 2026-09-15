import { useEffect, useState } from "react";
import { supabaseConfigurado } from "@/lib/supabaseClient";

const URL_SUPABASE = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const REVISION_PERIODICA_MS = 4 * 60 * 1000; // 4 minutos

/*
  En la sede la señal es intermitente, no binaria: a veces el navegador cree
  que hay conexión (navigator.onLine) pero en realidad no llega a ningún
  lado, o al revés, se recupera sin que el evento "online" se dispare de
  forma confiable. Por eso, además de escuchar esos eventos, cada pocos
  minutos se hace una comprobación real y liviana contra el propio proyecto.
*/
async function hayConexionReal(): Promise<boolean> {
  if (typeof navigator !== "undefined" && !navigator.onLine) return false;
  if (!supabaseConfigurado || !URL_SUPABASE) return typeof navigator === "undefined" ? true : navigator.onLine;
  try {
    await fetch(`${URL_SUPABASE}/auth/v1/health`, { method: "GET", cache: "no-store" });
    return true;
  } catch {
    return false;
  }
}

/* Estado de la conexión a internet, actualizado en tiempo real y revisado cada pocos minutos. */
export function useConexion() {
  const [enLinea, setEnLinea] = useState<boolean>(typeof navigator === "undefined" ? true : navigator.onLine);

  useEffect(() => {
    const on = () => setEnLinea(true);
    const off = () => setEnLinea(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);

    const intervalo = setInterval(() => { hayConexionReal().then(setEnLinea); }, REVISION_PERIODICA_MS);

    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
      clearInterval(intervalo);
    };
  }, []);

  return enLinea;
}
