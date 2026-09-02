
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, FileText, Search } from "lucide-react";

const resourceCategories = [
  { id: "all", name: "Todos" },
  { id: "guide", name: "Guías" },
  { id: "worksheet", name: "Hojas de Trabajo" },
  { id: "presentation", name: "Presentaciones" },
];

const resources = [
  {
    id: 1,
    title: "Guía de uso de Google Classroom",
    description: "Manual paso a paso para configurar tu aula virtual",
    category: "guide",
    fileType: "PDF",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Plantilla para planificación de clases",
    description: "Formato editable para planificar tus clases con herramientas digitales",
    category: "worksheet",
    fileType: "DOCX",
    size: "1.8 MB",
  },
  {
    id: 3,
    title: "Material para clase de matemáticas",
    description: "Recursos interactivos para enseñar conceptos matemáticos",
    category: "presentation",
    fileType: "PPTX",
    size: "5.2 MB",
  },
  {
    id: 4,
    title: "Rúbrica de evaluación digital",
    description: "Plantilla para evaluar proyectos digitales de los estudiantes",
    category: "worksheet",
    fileType: "XLSX",
    size: "0.9 MB",
  },
  {
    id: 5,
    title: "Manual de herramientas de colaboración",
    description: "Guía sobre cómo utilizar herramientas colaborativas en línea",
    category: "guide",
    fileType: "PDF",
    size: "3.5 MB",
  },
  {
    id: 6,
    title: "Presentación sobre cuidado ambiental",
    description: "Slides editables sobre temas ambientales para ciencias naturales",
    category: "presentation",
    fileType: "PPTX",
    size: "4.1 MB",
  },
];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="py-4">
        <PageHeader
          title="Recursos"
          description="Descarga materiales para utilizar en tus clases"
        />

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="search"
                placeholder="Buscar recursos..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {resourceCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="border card-hover">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-full ${
                      resource.fileType === "PDF" 
                        ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" 
                        : resource.fileType === "DOCX" 
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                    }`}>
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-medium bg-secondary px-2 py-1 rounded-full">
                        {resource.fileType}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-xl mb-2">{resource.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {resource.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {resource.size}
                    </span>
                    <Button variant="outline" className="font-medium flex gap-2 items-center">
                      <Download className="h-4 w-4" />
                      Descargar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-10">
              <p className="text-lg text-muted-foreground">
                No se encontraron recursos que coincidan con tu búsqueda.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4"
              >
                Mostrar todos los recursos
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
