import { useEffect, useRef, useState } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { useConexion } from "@/hooks/useConexion";
import { registrarEvento, sesionActual, sincronizarPendientes } from "@/lib/almacen";

/*
  Indicador siempre visible. Cuando vuelve la señal, envía lo pendiente y
  avisa en una frase completa.
*/
export default function EstadoConexion() {
  const enLinea = useConexion();
  const [aviso, setAviso] = useState("");
  const anterior = useRef<boolean | null>(null);

  useEffect(() => {
    const correo = sesionActual() ?? "anonimo";
    if (anterior.current !== null && anterior.current !== enLinea) {
      registrarEvento(correo, "conexion", enLinea ? "recuperada" : "perdida");
    }
    anterior.current = enLinea;

    if (enLinea) {
      sincronizarPendientes().then((n) => {
        if (n > 0) {
          registrarEvento(correo, "sincronizacion", `${n} mensajes enviados`);
          setAviso(`Volvió la señal: se sincronizaron ${n === 1 ? "1 mensaje pendiente" : `${n} mensajes pendientes`}.`);
          setTimeout(() => setAviso(""), 8000);
        }
      });
    }
  }, [enLinea]);

  return (
    <div className="flex flex-col items-end gap-1">
      <span
        role="status"
        className={`inline-flex items-center gap-2 rounded-md px-3 py-1 text-base font-bold border-2 ${
          enLinea ? "bg-integra-selvaClaro text-integra-selva border-integra-selva" : "bg-integra-ambarClaro text-integra-ambar border-integra-ambar"
        }`}
      >
        {enLinea ? <Wifi className="h-5 w-5" aria-hidden="true" /> : <WifiOff className="h-5 w-5" aria-hidden="true" />}
        {enLinea ? "Con conexión" : "Sin conexión: todo se guarda en este equipo"}
      </span>
      {aviso && <span role="status" className="text-base font-bold text-integra-selva">{aviso}</span>}
    </div>
  );
}
