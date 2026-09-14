import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ESCALA, preguntas } from "@/content/cuestionario";
import { useSesion } from "@/hooks/useSesion";
import { guardarCuestionario, registrarEvento } from "@/lib/almacen";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

/* Cuestionario de autopercepción (Anexo A). Una pregunta por pantalla, botones grandes. */
export default function Cuestionario() {
  const { momento } = useParams<{ momento: "inicio" | "cierre" }>();
  const navigate = useNavigate();
  const { usuario } = useSesion();
  const [i, setI] = useState(0);
  const [resp, setResp] = useState<Record<string, string | number>>({});
  const [error, setError] = useState("");
  const [listo, setListo] = useState(false);

  const valido = momento === "inicio" || momento === "cierre";
  const p = preguntas[i];
  const total = preguntas.length;

  useEffect(() => { window.scrollTo({ top: 0 }); }, [i]);

  if (!valido) {
    return <Layout><h1>Este cuestionario no existe</h1></Layout>;
  }

  const responder = (v: string | number) => { setResp({ ...resp, [p.id]: v }); setError(""); };

  const siguiente = async () => {
    const v = resp[p.id];
    if (v === undefined || v === "") { setError("Elija o escriba una respuesta para continuar."); return; }
    if (i + 1 < total) { setI(i + 1); return; }
    if (usuario) {
      await guardarCuestionario(usuario.correo, momento, resp);
      await registrarEvento(usuario.correo, "cuestionario", momento);
    }
    setListo(true);
  };

  if (listo) {
    return (
      <Layout>
        <section className="panel border-integra-selva bg-integra-selvaClaro">
          <h1 className="mb-3">Gracias. Sus respuestas quedaron guardadas.</h1>
          <p className="mb-6">{momento === "inicio" ? "Ahora sí, empecemos con el primer módulo." : "Sus respuestas ayudan a mejorar INTEGRA para otros docentes."}</p>
          <Button size="lg" onClick={() => navigate("/inicio")}>Ir al inicio <ArrowRight aria-hidden="true" /></Button>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Link to="/inicio" className="inline-flex items-center gap-2 mb-4"><ArrowLeft className="h-5 w-5" aria-hidden="true" /> Inicio</Link>
      <h1 className="mb-2">{momento === "inicio" ? "Antes de empezar" : "Para cerrar"}</h1>
      <p className="mb-6">No hay respuestas buenas ni malas. Interesa saber cómo se ve usted frente a la tecnología. Sus respuestas son confidenciales.</p>

      <div className="mb-6">
        <div className="flex justify-between text-base mb-1"><span>{p.seccion}</span><span className="font-bold">Pregunta {i + 1} de {total}</span></div>
        <div className="h-3 rounded-full bg-integra-arena border border-border overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={i + 1}>
          <div className="h-full bg-primary" style={{ width: `${((i + 1) / total) * 100}%` }} />
        </div>
      </div>

      <section className="panel mb-6">
        <h2 className="mb-6">{p.texto}</h2>

        {p.tipo === "escala" && (
          <div className="grid gap-3" role="radiogroup" aria-label={p.texto}>
            {ESCALA.map((op, n) => {
              const activo = resp[p.id] === n + 1;
              return (
                <button
                  key={op} type="button" role="radio" aria-checked={activo} onClick={() => responder(n + 1)}
                  className={`text-left rounded-lg border-2 px-5 min-h-[3.5rem] text-[1.1rem] font-bold flex items-center gap-4 ${activo ? "bg-primary text-primary-foreground border-primary" : "bg-card border-input hover:bg-secondary"}`}
                >
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full border-2 ${activo ? "border-white" : "border-input"}`}>{activo && <Check className="h-5 w-5" aria-hidden="true" />}</span>
                  {op}
                </button>
              );
            })}
          </div>
        )}

        {p.tipo === "numero" && (
          <Input type="number" inputMode="numeric" min={0} max={80} value={resp[p.id] ?? ""} onChange={(e) => responder(e.target.value === "" ? "" : Number(e.target.value))} className="max-w-[10rem] text-[1.3rem]" aria-label={p.texto} />
        )}

        {p.tipo === "abierta" && (
          <Textarea rows={5} value={String(resp[p.id] ?? "")} onChange={(e) => responder(e.target.value)} className="text-[1.05rem] border-2 border-input rounded-lg p-4" aria-label={p.texto} />
        )}

        {error && <p role="alert" className="mt-4 rounded-lg border-2 border-destructive bg-red-50 text-destructive font-bold px-4 py-3">{error}</p>}
      </section>

      <div className="flex flex-wrap gap-3">
        <Button size="lg" onClick={siguiente}>{i + 1 < total ? "Siguiente" : "Terminar"} <ArrowRight aria-hidden="true" /></Button>
        {i > 0 && <Button variant="outline" size="lg" onClick={() => setI(i - 1)}><ArrowLeft aria-hidden="true" /> Anterior</Button>}
      </div>
    </Layout>
  );
}
