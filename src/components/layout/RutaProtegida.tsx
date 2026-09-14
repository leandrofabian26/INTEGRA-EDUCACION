import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSesion } from "@/hooks/useSesion";

/* Si nadie ha entrado en este equipo, lleva a la pantalla de entrar. */
export default function RutaProtegida({ children }: { children: ReactNode }) {
  const { usuario, cargando } = useSesion();
  if (cargando) return <p className="p-8 text-[1.1rem]">Cargando…</p>;
  if (!usuario) return <Navigate to="/entrar" replace />;
  return <>{children}</>;
}
