import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { validarUsuario, iniciarSesion, registrarEvento } from "@/lib/almacen";

/* Las cuentas se guardan en este equipo; no hace falta internet para entrar. */
export default function Login() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [verClave, setVerClave] = useState(false);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!correo.includes("@")) {
      setError("El correo debe tener una @. Por ejemplo: maria@correo.com");
      return;
    }
    if (clave.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }
    setError("");
    setEnviando(true);
    const u = await validarUsuario(correo, clave);
    setEnviando(false);
    if (!u) {
      setError("El correo o la contraseña no coinciden con una cuenta de este equipo. Revise o cree su cuenta.");
      return;
    }
    iniciarSesion(u.correo);
    await registrarEvento(u.correo, "entrar");
    navigate("/inicio");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-3 mb-8 no-underline text-foreground">
          <GraduationCap className="h-9 w-9 text-primary" aria-hidden="true" />
          <span className="text-[1.4rem] font-bold">INTEGRA</span>
        </Link>

        <h1 className="mb-6">Entrar</h1>

        <form onSubmit={entrar} className="panel space-y-6" noValidate>
          <div className="space-y-2">
            <Label htmlFor="correo">Correo</Label>
            <Input id="correo" type="email" autoComplete="email" placeholder="maria@correo.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clave">Contraseña</Label>
            <div className="flex gap-2">
              <Input id="clave" type={verClave ? "text" : "password"} autoComplete="current-password" value={clave} onChange={(e) => setClave(e.target.value)} />
              <Button type="button" variant="outline" size="icon" className="min-h-[3.25rem] w-14 shrink-0" onClick={() => setVerClave(!verClave)} aria-label={verClave ? "Ocultar contraseña" : "Mostrar contraseña"}>
                {verClave ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </div>

          {error && (
            <p role="alert" className="rounded-lg border-2 border-destructive bg-red-50 text-destructive font-bold px-4 py-3">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={enviando}>{enviando ? "Entrando…" : "Entrar"}</Button>
        </form>

        <p className="mt-6">
          ¿No tiene cuenta todavía? <Link to="/registro">Crear mi cuenta</Link>
        </p>
      </div>
    </div>
  );
}
