import { useCallback, useEffect, useState } from "react";

/*
  Escala de letra de toda la interfaz. Se guarda en el equipo (localStorage)
  para que el docente la encuentre igual la próxima vez, sin conexión.
*/
const CLAVE = "integra:escala";
export const ESCALAS = [1, 1.15, 1.3, 1.5] as const;

function leer(): number {
  try {
    const v = Number(localStorage.getItem(CLAVE));
    return ESCALAS.includes(v as (typeof ESCALAS)[number]) ? v : 1;
  } catch {
    return 1;
  }
}

function aplicar(escala: number) {
  document.documentElement.style.setProperty("--escala", String(escala));
}

export function useEscalaLetra() {
  const [escala, setEscala] = useState<number>(leer);

  useEffect(() => {
    aplicar(escala);
    try { localStorage.setItem(CLAVE, String(escala)); } catch { /* sin almacenamiento */ }
  }, [escala]);

  const indice = ESCALAS.indexOf(escala as (typeof ESCALAS)[number]);
  const aumentar = useCallback(() => setEscala(ESCALAS[Math.min(indice + 1, ESCALAS.length - 1)]), [indice]);
  const reducir = useCallback(() => setEscala(ESCALAS[Math.max(indice - 1, 0)]), [indice]);

  return {
    escala,
    aumentar,
    reducir,
    puedeAumentar: indice < ESCALAS.length - 1,
    puedeReducir: indice > 0,
  };
}

/* Se llama una vez al arrancar la app para que la escala guardada se aplique antes del primer render. */
export function aplicarEscalaGuardada() {
  aplicar(leer());
}
