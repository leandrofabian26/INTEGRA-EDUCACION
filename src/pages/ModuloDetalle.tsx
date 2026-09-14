import { Link, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { modulos, avanceEjemplo, estadoDe } from "@/content/modulos";
import BarraAvance from "@/components/BarraAvance";
import { ArrowLeft } from "lucide-react";

/*
  Vista de un módulo. En la Entrega 3 aquí irán los pasos (cápsulas):
  qué va a lograr → ver → practicar → "lo logré / necesito ayuda".
*/
export default function ModuloDetalle() {
  const { id } = useParams();
  const modulo = modulos.find((m) => m.id === id);

  if (!modulo) {
    return (
      <Layout>
        <h1 className="mb-4">Este módulo no existe</h1>
        <Link to="/modulos" className="btn-secundario"><ArrowLeft className="h-6 w-6" aria-hidden="true" /> Volver a mis módulos</Link>
      </Layout>
    );
  }

  const estado = estadoDe(modulo, avanceEjemplo);

  return (
    <Layout>
      <Link to="/modulos" className="inline-flex items-center gap-2 mb-6"><ArrowLeft className="h-5 w-5" aria-hidden="true" /> Mis módulos</Link>
      <p className="text-base font-bold mb-1">Módulo {modulo.numero}</p>
      <h1 className="mb-4">{modulo.titulo}</h1>
      <p className="text-[1.15rem] mb-6"><strong>Al terminar podrá:</strong> {modulo.paraQue}</p>

      <div className="panel mb-8">
        <BarraAvance hechos={estado.hechos} total={modulo.pasos} />
        <p className="mt-4">Duración aproximada: {modulo.duracion}. Puede parar cuando quiera; su avance queda guardado.</p>
      </div>

      <div className="panel bg-integra-arenaClaro">
        <p className="font-bold mb-2">Los pasos de este módulo se están preparando.</p>
        <p>En la siguiente versión de INTEGRA cada módulo tendrá {modulo.pasos} pasos cortos con imágenes y práctica guiada.</p>
      </div>
    </Layout>
  );
}
