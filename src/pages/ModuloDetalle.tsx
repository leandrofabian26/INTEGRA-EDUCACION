import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { modulos } from "@/content/modulos";
import { pasosDe } from "@/content/pasos";
import BarraAvance from "@/components/BarraAvance";
import Ilustracion from "@/components/Ilustracion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSesion } from "@/hooks/useSesion";
import { useAvance } from "@/hooks/useAvance";
import { registrarEvento } from "@/lib/almacen";
import { ArrowLeft, ArrowRight, Check, RotateCcw, HelpCircle, MessageSquare } from "lucide-react";

/*
  Visor de pasos. Un paso por pantalla:
  qué va a lograr → cómo se hace → practíquelo → "lo logré" / "necesito ayuda".
*/
export default function ModuloDetalle() {
  const { id } = useParams();
  const modulo = modulos.find((m) => m.id === id);
  const pasos = pasosDe(id ?? "");
  const { usuario } = useSesion();
  const { listo, estadoDe, completarPaso, reiniciarModulo } = useAvance(usuario?.correo);

  // Índice del paso que se está viendo (0-based). Empieza en el primer paso pendiente.
  const [visible, setVisible] = useState<number | null>(null);
  const [mostrarAyuda, setMostrarAyuda] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const estado = modulo ? estadoDe(modulo) : { tipo: "pendiente" as const, hechos: 0 };

  useEffect(() => {
    if (usuario && modulo) registrarEvento(usuario.correo, "abrir_modulo", modulo.id);
  }, [usuario, modulo]);

  useEffect(() => {
    if (listo && modulo && visible === null) setVisible(Math.min(estado.hechos, pasos.length - 1));
  }, [listo, modulo, visible, estado.hechos, pasos.length]);

  if (!modulo) {
    return (
      <Layout>
        <h1 className="mb-4">Este módulo no existe</h1>
        <Link to="/modulos" className="btn-secundario"><ArrowLeft className="h-6 w-6" aria-hidden="true" /> Volver a mis módulos</Link>
      </Layout>
    );
  }

  const i = visible ?? 0;
  const paso = pasos[i];
  const esPasoPendiente = i === estado.hechos;          // el que toca hacer ahora
  const yaHecho = i < estado.hechos;

  const logre = async () => {
    await completarPaso(modulo);
    setMostrarAyuda(false);
    if (i + 1 < pasos.length) {
      setVisible(i + 1);
      setMensaje(`Paso ${i + 1} logrado. Vamos al paso ${i + 2}.`);
    } else {
      setMensaje("Completó el módulo. Muy bien.");
    }
    window.scrollTo({ top: 0 });
  };

  const necesitoAyuda = async () => {
    setMostrarAyuda(true);
    if (usuario) await registrarEvento(usuario.correo, "necesito_ayuda", `${modulo.id}:${paso?.id}`);
  };

  const irA = (n: number) => { setVisible(n); setMostrarAyuda(false); setMensaje(""); window.scrollTo({ top: 0 }); };

  return (
    <Layout>
      <Link to="/modulos" className="inline-flex items-center gap-2 mb-4"><ArrowLeft className="h-5 w-5" aria-hidden="true" /> Mis módulos</Link>
      <p className="text-base font-bold mb-1">Módulo {modulo.numero}</p>
      <h1 className="mb-4">{modulo.titulo}</h1>

      <div className="mb-8">{listo && <BarraAvance hechos={estado.hechos} total={pasos.length} />}</div>

      {mensaje && <p role="status" className="panel border-integra-selva bg-integra-selvaClaro font-bold mb-6">{mensaje}</p>}

      {paso && (
        <article className="panel mb-6" aria-labelledby="titulo-paso">
          <p className="text-base font-bold mb-1">Paso {i + 1} de {pasos.length}{yaHecho ? " · ya lo hizo" : ""}</p>
          <h2 id="titulo-paso" className="mb-4">{paso.titulo}</h2>

          <p className="text-[1.1rem] mb-6"><strong>Al terminar este paso podrá</strong> {paso.lograra}</p>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] items-start mb-6">
            <div>
              <h3 className="mb-3">Cómo se hace</h3>
              <ol className="list-decimal pl-7 space-y-3 text-[1.05rem]">
                {paso.como.map((c, n) => <li key={n}>{c}</li>)}
              </ol>
            </div>
            <div className="flex justify-center">
              <Ilustracion clave={paso.ilustracion} titulo={paso.titulo} />
            </div>
          </div>

          <div className="rounded-lg border-2 border-primary bg-integra-rioClaro p-5 mb-6">
            <h3 className="mb-2">Practíquelo ahora</h3>
            <p className="text-[1.05rem]">{paso.practica}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {esPasoPendiente && (
              <Button size="lg" onClick={logre}><Check aria-hidden="true" /> Lo logré, siguiente paso</Button>
            )}
            {yaHecho && i + 1 < pasos.length && (
              <Button size="lg" onClick={() => irA(i + 1)}>Siguiente paso <ArrowRight aria-hidden="true" /></Button>
            )}
            <Button variant="outline" size="lg" onClick={necesitoAyuda}><HelpCircle aria-hidden="true" /> Necesito ayuda</Button>
            {i > 0 && <Button variant="outline" size="lg" onClick={() => irA(i - 1)}><ArrowLeft aria-hidden="true" /> Paso anterior</Button>}
          </div>
        </article>
      )}

      {paso && mostrarAyuda && (
        <section className="panel bg-integra-arenaClaro mb-6" aria-label="Si se traba">
          <h3 className="mb-3">Si se trabó, esto suele pasar:</h3>
          <Accordion type="single" collapsible className="space-y-2 mb-5">
            {paso.siSeTraba.map((item, n) => (
              <AccordionItem key={n} value={`a${n}`} className="border-2 border-border rounded-lg bg-card px-4">
                <AccordionTrigger className="text-left text-[1.05rem] font-bold hover:no-underline [&_svg]:h-6 [&_svg]:w-6">{item.p}</AccordionTrigger>
                <AccordionContent className="text-[1.05rem] pb-4">{item.r}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mb-3">¿Sigue sin funcionar? Cuéntelo a los colegas; seguro alguien pasó por lo mismo.</p>
          <Link to="/foro" className="btn-secundario"><MessageSquare className="h-6 w-6" aria-hidden="true" /> Preguntar en el foro</Link>
        </section>
      )}

      {estado.tipo === "completado" && (
        <section className="panel border-integra-selva bg-integra-selvaClaro">
          <h2 className="mb-3">Módulo completado.</h2>
          <p className="mb-5">Puede volver a cualquier paso con «Paso anterior», o empezar de nuevo desde el paso 1.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/modulos" className="btn-principal">Ir al siguiente módulo <ArrowRight className="h-6 w-6" aria-hidden="true" /></Link>
            <Button variant="outline" size="lg" onClick={async () => { await reiniciarModulo(modulo); irA(0); }}>
              <RotateCcw aria-hidden="true" /> Repasar desde el paso 1
            </Button>
          </div>
        </section>
      )}
    </Layout>
  );
}
