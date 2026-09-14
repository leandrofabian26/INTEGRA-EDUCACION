import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import BarraAvance from "@/components/BarraAvance";
import EstadoModulo from "@/components/EstadoModulo";
import { modulos } from "@/content/modulos";
import { useSesion } from "@/hooks/useSesion";
import { useAvance } from "@/hooks/useAvance";

export default function Avance() {
  const { usuario } = useSesion();
  const { estadoDe, completados } = useAvance(usuario?.correo);
  const totalPasos = modulos.reduce((s, m) => s + m.pasos, 0);
  const hechos = modulos.reduce((s, m) => s + estadoDe(m).hechos, 0);

  return (
    <Layout>
      <PageHeader title="Mi avance" description="Aquí puede ver cuánto ha recorrido. No hay prisa: cada paso cuenta." />

      <section className="panel mb-8">
        <p className="text-[1.3rem] font-bold mb-4">{completados} de {modulos.length} módulos completados</p>
        <BarraAvance hechos={hechos} total={totalPasos} etiqueta="Pasos en total" />
      </section>

      <ol className="space-y-3">
        {modulos.map((m) => {
          const e = estadoDe(m);
          return (
            <li key={m.id} className="panel flex flex-wrap items-center justify-between gap-3">
              <Link to={`/modulos/${m.id}`} className="font-bold text-[1.1rem]">Módulo {m.numero}: {m.titulo}</Link>
              <EstadoModulo tipo={e.tipo} hechos={e.hechos} total={m.pasos} />
            </li>
          );
        })}
      </ol>
    </Layout>
  );
}
