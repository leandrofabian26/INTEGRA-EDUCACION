
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/30 p-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="bg-primary rounded-full p-3 shadow-lg">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Lo sentimos, no pudimos encontrar la página que buscas.
        </p>
        
        <Button asChild className="w-full py-6 text-lg">
          <Link to="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
