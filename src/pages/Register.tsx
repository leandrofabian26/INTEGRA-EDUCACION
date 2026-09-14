import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const crear = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre.trim().length < 3) return setError("Escriba su nombre completo.");
    if (!correo.includes("@")) return setError("El correo debe tener una @. Por ejemplo: maria@correo.com");
    if (clave.length < 4) return setError("La contraseña debe tener al menos 4 caracteres.");
    setError("");
    navigate("/inicio");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-3 mb-8 no-underline text-foreground">
          <GraduationCap className="h-9 w-9 text-primary" aria-hidden="true" />
          <span className="text-[1.4rem] font-bold">INTEGRA</span>
        </Link>

        <h1 className="mb-2">Crear mi cuenta</h1>
        <p className="mb-6">Solo necesita tres datos. La sede ya está registrada: Agua bonita, San José del Guaviare.</p>

        <form onSubmit={crear} className="panel space-y-6" noValidate>
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre completo</Label>
            <Input id="nombre" autoComplete="name" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="correo">Correo</Label>
            <Input id="correo" type="email" autoComplete="email" placeholder="maria@correo.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clave">Contraseña (mínimo 4 caracteres)</Label>
            <Input id="clave" type="password" autoComplete="new-password" value={clave} onChange={(e) => setClave(e.target.value)} />
          </div>

          {error && (
            <p role="alert" className="rounded-lg border-2 border-destructive bg-red-50 text-destructive font-bold px-4 py-3">{error}</p>
          )}

          <Button type="submit" className="w-full" size="lg">Crear mi cuenta</Button>
        </form>

        <p className="mt-6">
          ¿Ya tiene cuenta? <Link to="/entrar">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
