import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import EstadoModulo from "@/components/EstadoModulo";
import { modulos } from "@/content/modulos";
import { pasosDe } from "@/content/pasos";
import { useSesion } from "@/hooks/useSesion";
import { useAvance } from "@/hooks/useAvance";
import { Clock, WifiOff, Wifi, ArrowRight } from "lucide-react";

export default function Modulos() {
  const { usuario } = useSesion();
  const { estadoDe } = useAvance(usuario?.correo);

  return (
    <Layout>
      <PageHeader title="Mis módulos" description="Seis módulos cortos, en orden. Cada uno se hace paso a paso y puede repetirse las veces que quiera." />

      <ol className="space-y-4">
        {modulos.map((m) => {
          const estado = estadoDe(m);
          return (
            <li key={m.id} className="panel">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2>Módulo {m.numero}: {m.titulo}</h2>
                  <EstadoModulo tipo={estado.tipo} hechos={estado.hechos} total={pasosDe(m.id).length} />
                </div>
                <p>{m.paraQue}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-base">
                  <span className="inline-flex items-center gap-2"><Clock className="h-5 w-5" aria-hidden="true" /> {m.duracion} · {pasosDe(m.id).length} pasos</span>
                  {m.necesitaInternet ? (
                    <span className="inline-flex items-center gap-2 text-integra-ambar font-bold"><Wifi className="h-5 w-5" aria-hidden="true" /> Necesita señal de internet</span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-integra-selva font-bold"><WifiOff className="h-5 w-5" aria-hidden="true" /> Funciona sin internet</span>
                  )}
                </div>
                <div>
                  <Link to={`/modulos/${m.id}`} className={estado.tipo === "en-curso" ? "btn-principal" : "btn-secundario"}>
                    {estado.tipo === "completado" ? "Repasar" : estado.tipo === "en-curso" ? "Continuar" : "Empezar"}
                    <ArrowRight className="h-6 w-6" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
}
