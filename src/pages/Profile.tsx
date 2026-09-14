import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";

/* Perfil mínimo. Se completa con datos guardados en el equipo en la Entrega 2. */
export default function Profile() {
  return (
    <Layout>
      <PageHeader title="Mi cuenta" />
      <dl className="panel grid gap-4 sm:grid-cols-[12rem_1fr]">
        <dt className="font-bold">Nombre</dt><dd>Docente</dd>
        <dt className="font-bold">Sede</dt><dd>Vereda Agua bonita, San José del Guaviare</dd>
        <dt className="font-bold">Correo</dt><dd>—</dd>
      </dl>
    </Layout>
  );
}
