import { queryClient } from "@/lib/queryClient"
import { useAuthStore } from "@/store/auth";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Host } from "react-native-portalize";
import "./global.css";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { Text } from "react-native";
import { QueryClientProvider } from "@tanstack/react-query";

SplashScreen.setOptions({
    duration: 0,
    fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { user, onboarding_complete, setUser } = useAuthStore();
    const router = useRouter();
    const [isReady, setIsReady] = useState<boolean>(false);
    const [fontsLoaded] = useFonts({
        PathRegular: require("@/assets/fonts/PathwayExtreme_14pt-Regular.ttf"),
        PathMedium: require("@/assets/fonts/PathwayExtreme_14pt-Medium.ttf"),
        PathSemi: require("@/assets/fonts/PathwayExtreme_14pt-SemiBold.ttf"),
        PathBold: require("@/assets/fonts/PathwayExtreme_14pt-Bold.ttf"),
        PoppinsRegular: require("@/assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("@/assets/fonts/Poppins-Medium.ttf"),
        PoppinsSemi: require("@/assets/fonts/Poppins-SemiBold.ttf"),
        PoppinsBold: require("@/assets/fonts/Poppins-Bold.ttf"),
        Test: require("@/assets/fonts/ImperialScript-Regular.ttf"),
    });

    const authintacted = false;

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hide();
            router.replace("/(public)");
        }
    }, [isReady, fontsLoaded]);

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

    if (!fontsLoaded) return null;

    return (
        <KeyboardProvider>
            <GestureHandlerRootView
                style={{
                    flex: 1,
                }}
            >
                <Host>
                    <StatusBar style="light" />
                    <QueryClientProvider client={queryClient}>
                        <Stack screenOptions={{ headerShown: false }}>
                            <Stack.Protected guard={authintacted}>
                                <Stack.Screen name="(protected)" />
                                <Stack.Screen name="winsole-questions" />
                                <Stack.Screen name="others" />
                                <Stack.Screen name="on-boarding" />
                                <Stack.Screen name="(scan-upload)" />
                                <Stack.Screen name="(exercise-questions)" />
                            </Stack.Protected>
                            <Stack.Protected guard={!authintacted}>
                                <Stack.Screen name="(public)" />
                            </Stack.Protected>
                        </Stack>
                    </QueryClientProvider>
                </Host>
            </GestureHandlerRootView>
        </KeyboardProvider>
    );
}
