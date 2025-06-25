import { EventCard } from "@/components/EventCard";
import LoginScreen from "@/components/LoginForm";
import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

export default function HomeScreen() {
  const [isAuthorized, setAuthorized] = useState(false);

  const handleAuthorized = () => {
    setAuthorized(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      {isAuthorized ? (
        <EventCard />
      ) : (
        <LoginScreen onAuthorized={handleAuthorized} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
});
