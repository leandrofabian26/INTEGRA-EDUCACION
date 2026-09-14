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
import Chats from "./pages/Chats";
import ChatConversacion from "./pages/ChatConversacion";
import Avance from "./pages/Avance";
import Ayuda from "./pages/Ayuda";
import Profile from "./pages/Profile";
import Cuestionario from "./pages/Cuestionario";
import NotFound from "./pages/NotFound";
import { aplicarEscalaGuardada } from "@/lib/fontSize";
import RutaProtegida from "@/components/layout/RutaProtegida";

aplicarEscalaGuardada();

const App = () => (
  <TooltipProvider>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/entrar" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/inicio" element={<RutaProtegida><Dashboard /></RutaProtegida>} />
        <Route path="/modulos" element={<RutaProtegida><Modulos /></RutaProtegida>} />
        <Route path="/modulos/:id" element={<RutaProtegida><ModuloDetalle /></RutaProtegida>} />
        <Route path="/foro" element={<RutaProtegida><Forum /></RutaProtegida>} />
        <Route path="/chats" element={<RutaProtegida><Chats /></RutaProtegida>} />
        <Route path="/chats/:correo" element={<RutaProtegida><ChatConversacion /></RutaProtegida>} />
        <Route path="/avance" element={<RutaProtegida><Avance /></RutaProtegida>} />
        <Route path="/ayuda" element={<RutaProtegida><Ayuda /></RutaProtegida>} />
        <Route path="/cuenta" element={<RutaProtegida><Profile /></RutaProtegida>} />
        <Route path="/cuestionario/:momento" element={<RutaProtegida><Cuestionario /></RutaProtegida>} />
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
