import { useEffect, useState } from "react";

/* Estado de la conexión a internet, actualizado en tiempo real. */
export function useConexion() {
  const [enLinea, setEnLinea] = useState<boolean>(typeof navigator === "undefined" ? true : navigator.onLine);
  useEffect(() => {
    const on = () => setEnLinea(true);
    const off = () => setEnLinea(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);
  return enLinea;
}
