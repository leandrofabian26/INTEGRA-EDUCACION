import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Users } from "lucide-react";

type Message = {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  isCurrentUser: boolean;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: "María González",
      text: "¡Hola a todos! ¿Alguien ha probado usar Canva para crear presentaciones?",
      timestamp: new Date(Date.now() - 3600000),
      isCurrentUser: false,
    },
    {
      id: "2",
      user: "Juan Pérez",
      text: "¡Sí! Es muy fácil de usar. Hay muchas plantillas educativas.",
      timestamp: new Date(Date.now() - 3300000),
      isCurrentUser: false,
    },
    {
      id: "3",
      user: "Tú",
      text: "Me gustaría aprender más sobre Google Classroom",
      timestamp: new Date(Date.now() - 2700000),
      isCurrentUser: true,
    },
    {
      id: "4",
      user: "Carlos López",
      text: "Hay un tutorial muy bueno en la sección de tutoriales sobre Google Classroom 👍",
      timestamp: new Date(Date.now() - 1800000),
      isCurrentUser: false,
    },
    {
      id: "5",
      user: "Ana Martínez",
      text: "También les recomiendo revisar los recursos descargables, hay guías muy útiles",
      timestamp: new Date(Date.now() - 900000),
      isCurrentUser: false,
    },
    {
      id: "6",
      user: "Tú",
      text: "¡Muchas gracias! Ya los revisaré",
      timestamp: new Date(Date.now() - 300000),
      isCurrentUser: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: Date.now().toString(),
      user: "Tú",
      text: newMessage,
      timestamp: new Date(),
      isCurrentUser: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <div className="py-6 space-y-6">
        <PageHeader
          title="Chat Comunitario"
          description="Conversa y comparte experiencias con otros docentes"
        />

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Panel lateral - Usuarios en línea */}
          <Card className="lg:col-span-1 h-fit">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">En línea (8)</h3>
              </div>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {[
                    "María González",
                    "Juan Pérez",
                    "Ana Martínez",
                    "Carlos López",
                    "Laura Rodríguez",
                    "Pedro Sánchez",
                    "Sofia Torres",
                    "Diego Ruiz",
                  ].map((user, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user}</p>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span className="text-xs text-muted-foreground">
                            En línea
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Área principal de chat */}
          <Card className="lg:col-span-3">
            <CardContent className="p-4">
              <ScrollArea className="h-[500px] pr-4 mb-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.isCurrentUser ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarFallback
                          className={
                            message.isCurrentUser
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }
                        >
                          {message.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`flex-1 ${
                          message.isCurrentUser ? "text-right" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {!message.isCurrentUser && (
                            <p className="text-sm font-semibold">
                              {message.user}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString("es-CO", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div
                          className={`inline-block p-3 rounded-lg ${
                            message.isCurrentUser
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input de mensaje */}
              <div className="flex gap-2">
                <Input
                  placeholder="Escribe un mensaje..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
