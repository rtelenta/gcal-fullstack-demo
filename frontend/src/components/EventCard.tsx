import { Calendar, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { fetcher } from "@/utils/fetcher";

interface EventData {
  summary: string;
  description: string;
  start: string;
  end: string;
  timezone: string;
}

const now = new Date();
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const startDate = new Date(now.getTime() + 1 * 60 * 60 * 1000); // +1 hour
const endDate = new Date(now.getTime() + 2 * 60 * 60 * 1000); // +2 hours
const formatDate = (date: Date) => date.toISOString().slice(0, 19);

const eventData: EventData = {
  summary: "Dominar al mundo",
  description:
    "Un evento para planificar la dominación mundial con los mejores líderes.",
  start: formatDate(startDate),
  end: formatDate(endDate),
  timezone,
};

function formatDateTime(dateTime: string) {
  return new Date(dateTime).toLocaleString("es-ES", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function addToGoogleCalendar() {
  try {
    const res = await fetcher.post("/add-event", eventData);

    toast("Evento creado! 🎉", {
      description: eventData.summary,
      action: {
        label: "Ver en Google Calendar",
        onClick: () => {
          window.open(res.data.htmlLink, "_blank");
        },
      },
      duration: 5000,
    });
  } catch {
    toast("Error al crear el evento", {
      description: "Por favor, inténtalo de nuevo más tarde.",
    });
  }
}

export default function EventCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {eventData.summary}
        </CardTitle>
        <CardDescription>{eventData.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Inicio:</span>
            <span>{formatDateTime(eventData.start)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Fin:</span>
            <span>{formatDateTime(eventData.end)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Zona horaria:</span>
            <span>{eventData.timezone}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={addToGoogleCalendar} className="w-full cursor-pointer">
          Añadir a Google Calendar
        </Button>
      </CardFooter>
    </Card>
  );
}
