
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const tutorialCategories = [
  { id: "all", name: "Todos" },
  { id: "presentation", name: "Presentaciones" },
  { id: "document", name: "Documentos" },
  { id: "classroom", name: "Aula Virtual" },
];

const tutorials = [
  {
    id: 1,
    title: "Cómo crear presentaciones con Canva",
    description: "Aprende a diseñar presentaciones atractivas con Canva",
    category: "presentation",
    level: "Principiante",
    duration: "45 minutos",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FudmF8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    title: "Google Drive: almacenamiento en la nube",
    description: "Gestiona y comparte archivos con Google Drive",
    category: "document",
    level: "Principiante",
    duration: "30 minutos",
    image: "https://images.unsplash.com/photo-1515524738708-327f6b0037a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29vZ2xlJTIwZHJpdmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    title: "Google Classroom para principiantes",
    description: "Crea y gestiona un aula virtual con Google Classroom",
    category: "classroom",
    level: "Intermedio",
    duration: "60 minutos",
    image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z29vZ2xlJTIwY2xhc3Nyb29tfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    title: "Diseño de documentos en Google Docs",
    description: "Crea documentos profesionales colaborativos",
    category: "document",
    level: "Principiante",
    duration: "35 minutos",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29vZ2xlJTIwZG9jc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 5,
    title: "Presentaciones interactivas con Genially",
    description: "Crea contenido interactivo para tus clases",
    category: "presentation",
    level: "Intermedio",
    duration: "50 minutos",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJlc2VudGF0aW9ufGVufDB8fDB8fHww",
  },
  {
    id: 6,
    title: "Evaluaciones con Google Forms",
    description: "Crea encuestas y evaluaciones digitales",
    category: "classroom",
    level: "Intermedio",
    duration: "40 minutos",
    image: "https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvcm18ZW58MHx8MHx8fDA%3D",
  },
];

export default function Tutorials() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch = tutorial.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || tutorial.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="py-4">
        <PageHeader
          title="Tutoriales"
          description="Aprende a usar herramientas digitales para el aula"
        />

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="search"
                placeholder="Buscar tutoriales..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {tutorialCategories.map((category) => (
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
            {filteredTutorials.map((tutorial) => (
              <Card key={tutorial.id} className="overflow-hidden border card-hover">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={tutorial.image}
                    alt={tutorial.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-reduk-softYellow inline-block mb-2">
                    {tutorial.level}
                  </span>
                  <h3 className="font-semibold text-xl mb-2">{tutorial.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {tutorial.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {tutorial.duration}
                    </span>
                    <Button variant="ghost" className="font-medium text-primary">
                      Ver tutorial
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTutorials.length === 0 && (
            <div className="text-center py-10">
              <p className="text-lg text-muted-foreground">
                No se encontraron tutoriales que coincidan con tu búsqueda.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4"
              >
                Mostrar todos los tutoriales
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
