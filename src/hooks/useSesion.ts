import { useEffect, useState } from "react";
import { obtenerUsuario, sesionActual, type Usuario } from "@/lib/almacen";

/* Usuario que está usando el equipo. `cargando` evita parpadeos al entrar. */
export function useSesion() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const correo = sesionActual();
    if (!correo) { setCargando(false); return; }
    obtenerUsuario(correo).then((u) => { setUsuario(u ?? null); setCargando(false); });
  }, []);

  return { usuario, cargando };
}
