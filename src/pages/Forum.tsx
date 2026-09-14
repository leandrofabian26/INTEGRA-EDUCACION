import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, Check } from "lucide-react";
import { useSesion } from "@/hooks/useSesion";
import { useConexion } from "@/hooks/useConexion";
import { leerForo, publicarEnForo, registrarEvento, type MensajeForo } from "@/lib/almacen";

function fechaCorta(iso: string) {
  return new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "long", hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

export default function Forum() {
  const { usuario } = useSesion();
  const enLinea = useConexion();
  const [mensajes, setMensajes] = useState<MensajeForo[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");

  const cargar = () => leerForo().then(setMensajes);
  useEffect(() => { cargar(); }, [enLinea]);

  const publicar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario) return;
    if (titulo.trim().length < 5) return setError("Escriba una pregunta o un título (mínimo 5 letras).");
    if (texto.trim().length < 10) return setError("Cuente un poco más para que los colegas puedan ayudar.");
    await publicarEnForo(usuario.correo, usuario.nombre, titulo.trim(), texto.trim(), enLinea);
    await registrarEvento(usuario.correo, "foro_publicar", enLinea ? "enviado" : "pendiente");
    setTitulo(""); setTexto(""); setError("");
    setMostrarFormulario(false);
    setAviso(enLinea ? "Su mensaje quedó publicado." : "Su mensaje quedó guardado en este equipo. Se enviará a los colegas cuando haya señal.");
    cargar();
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
          {mensajes.map((m) => (
            <li key={m.id} className="panel">
              <h2 className="mb-1">{m.titulo}</h2>
              <p className="text-base mb-3">{m.autor} · {fechaCorta(m.creadoEn)}</p>
              <p className="mb-4">{m.texto}</p>
              {m.estado === "pendiente" ? (
                <p className="inline-flex items-center gap-2 font-bold text-integra-ambar"><Clock className="h-5 w-5" aria-hidden="true" /> Guardado en este equipo; se enviará cuando haya señal</p>
              ) : (
                <p className="inline-flex items-center gap-2 font-bold text-integra-selva"><Check className="h-5 w-5" aria-hidden="true" /> Enviado</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
