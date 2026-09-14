import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, Check, CornerDownRight } from "lucide-react";
import { useSesion } from "@/hooks/useSesion";
import { useConexion } from "@/hooks/useConexion";
import { contarRespuestas, leerForo, leerRespuestas, publicarEnForo, registrarEvento, responderEnForo, type MensajeForo, type RespuestaForo } from "@/lib/almacen";

function fechaCorta(iso: string) {
  return new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "long", hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

function Estado({ estado }: { estado: "pendiente" | "enviado" }) {
  return estado === "pendiente" ? (
    <span className="inline-flex items-center gap-2 font-bold text-integra-ambar text-base"><Clock className="h-5 w-5" aria-hidden="true" /> Se enviará cuando haya señal</span>
  ) : (
    <span className="inline-flex items-center gap-2 font-bold text-integra-selva text-base"><Check className="h-5 w-5" aria-hidden="true" /> Enviado</span>
  );
}

export default function Forum() {
  const { usuario } = useSesion();
  const enLinea = useConexion();
  const [mensajes, setMensajes] = useState<MensajeForo[]>([]);
  const [conteo, setConteo] = useState<Record<string, number>>({});
  const [abierto, setAbierto] = useState<string | null>(null);
  const [respuestas, setRespuestas] = useState<RespuestaForo[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [textoRespuesta, setTextoRespuesta] = useState("");
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");

  const cargar = async () => { setMensajes(await leerForo()); setConteo(await contarRespuestas()); };
  useEffect(() => { cargar(); }, [enLinea]);
  useEffect(() => { if (abierto) leerRespuestas(abierto).then(setRespuestas); }, [abierto, enLinea]);

  const publicar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario) return;
    if (titulo.trim().length < 5) return setError("Escriba una pregunta o un título (mínimo 5 letras).");
    if (texto.trim().length < 10) return setError("Cuente un poco más para que los colegas puedan ayudar.");
    await publicarEnForo(usuario.correo, usuario.nombre, titulo.trim(), texto.trim(), enLinea);
    await registrarEvento(usuario.correo, "foro_publicar", enLinea ? "enviado" : "pendiente");
    setTitulo(""); setTexto(""); setError(""); setMostrarFormulario(false);
    setAviso(enLinea ? "Su mensaje quedó publicado." : "Su mensaje quedó guardado en este equipo. Se enviará a los colegas cuando haya señal.");
    cargar();
  };

  const responder = async (mensajeId: string) => {
    if (!usuario) return;
    if (textoRespuesta.trim().length < 3) { setError("Escriba su respuesta."); return; }
    await responderEnForo(mensajeId, usuario.correo, usuario.nombre, textoRespuesta.trim(), enLinea);
    await registrarEvento(usuario.correo, "foro_responder", enLinea ? "enviado" : "pendiente");
    setTextoRespuesta(""); setError("");
    setRespuestas(await leerRespuestas(mensajeId));
    setConteo(await contarRespuestas());
  };

  return (
    <Layout>
      <PageHeader title="Foro" description="Un espacio de confianza entre colegas de la sede. Pregunte lo que necesite: aquí todos estamos aprendiendo." />

      {!mostrarFormulario && (
        <Button size="lg" className="mb-8" onClick={() => { setMostrarFormulario(true); setAviso(""); }}>
          <MessageSquare aria-hidden="true" /> Escribir una pregunta
        </Button>
      )}

      {aviso && <p role="status" className="panel border-integra-selva bg-integra-selvaClaro font-bold mb-8">{aviso}</p>}

      {mostrarFormulario && (
        <form onSubmit={publicar} className="panel space-y-6 mb-10" noValidate>
          <h2>Escribir una pregunta</h2>
          <div className="space-y-2">
            <Label htmlFor="titulo">¿Qué quiere preguntar o compartir?</Label>
            <Input id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Por ejemplo: ¿Cómo guardo un documento?" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="texto">Cuéntenos un poco más</Label>
            <Textarea id="texto" rows={5} value={texto} onChange={(e) => setTexto(e.target.value)} className="text-[1.05rem] border-2 border-input rounded-lg p-4" />
          </div>
          {error && <p role="alert" className="rounded-lg border-2 border-destructive bg-red-50 text-destructive font-bold px-4 py-3">{error}</p>}
          <div className="flex flex-wrap gap-3">
            <Button type="submit" size="lg">Publicar</Button>
            <Button type="button" variant="outline" size="lg" onClick={() => { setMostrarFormulario(false); setError(""); }}>Cancelar</Button>
          </div>
        </form>
      )}

      {mensajes.length === 0 ? (
        <div className="panel bg-integra-arenaClaro">
          <p className="font-bold mb-1">Todavía no hay mensajes.</p>
          <p>Sea la primera persona en escribir: una pregunta suya seguramente le sirve a otro colega.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {mensajes.map((m) => {
            const n = conteo[m.id] ?? 0;
            const estaAbierto = abierto === m.id;
            return (
              <li key={m.id} className="panel">
                <h2 className="mb-1">{m.titulo}</h2>
                <p className="text-base mb-3">{m.autor} · {fechaCorta(m.creadoEn)}</p>
                <p className="mb-4">{m.texto}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <Estado estado={m.estado} />
                  <Button variant={estaAbierto ? "secondary" : "outline"} onClick={() => { setAbierto(estaAbierto ? null : m.id); setError(""); }}>
                    <CornerDownRight aria-hidden="true" />
                    {estaAbierto ? "Cerrar" : n === 0 ? "Responder" : n === 1 ? "Ver 1 respuesta" : `Ver ${n} respuestas`}
                  </Button>
                </div>

                {estaAbierto && (
                  <div className="mt-6 pl-4 md:pl-8 border-l-4 border-integra-arena space-y-4">
                    {respuestas.length === 0 && <p className="font-bold">Todavía nadie responde. ¿Sabe algo que ayude?</p>}
                    {respuestas.map((r) => (
                      <div key={r.id} className="rounded-lg bg-integra-arenaClaro p-4">
                        <p className="text-base mb-1"><strong>{r.autor}</strong> · {fechaCorta(r.creadoEn)}</p>
                        <p className="mb-2">{r.texto}</p>
                        <Estado estado={r.estado} />
                      </div>
                    ))}
                    <div className="space-y-3">
                      <Label htmlFor={`resp-${m.id}`}>Su respuesta</Label>
                      <Textarea id={`resp-${m.id}`} rows={3} value={textoRespuesta} onChange={(e) => setTextoRespuesta(e.target.value)} className="text-[1.05rem] border-2 border-input rounded-lg p-4" />
                      {error && <p role="alert" className="rounded-lg border-2 border-destructive bg-red-50 text-destructive font-bold px-4 py-3">{error}</p>}
                      <Button onClick={() => responder(m.id)}>Enviar respuesta</Button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Layout>
  );
}
