import { CheckCircle2, CircleDot, Circle } from "lucide-react";

type Tipo = "pendiente" | "en-curso" | "completado";

/* Etiqueta de estado: siempre icono + texto, nunca solo color. */
export default function EstadoModulo({ tipo, hechos, total }: { tipo: Tipo; hechos: number; total: number }) {
  if (tipo === "completado") {
    return (
      <span className="inline-flex items-center gap-2 rounded-md bg-integra-selvaClaro text-integra-selva font-bold px-3 py-1 text-base">
        <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> Completado
      </span>
    );
  }
  if (tipo === "en-curso") {
    return (
      <span className="inline-flex items-center gap-2 rounded-md bg-integra-ambarClaro text-integra-ambar font-bold px-3 py-1 text-base">
        <CircleDot className="h-5 w-5" aria-hidden="true" /> En curso: {hechos} de {total} pasos
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 rounded-md bg-integra-arenaClaro text-foreground font-bold px-3 py-1 text-base">
      <Circle className="h-5 w-5" aria-hidden="true" /> Sin empezar
    </span>
  );
}
