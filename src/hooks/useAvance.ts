import { useCallback, useEffect, useState } from "react";
import { guardarAvance, leerAvance, registrarEvento, type Avance } from "@/lib/almacen";
import { modulos, type Modulo } from "@/content/modulos";
import { pasosDe } from "@/content/pasos";

/* Avance real del docente, leído y guardado en el equipo. */
export function useAvance(correo: string | undefined) {
  const [avance, setAvance] = useState<Avance[]>([]);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    if (!correo) return;
    leerAvance(correo).then((a) => { setAvance(a); setListo(true); });
  }, [correo]);

  const estadoDe = useCallback((modulo: Modulo) => {
    const a = avance.find((x) => x.moduloId === modulo.id);
    const hechos = Math.min(a?.pasosCompletados ?? 0, pasosDe(modulo.id).length);
    if (hechos === 0) return { tipo: "pendiente" as const, hechos };
    if (hechos >= pasosDe(modulo.id).length) return { tipo: "completado" as const, hechos };
    return { tipo: "en-curso" as const, hechos };
  }, [avance]);

  const completarPaso = useCallback(async (modulo: Modulo) => {
    if (!correo) return;
    const actual = avance.find((x) => x.moduloId === modulo.id)?.pasosCompletados ?? 0;
    const nuevo = Math.min(actual + 1, pasosDe(modulo.id).length);
    await guardarAvance(correo, modulo.id, nuevo);
    await registrarEvento(correo, nuevo >= pasosDe(modulo.id).length ? "modulo_completado" : "paso_completado", `${modulo.id}:${nuevo}/${pasosDe(modulo.id).length}`);
    setAvance(await leerAvance(correo));
  }, [correo, avance]);

  const reiniciarModulo = useCallback(async (modulo: Modulo) => {
    if (!correo) return;
    await guardarAvance(correo, modulo.id, 0);
    await registrarEvento(correo, "modulo_reiniciado", modulo.id);
    setAvance(await leerAvance(correo));
  }, [correo]);

  const completados = modulos.filter((m) => estadoDe(m).tipo === "completado").length;
  const enCurso = modulos.find((m) => estadoDe(m).tipo === "en-curso");
  const siguiente = enCurso ?? modulos.find((m) => estadoDe(m).tipo === "pendiente");

  return { avance, listo, estadoDe, completarPaso, reiniciarModulo, completados, enCurso, siguiente };
}
