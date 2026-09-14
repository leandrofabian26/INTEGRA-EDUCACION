import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useSesion } from "@/hooks/useSesion";
import { eventosACSV, leerEventos, registrarEvento, leerCuestionarios, cuestionariosACSV } from "@/lib/almacen";
import { clavesCuestionario } from "@/content/cuestionario";
import { Download } from "lucide-react";

export default function Profile() {
  const { usuario } = useSesion();
  const [aviso, setAviso] = useState("");

  const descargar = (nombre: string, contenido: string) => {
    const blob = new Blob(["\uFEFF" + contenido], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = nombre; a.click();
    URL.revokeObjectURL(url);
  };
  const hoy = () => new Date().toISOString().slice(0, 10);

  const exportar = async () => {
    const eventos = await leerEventos();
    descargar(`integra-registros-${hoy()}.csv`, eventosACSV(eventos));
    if (usuario) await registrarEvento(usuario.correo, "exportar_registros", `${eventos.length} eventos`);
    setAviso(`Se descargó un archivo con ${eventos.length} registros.`);
  };

  const exportarCuestionarios = async () => {
    const lista = await leerCuestionarios();
    descargar(`integra-cuestionarios-${hoy()}.csv`, cuestionariosACSV(lista, clavesCuestionario));
    if (usuario) await registrarEvento(usuario.correo, "exportar_cuestionarios", `${lista.length} cuestionarios`);
    setAviso(`Se descargó un archivo con ${lista.length} cuestionarios.`);
  };

  return (
    <Layout>
      <PageHeader title="Mi cuenta" />
      <dl className="panel grid gap-4 sm:grid-cols-[12rem_1fr] mb-10">
        <dt className="font-bold">Nombre</dt><dd>{usuario?.nombre ?? "—"}</dd>
        <dt className="font-bold">Sede</dt><dd>{usuario?.sede ?? "—"}</dd>
        <dt className="font-bold">Correo</dt><dd>{usuario?.correo ?? "—"}</dd>
      </dl>

      <section className="panel bg-integra-arenaClaro">
        <h2 className="mb-2">Para el acompañamiento del proyecto</h2>
        <p className="mb-5">
          INTEGRA guarda en este equipo un registro de uso (módulos abiertos, pasos completados, mensajes del foro, cambios de conexión). Sirve para la investigación y se puede descargar como archivo de hoja de cálculo. No incluye contraseñas.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="lg" onClick={exportar}><Download aria-hidden="true" /> Registros de uso (CSV)</Button>
          <Button variant="outline" size="lg" onClick={exportarCuestionarios}><Download aria-hidden="true" /> Cuestionarios (CSV)</Button>
        </div>
        {aviso && <p role="status" className="mt-4 font-bold text-integra-selva">{aviso}</p>}
      </section>
    </Layout>
  );
}
