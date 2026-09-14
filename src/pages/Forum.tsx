import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

type Mensaje = { id: number; autor: string; fecha: string; titulo: string; texto: string; respuestas: number };

/* Mensajes de ejemplo. En la Entrega 2 se guardan en el equipo y se envían cuando hay señal. */
const mensajesIniciales: Mensaje[] = [
  { id: 1, autor: "Profesora de primaria", fecha: "hace 2 días", titulo: "¿Cómo paso una foto del celular al computador?", texto: "Tomé fotos de los trabajos de los niños y quiero mostrarlas en el computador de la sede. ¿Alguien sabe cómo se hace con el cable?", respuestas: 2 },
  { id: 2, autor: "Docente multigrado", fecha: "hace 5 días", titulo: "Se me apagó el computador en mitad de la clase", texto: "Estaba mostrando una presentación y se apagó solo. ¿Puede ser la batería? ¿Qué hago para que no vuelva a pasar?", respuestas: 3 },
];

export default function Forum() {
  const [mensajes, setMensajes] = useState(mensajesIniciales);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");

  const publicar = (e: React.FormEvent) => {
    e.preventDefault();
    if (titulo.trim().length < 5) return setError("Escriba una pregunta o un título (mínimo 5 letras).");
    if (texto.trim().length < 10) return setError("Cuente un poco más para que los colegas puedan ayudar.");
    setMensajes([{ id: Date.now(), autor: "Usted", fecha: "ahora", titulo: titulo.trim(), texto: texto.trim(), respuestas: 0 }, ...mensajes]);
    setTitulo(""); setTexto(""); setError("");
    setMostrarFormulario(false);
    setAviso("Su mensaje quedó publicado. Si no hay señal, se enviará a los colegas cuando la haya.");
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

      <ul className="space-y-4">
        {mensajes.map((m) => (
          <li key={m.id} className="panel">
            <h2 className="mb-1">{m.titulo}</h2>
            <p className="text-base mb-3">{m.autor} · {m.fecha}</p>
            <p className="mb-4">{m.texto}</p>
            <p className="font-bold">{m.respuestas === 0 ? "Todavía nadie responde" : m.respuestas === 1 ? "1 respuesta" : `${m.respuestas} respuestas`}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
