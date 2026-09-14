import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useSesion } from "@/hooks/useSesion";
import { eventosACSV, leerEventos, registrarEvento } from "@/lib/almacen";
import { Download } from "lucide-react";

export default function Profile() {
  const { usuario } = useSesion();
  const [aviso, setAviso] = useState("");

  const exportar = async () => {
    const eventos = await leerEventos();
    const csv = "\uFEFF" + eventosACSV(eventos);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `integra-registros-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    if (usuario) await registrarEvento(usuario.correo, "exportar_registros", `${eventos.length} eventos`);
    setAviso(`Se descargó un archivo con ${eventos.length} registros.`);
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
        <Button variant="outline" size="lg" onClick={exportar}><Download aria-hidden="true" /> Descargar registros de uso (CSV)</Button>
        {aviso && <p role="status" className="mt-4 font-bold text-integra-selva">{aviso}</p>}
      </section>
    </Layout>
  );
}
