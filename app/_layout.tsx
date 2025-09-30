import { queryClient } from "@/lib/queryClient";
import { useAutoLogin } from "@/lib/init"; // Import your new hook
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
import { QueryClientProvider } from "@tanstack/react-query";

SplashScreen.setOptions({
    duration: 0,
    fade: true,
});
SplashScreen.preventAutoHideAsync();

export function RootLayout() {
    const { user, isLoggedIn, onboarding_complete, setUser } = useAuthStore();
    const router = useRouter();
    const [isReady, setIsReady] = useState<boolean>(false);

    const {
        autoLogin,
        isLoading: autoLoginLoading,
        error: autoLoginError,
    } = useAutoLogin();

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

    useEffect(() => {
        if (fontsLoaded && isReady && !autoLoginLoading) {
            SplashScreen.hide();
            // console.log("IsLoggedIn: ", isLoggedIn);
        }
    }, [isReady, fontsLoaded, autoLoginLoading, isLoggedIn]);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const result = await autoLogin(setUser);
                if (result.user) setUser(result.user);
                if (result.action) {
                    setTimeout(() => {
                        switch (result.action) {
                            case "navigate_home":
                                router.replace("/(protected)/home");
                                break;
                            case "navigate_onboarding":
                                router.push("/on-boarding");
                                break;
                            case "navigate_otp":
                                if (result.navigationParams) {
                                    router.push(result.navigationParams);
                                }
                                break;
                        }
                    }, 100);
                }
            } catch (error) {
                // console.error("Auto-login failed:", error);
            } finally {
                setIsReady(true);
            }
        };

        initializeAuth();
    }, [autoLogin, setUser, router]);

    useEffect(() => {
        if (autoLoginError) {
            // console.error("Auto-login error:", autoLoginError);
        }
    }, [autoLoginError]);

    if (!fontsLoaded || !isReady || autoLoginLoading) {
        return null;
    }

    return (
        <KeyboardProvider>
            <GestureHandlerRootView
                style={{
                    flex: 1,
                }}
            >
                <Host>
                    <StatusBar style="light" />
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Protected guard={!isLoggedIn}>
                            <Stack.Screen name="(public)" />
                        </Stack.Protected>
                        <Stack.Protected guard={isLoggedIn}>
                            <Stack.Screen name="(protected)" />
                            <Stack.Screen name="(exercise-questions)" />
                            <Stack.Screen name="(scan-upload)" />
                            <Stack.Screen name="/on-boarding" />
                            <Stack.Screen name="/others" />
                            <Stack.Screen name="/winsole-questions" />
                        </Stack.Protected>
                    </Stack>
                </Host>
            </GestureHandlerRootView>
        </KeyboardProvider>
    );
}

export default function RootLayoutWrapper() {
    return (
        <QueryClientProvider client={queryClient}>
            <RootLayout />
        </QueryClientProvider>
    );
}
