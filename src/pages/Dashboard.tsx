
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Book, Calendar, FileText, MessageSquare, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const featuredItems = [
    {
      title: "Tutoriales",
      description: "Aprende a usar herramientas digitales",
      icon: Book,
      path: "/tutorials",
      color: "bg-reduk-softYellow",
    },
    {
      title: "Recursos",
      description: "Materiales descargables para tus clases",
      icon: FileText,
      path: "/resources",
      color: "bg-reduk-softGreen",
    },
    {
      title: "Calendario",
      description: "Próximas capacitaciones",
      icon: Calendar,
      path: "/calendar",
      color: "bg-reduk-peach",
    },
    {
      title: "Foro de Ayuda",
      description: "Conecta con otros docentes",
      icon: MessageSquare,
      path: "/forum",
      color: "bg-secondary",
    },
  ];

  const progressItems = [
    {
      title: "Introducción a Canva",
      progress: 100,
      badge: "Completado",
      date: "Completado hoy",
    },
    {
      title: "Google Drive Básico",
      progress: 75,
      badge: "En progreso",
      date: "Última actividad: hace 2 horas",
    },
    {
      title: "Evaluaciones con Google Forms",
      progress: 30,
      badge: "En progreso",
      date: "Iniciado hoy",
    },
  ];

  const recentActivity = [
    { action: "Completaste", item: "Tutorial de Canva", time: "hace 3 horas" },
    { action: "Descargaste", item: "Guía de Google Classroom", time: "hace 5 horas" },
    { action: "Participaste en", item: "Foro de Docentes", time: "ayer" },
  ];

  return (
    <Layout>
      <div className="py-4">
        <PageHeader 
          title="Bienvenido, Docente" 
          description="Explora los recursos y herramientas disponibles para ti"
        />

        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredItems.map((item, index) => (
              <Link to={item.path} key={index} className="card-hover">
                <Card className="border h-full">
                  <CardContent className="p-6">
                    <div className={`rounded-full ${item.color} p-3 w-12 h-12 flex items-center justify-center mb-4`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2 border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                Mi Progreso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progressItems.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium">{item.title}</span>
                        <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.progress === 100
                          ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500"
                          : item.progress > 0
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-500"
                      }`}>
                        {item.badge}
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                      <Trophy className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.action}</span>{" "}
                        <span className="text-muted-foreground">{activity.item}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
}
