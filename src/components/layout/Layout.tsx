import { ReactNode } from "react";
import Navegacion from "./Navegacion";
import ControlLetra from "./ControlLetra";
import EstadoConexion from "./EstadoConexion";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  const esMovil = useIsMobile();

  return (
    <div className="flex min-h-screen">
      <Navegacion />
      <div className="flex-1 min-w-0">
        <header className="flex flex-wrap items-center justify-between gap-3 px-5 md:px-10 py-3 border-b-2 border-border bg-card">
          <span className="text-[1.05rem]">
            {esMovil ? <strong>INTEGRA</strong> : "Docentes de Agua bonita, San José del Guaviare"}
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <EstadoConexion />
            <ControlLetra />
          </div>
        </header>
        <main className={`px-5 md:px-10 py-6 ${esMovil ? "pb-28" : ""}`}>
          <div className="max-w-[880px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
