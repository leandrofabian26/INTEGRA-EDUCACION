
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MessageSquare, Plus, ThumbsUp } from "lucide-react";

const forumCategories = [
  { id: "all", name: "Todos" },
  { id: "question", name: "Preguntas" },
  { id: "discussion", name: "Discusiones" },
  { id: "resource", name: "Recursos" },
];

const forumPosts = [
  {
    id: 1,
    title: "¿Cómo puedo crear grupos en Google Classroom?",
    author: "María Rodríguez",
    date: new Date(Date.now() - 3600000 * 2).toISOString().split('T')[0], // 2 horas atrás
    category: "question",
    replies: 8,
    likes: 12,
    content: "Estoy intentando organizar a mis estudiantes en grupos para un proyecto, pero no encuentro la opción en Google Classroom. ¿Alguien me puede ayudar?",
  },
  {
    id: 2,
    title: "Compartiendo mi experiencia con Kahoot",
    author: "Carlos Gómez",
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // 1 día atrás
    category: "discussion",
    replies: 15,
    likes: 23,
    content: "He estado utilizando Kahoot para hacer mis clases más interactivas y los estudiantes están muy motivados. Comparto mi experiencia y algunos consejos.",
  },
  {
    id: 3,
    title: "Plantillas para planificar clases virtuales",
    author: "Ana Martínez",
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0], // 2 días atrás
    category: "resource",
    replies: 12,
    likes: 28,
    content: "Comparto algunas plantillas que he creado para planificar clases virtuales. Espero que les sean útiles.",
  },
  {
    id: 4,
    title: "Problemas con la conexión en zonas rurales",
    author: "Javier López",
    date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0], // 3 días atrás
    category: "discussion",
    replies: 18,
    likes: 14,
    content: "Quiero iniciar una discusión sobre las dificultades de conectividad en las zonas rurales y cómo podemos adaptar nuestras estrategias.",
  },
  {
    id: 5,
    title: "¿Qué herramienta recomiendan para crear evaluaciones?",
    author: "Laura Díaz",
    date: new Date(Date.now() - 86400000 * 4).toISOString().split('T')[0], // 4 días atrás
    category: "question",
    replies: 10,
    likes: 9,
    content: "Necesito crear evaluaciones en línea que sean fáciles de usar para mis estudiantes. ¿Qué herramientas me recomiendan?",
  },
  {
    id: 6,
    title: "Recursos educativos gratuitos para ciencias naturales",
    author: "Patricia Ramírez",
    date: new Date(Date.now() - 3600000 * 5).toISOString().split('T')[0], // 5 horas atrás
    category: "resource",
    replies: 5,
    likes: 16,
    content: "Encontré algunos recursos increíbles para enseñar ciencias naturales de forma digital. Los comparto con la comunidad.",
  },
];

export default function Forum() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPosts = forumPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-CO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Layout>
      <div className="py-4">
        <PageHeader
          title="Foro de Docentes"
          description="Comparte experiencias y consulta con otros educadores"
        />

        <div className="mb-6 flex justify-between items-center">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="search"
                placeholder="Buscar en el foro..."
                className="pl-10 min-w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {forumCategories.map((category) => (
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
          <Button className="hidden sm:flex gap-2">
            <Plus className="h-5 w-5" />
            <span>Nuevo tema</span>
          </Button>
        </div>

        <Button className="w-full sm:hidden mb-4 gap-2">
          <Plus className="h-5 w-5" />
          <span>Nuevo tema</span>
        </Button>

        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="border card-hover">
              <CardContent className="p-5">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(post.author)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Por {post.author} • {formatDate(post.date)}
                        </p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        post.category === "question" 
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                          : post.category === "discussion" 
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      }`}>
                        {post.category === "question" 
                          ? "Pregunta" 
                          : post.category === "discussion" 
                          ? "Discusión" 
                          : "Recurso"}
                      </span>
                    </div>
                    
                    <p className="text-sm mt-3">{post.content}</p>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <Button variant="ghost" size="sm" className="text-muted-foreground flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {post.replies} {post.replies === 1 ? "respuesta" : "respuestas"}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="ml-auto text-primary">
                        Ver tema
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-lg text-muted-foreground">
                No se encontraron temas que coincidan con tu búsqueda.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4"
              >
                Mostrar todos los temas
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
