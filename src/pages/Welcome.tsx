
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

export default function Welcome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/30 p-4">
      <div className="max-w-md w-full text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="bg-primary rounded-full p-4 shadow-lg">
            <GraduationCap className="h-16 w-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Reduk2</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">Herramientas digitales para docentes del Guaviare</p>
        
        <p className="mb-10 text-lg">
          Plataforma educativa diseñada para ayudar a los docentes de zonas rurales a implementar tecnologías digitales en el aula.
        </p>
        
        <Button
          className="w-full py-6 text-xl"
          onClick={handleStart}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Empezar"}
        </Button>
      </div>
    </div>
  );
}
