import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const preguntas = [
  { p: "¿Qué pasa si no hay internet?", r: "INTEGRA sigue funcionando. Los módulos, el foro y su avance quedan guardados en este computador. Arriba a la derecha siempre se ve si hay conexión o no. Cuando vuelve la señal, lo que escribió en el foro se envía a los colegas y aparece un aviso." },
  { p: "¿Puedo usar INTEGRA en otro computador?", r: "Su cuenta y su avance quedan guardados en el computador donde los creó. Si cambia de equipo, cree la cuenta de nuevo allí; en la próxima versión el avance viajará con usted cuando haya señal." },
  { p: "Me equivoqué en un paso. ¿Dañé algo?", r: "No. En INTEGRA no se puede dañar nada. Puede repetir cualquier paso las veces que quiera con el botón «Repetir este paso»." },
  { p: "La letra se ve muy pequeña.", r: "Arriba a la derecha están los botones A− y A+. Toque A+ hasta que lea con comodidad. El tamaño queda guardado." },
  { p: "El computador se bloqueó o no responde.", r: "Espere un minuto. Si sigue igual, mantenga presionado el botón de encendido unos 10 segundos hasta que se apague, espere y vuelva a encenderlo. Su avance en INTEGRA no se pierde." },
  { p: "¿A quién le pregunto si me trabo?", r: "Escriba en el Foro; los colegas de la sede y el acompañante del proyecto responden. También puede pedir ayuda en la próxima jornada presencial." },
];

export default function Ayuda() {
  return (
    <Layout>
      <PageHeader title="Ayuda" description="Respuestas a lo que más se pregunta. Si su duda no está aquí, escríbala en el foro." />
      <Accordion type="single" collapsible className="space-y-3">
        {preguntas.map((item, i) => (
          <AccordionItem key={i} value={`p${i}`} className="panel p-0 border-2">
            <AccordionTrigger className="px-6 py-4 text-left text-[1.1rem] font-bold hover:no-underline [&_svg]:h-7 [&_svg]:w-7">{item.p}</AccordionTrigger>
            <AccordionContent className="px-6 pb-6 text-[1.05rem]">{item.r}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <p className="mt-10 panel bg-integra-arenaClaro">
        Acompañamiento del proyecto: Leandro Favian Lugo Mahecha, investigador de la Maestría en Educación, Corporación Universitaria Iberoamericana.
      </p>
    </Layout>
  );
}
