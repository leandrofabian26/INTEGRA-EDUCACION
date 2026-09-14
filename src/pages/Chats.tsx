import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { MessageCircle, ChevronRight } from "lucide-react";
import { useSesion } from "@/hooks/useSesion";
import { useConversaciones } from "@/hooks/useChat";

function fechaCorta(iso: string) {
  return new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

/* Lista de colegas para escribirles en privado, estilo Messenger. */
export default function Chats() {
  const { usuario } = useSesion();
  const { conversaciones, listo } = useConversaciones(usuario?.correo);

  return (
    <Layout>
      <PageHeader title="Chat" description="Hable en privado con un colega o con el tutor. Esta conversación solo la ven usted y la otra persona, nunca aparece en el foro." />

      {listo && conversaciones.length === 0 && (
        <div className="panel bg-integra-arenaClaro">
          <p className="font-bold mb-1">Todavía no hay más colegas en este equipo.</p>
          <p>Cuando otro docente cree su cuenta aquí, va a poder escribirle en privado.</p>
        </div>
      )}

      <ul className="space-y-3">
        {conversaciones.map(({ colega, ultimo, noLeidos }) => (
          <li key={colega.correo}>
            <Link to={`/chats/${colega.correo}`} className="panel no-underline text-foreground hover:bg-secondary flex items-center gap-4">
              <MessageCircle className="h-8 w-8 text-primary shrink-0" aria-hidden="true" />
              <span className="flex-1 min-w-0">
                <span className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-bold text-[1.15rem]">{colega.nombre}</span>
                  {ultimo && <span className="text-base shrink-0">{fechaCorta(ultimo.creadoEn)}</span>}
                </span>
                <span className="block truncate">
                  {ultimo ? `${ultimo.de === usuario?.correo ? "Usted: " : ""}${ultimo.texto}` : "Escríbale para empezar"}
                </span>
              </span>
              {noLeidos > 0 && (
                <span className="inline-flex items-center justify-center min-w-[1.75rem] h-7 rounded-full bg-destructive text-destructive-foreground text-[0.9rem] font-bold px-2 shrink-0">
                  {noLeidos}
                </span>
              )}
              <ChevronRight className="h-6 w-6 text-primary shrink-0" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
