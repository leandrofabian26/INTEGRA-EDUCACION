
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Book, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  GraduationCap, 
  Home, 
  LogOut, 
  MessageCircle,
  MessageSquare, 
  User
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

type MenuItem = {
  title: string;
  path: string;
  icon: React.ElementType;
};

const menuItems: MenuItem[] = [
  { title: "Inicio", path: "/dashboard", icon: Home },
  { title: "Tutoriales", path: "/tutorials", icon: Book },
  { title: "Recursos", path: "/resources", icon: FileText },
  { title: "Calendario", path: "/calendar", icon: Calendar },
  { title: "Foro", path: "/forum", icon: MessageSquare },
  { title: "Chat", path: "/chat", icon: MessageCircle },
  { title: "Perfil", path: "/profile", icon: User },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Don't render sidebar on welcome and auth pages
  if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  // Use bottom navigation on mobile
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 py-2 px-4">
        <div className="flex justify-around items-center">
          {menuItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link to={item.path} key={item.path}>
                <Button 
                  variant={isActive ? "secondary" : "ghost"}
                  size="icon"
                  className={`rounded-full flex flex-col items-center justify-center ${isActive ? 'text-primary' : ''}`}
                  aria-label={item.title}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px] mt-1">{item.title}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-screen flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Reduk2</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
          aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto py-4 gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              to={item.path}
              key={item.path}
              className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent/50"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && (
                <span className="ml-3 text-base font-medium">{item.title}</span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-sidebar-border flex items-center justify-between">
        <ThemeToggle />
        {!isCollapsed && (
          <Button
            variant="outline"
            className="ml-auto flex items-center gap-2 text-base"
            onClick={() => console.log("Logout")}
          >
            <LogOut className="h-5 w-5" />
            <span>Salir</span>
          </Button>
        )}
      </div>
    </div>
  );
}
