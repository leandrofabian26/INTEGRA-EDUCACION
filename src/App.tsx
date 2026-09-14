import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Modulos from "./pages/Modulos";
import ModuloDetalle from "./pages/ModuloDetalle";
import Forum from "./pages/Forum";
import Avance from "./pages/Avance";
import Ayuda from "./pages/Ayuda";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { aplicarEscalaGuardada } from "@/lib/fontSize";

aplicarEscalaGuardada();

const App = () => (
  <TooltipProvider>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/entrar" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/inicio" element={<Dashboard />} />
        <Route path="/modulos" element={<Modulos />} />
        <Route path="/modulos/:id" element={<ModuloDetalle />} />
        <Route path="/foro" element={<Forum />} />
        <Route path="/avance" element={<Avance />} />
        <Route path="/ayuda" element={<Ayuda />} />
        <Route path="/cuenta" element={<Profile />} />
        {/* Rutas antiguas */}
        <Route path="/login" element={<Navigate to="/entrar" replace />} />
        <Route path="/dashboard" element={<Navigate to="/inicio" replace />} />
        <Route path="/tutorials" element={<Navigate to="/modulos" replace />} />
        <Route path="/forum" element={<Navigate to="/foro" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
