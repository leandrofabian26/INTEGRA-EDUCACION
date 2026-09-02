
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className={`flex-1 ${isMobile ? 'pb-20' : ''}`}>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          {children}
        </div>
      </main>
    </div>
  );
}
