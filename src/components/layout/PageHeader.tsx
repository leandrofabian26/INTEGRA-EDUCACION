
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "./ThemeToggle";

type PageHeaderProps = {
  title: string;
  description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 md:py-8 border-b border-border mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {isMobile && <ThemeToggle />}
    </div>
  );
}
