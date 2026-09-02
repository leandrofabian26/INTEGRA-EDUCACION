
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, User, GraduationCap, Trophy, Clock } from "lucide-react";

const userProfile = {
  name: "María Rodríguez",
  role: "Docente de Primaria",
  school: "Institución Educativa Rural El Retorno",
  location: "El Retorno, Guaviare",
  email: "maria.rodriguez@educa.gov.co",
  joinedDate: "Enero 2025",
  bio: "Docente con más de 5 años de experiencia en zonas rurales. Apasionada por integrar la tecnología en la educación.",
};

const completedCourses = [
  {
    title: "Introducción a Canva",
    date: "15 de abril, 2025",
    duration: "45 minutos",
    badge: "Completado",
  },
  {
    title: "Google Drive Básico",
    date: "10 de abril, 2025",
    duration: "30 minutos",
    badge: "Completado",
  },
];

const inProgressCourses = [
  {
    title: "Google Classroom",
    progress: 60,
    date: "En progreso",
    duration: "60 minutos",
    badge: "En progreso",
  },
];

const achievements = [
  {
    title: "Primer Tutorial",
    description: "Completaste tu primer tutorial",
    date: "10 de abril, 2025",
    icon: BookOpen,
  },
  {
    title: "Explorador Digital",
    description: "Visitaste todas las secciones",
    date: "12 de abril, 2025",
    icon: Trophy,
  },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Layout>
      <div className="py-4">
        <PageHeader 
          title="Mi Perfil" 
          description="Gestiona tu información y revisa tu progreso"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border md:col-span-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  MR
                </AvatarFallback>
              </Avatar>

              <h2 className="text-2xl font-bold mb-1">{userProfile.name}</h2>
              <p className="text-muted-foreground mb-4">{userProfile.role}</p>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge variant="outline" className="flex items-center gap-1 py-1.5">
                  <GraduationCap className="h-3.5 w-3.5" />
                  {userProfile.school}
                </Badge>
              </div>

              <div className="text-left w-full space-y-2 mb-6">
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Correo electrónico</p>
                    <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Miembro desde</p>
                    <p className="text-sm text-muted-foreground">{userProfile.joinedDate}</p>
                  </div>
                </div>
              </div>

              <Button className="w-full">Editar Perfil</Button>
            </CardContent>
          </Card>

          <Card className="border md:col-span-2">
            <Tabs defaultValue="profile" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <CardHeader className="pb-0">
                <TabsList className="grid grid-cols-3 w-full max-w-md">
                  <TabsTrigger value="profile">Información</TabsTrigger>
                  <TabsTrigger value="courses">Cursos</TabsTrigger>
                  <TabsTrigger value="achievements">Logros</TabsTrigger>
                </TabsList>
              </CardHeader>
              
              <CardContent className="pt-6">
                <TabsContent value="profile">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Sobre mí</h3>
                      <p className="text-muted-foreground">{userProfile.bio}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Información adicional</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border">
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-1">Institución</h4>
                            <p className="text-muted-foreground">{userProfile.school}</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="border">
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-1">Ubicación</h4>
                            <p className="text-muted-foreground">{userProfile.location}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="courses">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Cursos completados</h3>
                      <div className="space-y-3">
                        {completedCourses.map((course, index) => (
                          <Card key={index} className="border">
                            <CardContent className="p-4 flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">{course.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Completado el {course.date} • {course.duration}
                                </p>
                              </div>
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/30 dark:text-green-500 dark:hover:bg-green-800/30">
                                {course.badge}
                              </Badge>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Cursos en progreso</h3>
                      <div className="space-y-3">
                        {inProgressCourses.map((course, index) => (
                          <Card key={index} className="border">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium">{course.title}</h4>
                                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-800/30 dark:text-blue-500 dark:hover:bg-blue-800/30">
                                  {course.badge}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {course.duration}
                              </p>
                              <div className="w-full bg-secondary rounded-full h-2.5">
                                <div
                                  className="bg-primary h-2.5 rounded-full"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-right mt-1 text-muted-foreground">
                                {course.progress}% completado
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="achievements">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-3">Mis logros</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => {
                        const Icon = achievement.icon;
                        return (
                          <Card key={index} className="border">
                            <CardContent className="p-4 flex items-start gap-4">
                              <div className="bg-reduk-peach rounded-full p-2 mt-1">
                                <Icon className="h-5 w-5 text-orange-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">{achievement.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {achievement.description}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Obtenido el {achievement.date}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
