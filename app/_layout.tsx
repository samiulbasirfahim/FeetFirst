import { useAuthStore } from "@/store/auth";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Host } from "react-native-portalize";
import "./global.css";

export default function RootLayout() {
  const { user, onboarding_complete, setUser } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (isReady) {
      router.replace("/(protected)/home/foot-exercise/strengthen-foot-muscles");
      // const inProtectedRoute = segments[0] === "(public)";
      // if (!user) {
      //     router.replace("/(public)");
      // } else if (!user.verified) {
      //     router.replace("/(public)/register/otp-authenticattion");
      // } else if (!onboarding_complete) {
      //     router.replace("/on-boarding");
      // } else if (!inProtectedRoute) {
      //     router.replace("/(protected)");
      // }
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
  );
}
