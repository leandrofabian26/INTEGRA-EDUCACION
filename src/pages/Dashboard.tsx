import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { modulos } from "@/content/modulos";
import { pasosDe } from "@/content/pasos";
import BarraAvance from "@/components/BarraAvance";
import { useSesion } from "@/hooks/useSesion";
import { useAvance } from "@/hooks/useAvance";
import { ArrowRight, MessageSquare, HelpCircle, ClipboardList } from "lucide-react";
import { useEffect, useState } from "react";
import { cuestionariosDe } from "@/lib/almacen";

/* Inicio: una sola cosa importante — continuar donde quedó. */
export default function Dashboard() {
  const { usuario } = useSesion();
  const { listo, estadoDe, completados, enCurso, siguiente } = useAvance(usuario?.correo);
  const primerNombre = usuario?.nombre.split(" ")[0] ?? "docente";
  const [hechoInicio, setHechoInicio] = useState<boolean | null>(null);
  const [hechoCierre, setHechoCierre] = useState<boolean | null>(null);
  useEffect(() => {
    if (!usuario) return;
    cuestionariosDe(usuario.correo).then((c) => {
      setHechoInicio(c.some((x) => x.momento === "inicio"));
      setHechoCierre(c.some((x) => x.momento === "cierre"));
    });
  }, [usuario]);
  const todoCompleto = listo && completados === modulos.length;

  return (
    <Layout>
      <h1 className="mb-8">Buen día, {primerNombre}.</h1>

      {hechoInicio === false && (
        <section className="panel border-integra-ambar bg-integra-ambarClaro mb-10">
          <p className="text-base font-bold mb-2">Antes de empezar</p>
          <h2 className="mb-3">Cuéntenos cómo se ve usted frente a la tecnología</h2>
          <p className="mb-5">Son 24 preguntas cortas, unos 10 minutos. No hay respuestas buenas ni malas.</p>
          <Link to="/cuestionario/inicio" className="btn-principal"><ClipboardList className="h-6 w-6" aria-hidden="true" /> Responder ahora</Link>
        </section>
      )}

      {todoCompleto && hechoCierre === false && (
        <section className="panel border-integra-ambar bg-integra-ambarClaro mb-10">
          <p className="text-base font-bold mb-2">Para cerrar</p>
          <h2 className="mb-3">Cuéntenos cómo se ve ahora frente a la tecnología</h2>
          <p className="mb-5">Las mismas preguntas del comienzo, para ver qué cambió.</p>
          <Link to="/cuestionario/cierre" className="btn-principal"><ClipboardList className="h-6 w-6" aria-hidden="true" /> Responder ahora</Link>
        </section>
      )}

      {listo && siguiente && (
        <section className="panel border-primary bg-integra-rioClaro mb-10">
          <p className="text-base font-bold mb-2">{enCurso ? "Continuar donde quedé" : completados === 0 ? "Para empezar" : "Siguiente módulo"}</p>
          <h2 className="mb-3">Módulo {siguiente.numero}: {siguiente.titulo}</h2>
          <p className="mb-5">{siguiente.paraQue}</p>
          {enCurso && (
            <div className="mb-6">
              <BarraAvance hechos={estadoDe(siguiente).hechos} total={pasosDe(siguiente.id).length} />
            </div>
          )}
          <Link to={`/modulos/${siguiente.id}`} className="btn-principal">
            {enCurso ? "Continuar" : "Empezar"} <ArrowRight className="h-6 w-6" aria-hidden="true" />
          </Link>
        </section>
      )}

      {listo && !siguiente && (
        <section className="panel border-integra-selva bg-integra-selvaClaro mb-10">
          <h2 className="mb-3">Completó los seis módulos.</h2>
          <p className="mb-5">Puede repasar cualquiera cuando quiera, o ayudar a un colega en el foro.</p>
          <Link to="/modulos" className="btn-principal">Ver mis módulos</Link>
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
