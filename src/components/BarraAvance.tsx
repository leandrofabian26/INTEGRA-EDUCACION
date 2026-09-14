/* Barra de avance con texto explícito (no depende del color). */
export default function BarraAvance({ hechos, total, etiqueta }: { hechos: number; total: number; etiqueta?: string }) {
  const pct = total === 0 ? 0 : Math.round((hechos / total) * 100);
  return (
    <div>
      <div className="flex justify-between text-base mb-1">
        <span>{etiqueta ?? "Avance"}</span>
        <span className="font-bold">{hechos} de {total} pasos</span>
      </div>
      <div
        className="w-full h-4 rounded-full bg-integra-arena border border-border overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={hechos}
        aria-label={etiqueta ?? "Avance"}
      >
        <div className={`h-full ${pct === 100 ? "bg-integra-selva" : "bg-primary"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
