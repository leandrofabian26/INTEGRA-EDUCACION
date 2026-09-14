import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { modulos, avanceEjemplo, estadoDe } from "@/content/modulos";
import BarraAvance from "@/components/BarraAvance";
import { ArrowRight, MessageSquare, HelpCircle } from "lucide-react";

/* Inicio: una sola cosa importante — continuar donde quedó. */
export default function Dashboard() {
  const nombre = "docente"; // Entrega 2: nombre real guardado en el equipo
  const enCurso = modulos.find((m) => estadoDe(m, avanceEjemplo).tipo === "en-curso");
  const siguiente = enCurso ?? modulos.find((m) => estadoDe(m, avanceEjemplo).tipo === "pendiente");
  const completados = modulos.filter((m) => estadoDe(m, avanceEjemplo).tipo === "completado").length;

  return (
    <Layout>
      <h1 className="mb-8">Buen día, {nombre}.</h1>

      {siguiente && (
        <section className="panel border-primary bg-integra-rioClaro mb-10">
          <p className="text-base font-bold mb-2">{enCurso ? "Continuar donde quedé" : "Siguiente módulo"}</p>
          <h2 className="mb-3">Módulo {siguiente.numero}: {siguiente.titulo}</h2>
          <p className="mb-5">{siguiente.paraQue}</p>
          {enCurso && (
            <div className="mb-6">
              <BarraAvance hechos={estadoDe(siguiente, avanceEjemplo).hechos} total={siguiente.pasos} />
            </div>
          )}
          <Link to={`/modulos/${siguiente.id}`} className="btn-principal">
            {enCurso ? "Continuar" : "Empezar"} <ArrowRight className="h-6 w-6" aria-hidden="true" />
          </Link>
        </section>
      )}

      <section className="mb-10">
        <h2 className="mb-3">Mi avance</h2>
        <p className="mb-4">
          Lleva <strong>{completados} de {modulos.length}</strong> módulos completados.
        </p>
        <Link to="/avance" className="btn-secundario">Ver todo mi avance</Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link to="/foro" className="panel no-underline text-foreground hover:bg-secondary flex items-start gap-4">
          <MessageSquare className="h-8 w-8 text-primary shrink-0" aria-hidden="true" />
          <span>
            <span className="block font-bold text-[1.15rem]">Foro</span>
            <span className="block">Pregunte o comparta con los colegas de la sede.</span>
          </span>
        </Link>
        <Link to="/ayuda" className="panel no-underline text-foreground hover:bg-secondary flex items-start gap-4">
          <HelpCircle className="h-8 w-8 text-primary shrink-0" aria-hidden="true" />
          <span>
            <span className="block font-bold text-[1.15rem]">Ayuda</span>
            <span className="block">Qué hacer si algo no funciona o se traba.</span>
          </span>
        </Link>
      </section>
    </Layout>
  );
}
