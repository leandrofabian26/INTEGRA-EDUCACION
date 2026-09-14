import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { modulos } from "@/content/modulos";
import BarraAvance from "@/components/BarraAvance";
import { Button } from "@/components/ui/button";
import { useSesion } from "@/hooks/useSesion";
import { useAvance } from "@/hooks/useAvance";
import { registrarEvento } from "@/lib/almacen";
import { ArrowLeft, Check, RotateCcw } from "lucide-react";

/*
  Vista de un módulo. El avance ya se guarda en el equipo.
  En la Entrega 3 cada paso tendrá su contenido (ver → practicar → lo logré).
*/
export default function ModuloDetalle() {
  const { id } = useParams();
  const modulo = modulos.find((m) => m.id === id);
  const { usuario } = useSesion();
  const { listo, estadoDe, completarPaso, reiniciarModulo } = useAvance(usuario?.correo);

  useEffect(() => {
    if (usuario && modulo) registrarEvento(usuario.correo, "abrir_modulo", modulo.id);
  }, [usuario, modulo]);

  if (!modulo) {
    return (
      <Layout>
        <h1 className="mb-4">Este módulo no existe</h1>
        <Link to="/modulos" className="btn-secundario"><ArrowLeft className="h-6 w-6" aria-hidden="true" /> Volver a mis módulos</Link>
      </Layout>
    );
  }

  const estado = estadoDe(modulo);
  const pasoActual = Math.min(estado.hechos + 1, modulo.pasos);

  return (
    <Layout>
      <Link to="/modulos" className="inline-flex items-center gap-2 mb-6"><ArrowLeft className="h-5 w-5" aria-hidden="true" /> Mis módulos</Link>
      <p className="text-base font-bold mb-1">Módulo {modulo.numero}</p>
      <h1 className="mb-4">{modulo.titulo}</h1>
      <p className="text-[1.15rem] mb-6"><strong>Al terminar podrá:</strong> {modulo.paraQue}</p>

      <div className="panel mb-8">
        {listo && <BarraAvance hechos={estado.hechos} total={modulo.pasos} />}
        <p className="mt-4">Duración aproximada: {modulo.duracion}. Puede parar cuando quiera; su avance queda guardado en este equipo.</p>
      </div>

      {estado.tipo === "completado" ? (
        <div className="panel border-integra-selva bg-integra-selvaClaro">
          <h2 className="mb-3">Módulo completado.</h2>
          <p className="mb-5">Puede repasarlo desde el principio cuando quiera.</p>
          <Button variant="outline" size="lg" onClick={() => reiniciarModulo(modulo)}>
            <RotateCcw aria-hidden="true" /> Repasar desde el paso 1
          </Button>
        </div>
      ) : (
        <div className="panel">
          <p className="text-base font-bold mb-1">Paso {pasoActual} de {modulo.pasos}</p>
          <h2 className="mb-3">El contenido de este paso se está preparando.</h2>
          <p className="mb-6">En la siguiente versión aquí verá las imágenes y la práctica guiada. Por ahora puede marcar el paso cuando lo trabaje en la jornada presencial.</p>
          <Button size="lg" onClick={() => completarPaso(modulo)}>
            <Check aria-hidden="true" /> Lo logré, siguiente paso
          </Button>
        </div>
      )}
    </Layout>
  );
}
