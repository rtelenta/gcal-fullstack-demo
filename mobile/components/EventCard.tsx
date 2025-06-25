import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Calendar, Clock, Globe } from "lucide-react-native";
import { fetcher } from "@/utils/fetcher";
import Toast from "./Toast";

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

export function EventCard() {
  const [showToast, setShowToast] = React.useState(false);

  async function addToGoogleCalendar() {
    try {
      await fetcher.post("/add-event", eventData);

      setShowToast(true);
    } catch (error) {
      console.error("Error al crear el evento:", error);
    }
  }

  return (
    <View style={styles.eventCardWrapper}>
      {showToast && (
        <Toast
          visible={showToast}
          message="Evento creado! 🎉"
          onHide={() => setShowToast(false)}
          duration={3000}
        />
      )}

      {/* Event Card */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {}}
        style={styles.eventCard}
      >
        {/* Event Header */}
        <View style={styles.eventHeader}>
          <Calendar size={24} color="#2C2C2C" strokeWidth={2} />
          <Text style={styles.eventTitle}>{eventData.summary}</Text>
        </View>

        {/* Event Description */}
        <Text style={styles.eventDescription}>{eventData.description}</Text>

        {/* Event Details */}
        <View style={styles.eventDetails}>
          <View style={styles.eventDetailRow}>
            <Clock size={16} color="#666666" strokeWidth={2} />
            <Text style={styles.eventDetailLabel}>Inicio:</Text>
            <Text style={styles.eventDetailValue}>
              {formatDateTime(eventData.start)}
            </Text>
          </View>

          <View style={styles.eventDetailRow}>
            <Clock size={16} color="#666666" strokeWidth={2} />
            <Text style={styles.eventDetailLabel}>Fin:</Text>
            <Text style={styles.eventDetailValue}>
              {formatDateTime(eventData.end)}
            </Text>
          </View>

          <View style={styles.eventDetailRow}>
            <Globe size={16} color="#666666" strokeWidth={2} />
            <Text style={styles.eventDetailLabel}>Zona horaria:</Text>
            <Text style={styles.eventDetailValue}>{eventData.timezone}</Text>
          </View>
        </View>

        {/* Add to Calendar Button */}
        <TouchableOpacity
          style={styles.addToCalendarButton}
          onPress={addToGoogleCalendar}
        >
          <Text style={styles.addToCalendarText}>Añadir a Google Calendar</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  eventCardWrapper: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
    marginTop: 80,
  },
  eventCardContainer: {
    width: "100%",
    maxWidth: 400,
  },
  eventCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  eventHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2C2C2C",
    marginLeft: 12,
    flex: 1,
  },
  eventDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    marginBottom: 24,
  },
  eventDetails: {
    marginBottom: 32,
  },
  eventDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  eventDetailLabel: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 8,
    marginRight: 8,
    fontWeight: "500",
  },
  eventDetailValue: {
    fontSize: 14,
    color: "#2C2C2C",
    flex: 1,
  },
  addToCalendarButton: {
    backgroundColor: "#2C2C2C",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  addToCalendarText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
