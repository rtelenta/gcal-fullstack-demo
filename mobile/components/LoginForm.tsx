import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import { fetcher } from "@/utils/fetcher";

interface LoginScreenProps {
  onAuthorized?: () => void;
}

export default function LoginScreen({ onAuthorized }: LoginScreenProps) {
  const handleGoogleLogin = async () => {
    const res = await fetcher.get("/auth/url", {
      params: { is_mobile: "true" },
    });

    Linking.openURL(res.data.auth_url);
  };

  useEffect(() => {
    const handleDeepLink = (event: Linking.EventType) => {
      const data = Linking.parse(event.url);
      console.log("Deep link data:", data);
      onAuthorized?.();
    };

    const sub = Linking.addEventListener("url", handleDeepLink);
    return () => sub.remove();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <View style={styles.logoIconInner} />
          </View>
          <Text style={styles.companyName}>Acme Inc.</Text>
        </View>
      </View>

      <View style={styles.loginCard}>
        <Text style={styles.welcomeTitle}>Bienvenido</Text>
        <Text style={styles.subtitle}>
          Inicia sesión con tu cuenta de Google
        </Text>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
        >
          <View style={styles.googleIconContainer}>
            <Text style={styles.googleIcon}>G</Text>
          </View>
          <Text style={styles.googleButtonText}>Iniciar sesión con Google</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>No tienes una cuenta? </Text>
          <TouchableOpacity>
            <Text style={styles.registerLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.termsText}>
          Al hacer clic en continuar, aceptas nuestros{" "}
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Términos de servicio</Text>
          </TouchableOpacity>{" "}
          y{" "}
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Política de privacidad</Text>
          </TouchableOpacity>
          .
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    width: 32,
    height: 32,
    backgroundColor: "#2C2C2C",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  logoIconInner: {
    width: 16,
    height: 16,
    backgroundColor: "white",
    borderRadius: 2,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2C2C2C",
  },
  loginCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2C2C2C",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E8E",
    marginBottom: 32,
    textAlign: "center",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#DADCE0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: "100%",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  googleIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4285F4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  googleIcon: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3C4043",
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    color: "#5F6368",
  },
  registerLink: {
    fontSize: 14,
    color: "#1A73E8",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  footer: {
    justifyContent: "flex-end",
    paddingBottom: 32,
  },
  termsText: {
    fontSize: 12,
    color: "#5F6368",
    textAlign: "center",
    lineHeight: 18,
  },
  linkButton: {},
  linkText: {
    fontSize: 12,
    color: "#1A73E8",
    textDecorationLine: "underline",
  },
});
