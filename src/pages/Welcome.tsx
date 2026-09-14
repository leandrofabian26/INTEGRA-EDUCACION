import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-primary rounded-lg p-3">
            <GraduationCap className="h-12 w-12 text-white" aria-hidden="true" />
          </div>
          <span className="text-[2.6rem] font-bold leading-none">INTEGRA</span>
        </div>

        <h1 className="text-[2.2rem] mb-4">Aprender a usar la tecnología en el aula, paso a paso y sin afán.</h1>
        <p className="text-[1.15rem] mb-3">
          Un espacio para los docentes de la vereda Agua bonita. Funciona sin internet: lo que usted avance queda guardado en este computador.
        </p>
        <p className="text-[1.15rem] mb-10">
          Aquí no hay preguntas tontas. Equivocarse es parte de aprender.
        </p>

        <Link to="/entrar" className="btn-principal w-full text-[1.25rem] min-h-[3.75rem]">
          Entrar
        </Link>
        <p className="mt-6 text-center">
          ¿Primera vez? <Link to="/registro">Crear mi cuenta</Link>
        </p>
      </div>
    </div>
  );
}
