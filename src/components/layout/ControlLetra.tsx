import { useEscalaLetra } from "@/lib/fontSize";

/* Botones A− / A+ para agrandar o reducir toda la interfaz. */
export default function ControlLetra() {
  const { aumentar, reducir, puedeAumentar, puedeReducir } = useEscalaLetra();

  const base =
    "min-w-[3rem] min-h-[3rem] rounded-lg border-2 border-primary bg-card text-primary font-bold text-lg disabled:opacity-40 disabled:border-muted-foreground disabled:text-muted-foreground hover:enabled:bg-secondary";

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Tamaño de la letra">
      <span className="text-base font-bold mr-1">Letra</span>
      <button type="button" className={base} onClick={reducir} disabled={!puedeReducir} aria-label="Letra más pequeña">
        A−
      </button>
      <button type="button" className={base} onClick={aumentar} disabled={!puedeAumentar} aria-label="Letra más grande">
        A+
      </button>
    </div>
  );
}
