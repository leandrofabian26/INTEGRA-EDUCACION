import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Clock, Check } from "lucide-react";
import { useSesion } from "@/hooks/useSesion";
import { useConexion } from "@/hooks/useConexion";
import { useChat } from "@/hooks/useChat";

function fechaCorta(iso: string) {
  return new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

/* Conversación privada uno a uno con un colega, estilo Messenger. */
export default function ChatConversacion() {
  const { correo: correoColega } = useParams();
  const { usuario } = useSesion();
  const enLinea = useConexion();
  const { mensajes, colega, listo, enviar } = useChat(usuario?.correo, correoColega);
  const [texto, setTexto] = useState("");
  const finRef = useRef<HTMLDivElement>(null);

  useEffect(() => { finRef.current?.scrollIntoView({ block: "end" }); }, [mensajes.length]);

  const mandar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!texto.trim()) return;
    await enviar(texto, enLinea);
    setTexto("");
  };

  if (listo && !colega) {
    return (
      <Layout>
        <h1 className="mb-4">Este colega no existe</h1>
        <Link to="/chats" className="btn-secundario"><ArrowLeft className="h-6 w-6" aria-hidden="true" /> Volver al chat</Link>
      </Layout>
    );
  }

  return (
    <Layout>
      <Link to="/chats" className="inline-flex items-center gap-2 mb-4"><ArrowLeft className="h-5 w-5" aria-hidden="true" /> Chat</Link>
      <h1 className="mb-1">{colega?.nombre ?? "…"}</h1>
      <p className="mb-6">Conversación privada. Solo la ven usted y {colega?.nombre.split(" ")[0] ?? "su colega"}.</p>

      <div className="space-y-4 mb-6">
        {listo && mensajes.length === 0 && (
          <div className="panel bg-integra-arenaClaro">
            <p className="font-bold mb-1">Todavía no se han escrito.</p>
            <p>Escriba el primer mensaje cuando quiera.</p>
          </div>
        )}
        {mensajes.map((m) => {
          const esPropio = m.de === usuario?.correo;
          return (
            <div key={m.id} className={`flex ${esPropio ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] md:max-w-[70%] rounded-lg p-4 ${esPropio ? "bg-primary text-primary-foreground" : "bg-integra-arenaClaro"}`}>
                <p className="mb-1">{m.texto}</p>
                <p className="text-base flex items-center gap-2 flex-wrap">
                  {fechaCorta(m.creadoEn)}
                  {esPropio && (m.estado === "pendiente" ? (
                    <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" aria-hidden="true" /> Pendiente</span>
                  ) : (
                    <span className="inline-flex items-center gap-1"><Check className="h-4 w-4" aria-hidden="true" /> Enviado</span>
                  ))}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={finRef} />
      </div>

      <form onSubmit={mandar} className="panel flex flex-wrap gap-3 items-end">
        <label htmlFor="mensaje-chat" className="sr-only">Escriba su mensaje</label>
        <Textarea
          id="mensaje-chat"
          rows={2}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escriba su mensaje…"
          className="flex-1 text-[1.05rem] border-2 border-input rounded-lg p-4 min-w-[12rem]"
        />
        <Button type="submit" size="lg"><Send aria-hidden="true" /> Enviar</Button>
      </form>
    </Layout>
  );
}
