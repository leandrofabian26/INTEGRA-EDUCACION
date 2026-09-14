import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md">
        <h1 className="mb-4">Esta página no existe</h1>
        <p className="mb-8">Puede que el enlace esté mal escrito. Vuelva al inicio y siga desde allí.</p>
        <Link to="/inicio" className="btn-principal">Ir al inicio</Link>
      </div>
    </div>
  );
}
