
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

// Crear fechas dinámicas (próximas 4 semanas)
const getUpcomingDate = (daysFromNow: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

const trainingEvents = [
  {
    id: 1,
    title: "Taller de Canva Avanzado",
    date: getUpcomingDate(3),
    time: "10:00 - 12:00",
    location: "Virtual - Zoom",
    description: "Aprende a diseñar material educativo atractivo con Canva",
  },
  {
    id: 2,
    title: "Google Classroom para Principiantes",
    date: getUpcomingDate(5),
    time: "15:00 - 17:00",
    location: "Virtual - Meet",
    description: "Gestiona tareas y evaluaciones en línea de forma efectiva",
  },
  {
    id: 3,
    title: "Herramientas de Colaboración Digital",
    date: getUpcomingDate(10),
    time: "14:00 - 16:00",
    location: "Virtual - Zoom",
    description: "Usa documentos colaborativos y trabajo en equipo en el aula",
  },
  {
    id: 4,
    title: "Creación de Videos Educativos",
    date: getUpcomingDate(14),
    time: "10:00 - 12:00",
    location: "Virtual - Meet",
    description: "Aprende a crear videos profesionales para tus clases",
  },
  {
    id: 5,
    title: "Evaluaciones Digitales con Google Forms",
    date: getUpcomingDate(18),
    time: "16:00 - 18:00",
    location: "Virtual - Zoom",
    description: "Crea evaluaciones interactivas y automatizadas",
  },
  {
    id: 6,
    title: "Gamificación en el Aula con Kahoot",
    date: getUpcomingDate(21),
    time: "11:00 - 13:00",
    location: "Virtual - Meet",
    description: "Motiva a tus estudiantes con juegos educativos",
  },
];

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-CO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Get events for the selected date
  const selectedDateStr = date?.toISOString().split("T")[0];
  const eventsForSelectedDate = trainingEvents.filter(
    (event) => event.date === selectedDateStr
  );

  return (
    <Layout>
      <div className="py-4">
        <PageHeader
          title="Calendario de Capacitaciones"
          description="Mantente al día con nuestras capacitaciones programadas"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border lg:col-span-1">
            <CardContent className="p-4">
              <div className="flex justify-center">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  // Highlight days with events
                  modifiers={{
                    event: (day) => {
                      const dayStr = day.toISOString().split("T")[0];
                      return trainingEvents.some((event) => event.date === dayStr);
                    },
                  }}
                  modifiersStyles={{
                    event: {
                      fontWeight: "bold",
                      backgroundColor: "rgba(30, 174, 219, 0.1)",
                      borderRadius: "100%",
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border lg:col-span-2">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                {date ? (
                  <span>
                    Eventos para el{" "}
                    {new Intl.DateTimeFormat("es-CO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(date)}
                  </span>
                ) : (
                  "Selecciona una fecha"
                )}
              </h3>

              {eventsForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {eventsForSelectedDate.map((event) => (
                    <div
                      key={event.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-semibold text-lg">{event.title}</h4>
                      <div className="mt-2 space-y-1 text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </p>
                        <p>{event.location}</p>
                      </div>
                      <p className="mt-2">{event.description}</p>
                      <Button className="mt-3">Inscribirme</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No hay eventos programados para esta fecha.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border lg:col-span-3">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Próximas capacitaciones</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trainingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="border rounded-lg p-4 card-hover"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-muted-foreground">
                          {formatDate(event.date)}, {event.time}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Detalles
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
