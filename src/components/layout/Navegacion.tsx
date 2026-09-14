import { Link, useLocation, useNavigate } from "react-router-dom";
import { cerrarSesion, registrarEvento, sesionActual } from "@/lib/almacen";
import { Home, BookOpen, MessageSquare, BarChart3, HelpCircle, LogOut, GraduationCap, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

/*
  Menú principal: cinco entradas, siempre con icono y texto.
  En escritorio va fijo a la izquierda; en móvil, abajo.
*/
export const entradasMenu = [
  { titulo: "Inicio", ruta: "/inicio", icono: Home },
  { titulo: "Mis módulos", ruta: "/modulos", icono: BookOpen },
  { titulo: "Foro", ruta: "/foro", icono: MessageSquare },
  { titulo: "Mi avance", ruta: "/avance", icono: BarChart3 },
  { titulo: "Ayuda", ruta: "/ayuda", icono: HelpCircle },
];

export default function Navegacion() {
  const { pathname } = useLocation();
  const esMovil = useIsMobile();
  const navigate = useNavigate();
  const salir = async () => {
    const correo = sesionActual();
    if (correo) await registrarEvento(correo, "salir");
    cerrarSesion();
    navigate("/");
  };

  if (esMovil) {
    return (
      <nav aria-label="Menú principal" className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border z-40">
        <ul className="flex justify-around items-stretch">
          {entradasMenu.map(({ titulo, ruta, icono: Icono }) => {
            const activa = pathname.startsWith(ruta);
            return (
              <li key={ruta} className="flex-1">
                <Link
                  to={ruta}
                  aria-current={activa ? "page" : undefined}
                  className={`flex flex-col items-center justify-center gap-1 min-h-[4.25rem] px-1 no-underline text-[0.85rem] font-bold border-t-4 ${
                    activa ? "border-primary text-primary bg-secondary" : "border-transparent text-foreground"
                  }`}
                >
                  <Icono className="h-7 w-7" aria-hidden="true" />
                  {titulo}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="Menú principal" className="w-72 shrink-0 h-screen sticky top-0 flex flex-col bg-card border-r-2 border-border">
      <div className="flex items-center gap-3 px-6 py-6 border-b-2 border-border">
        <GraduationCap className="h-9 w-9 text-primary" aria-hidden="true" />
        <span className="text-[1.4rem] font-bold">INTEGRA</span>
      </div>

      <ul className="flex flex-col gap-1 p-4 flex-1">
        {entradasMenu.map(({ titulo, ruta, icono: Icono }) => {
          const activa = pathname.startsWith(ruta);
          return (
            <li key={ruta}>
              <Link
                to={ruta}
                aria-current={activa ? "page" : undefined}
                className={`flex items-center gap-4 rounded-lg px-4 min-h-[3.5rem] no-underline text-[1.1rem] font-bold border-2 ${
                  activa ? "bg-primary text-primary-foreground border-primary" : "border-transparent text-foreground hover:bg-secondary"
                }`}
              >
                <Icono className="h-7 w-7 shrink-0" aria-hidden="true" />
                {titulo}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="p-4 border-t-2 border-border flex flex-col gap-2">
        <Link to="/cuenta" className="flex items-center gap-3 rounded-lg px-4 min-h-[3.25rem] no-underline text-foreground font-bold border-2 border-transparent hover:bg-secondary">
          <User className="h-6 w-6" aria-hidden="true" />
          Mi cuenta
        </Link>
        <button type="button" onClick={salir} className="flex items-center gap-3 rounded-lg px-4 min-h-[3.25rem] text-foreground font-bold border-2 border-border hover:bg-secondary text-left">
          <LogOut className="h-6 w-6" aria-hidden="true" />
          Salir
        </button>
      </div>
    </nav>
  );
}
