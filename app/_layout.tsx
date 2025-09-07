import { useAuthStore } from "@/store/auth";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Host } from "react-native-portalize";
import "./global.css";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  const { user, onboarding_complete, setUser } = useAuthStore();
  const router = useRouter();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (isReady) {
      router.replace("/(protected)/home/skifinder");
    }
  }, [isReady]);

  useEffect(() => {
    (async () => {
      setUser({
        email: "",
        full_name: "",
        verified: true,
      });

      setIsReady(true);
    })();
  }, []);

  return (
    <KeyboardProvider>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
      >
        <Host>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false }} />
        </Host>
      </GestureHandlerRootView>
    </KeyboardProvider>
  );
}
