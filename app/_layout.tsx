import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import "./global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { Host } from "react-native-portalize";
import { useAuthStore } from "@/store/auth";

export default function RootLayout() {
    const { user, onboarding_complete, setUser } = useAuthStore();
    const router = useRouter();
    const segments = useSegments();

    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        if (isReady) {
            const inProtectedRoute = segments[0] === "(public)";

            if (!user) {
                router.replace("/(public)");
            } else if (!user.verified) {
                router.replace("/(public)/register/otp-authenticattion");
            } else if (!onboarding_complete) {
                router.replace("/on-boarding");
            } else if (!inProtectedRoute) {
                console.log("redirecting to protected")
                router.replace("/(protected)");
            }
        }
    }, [isReady, user, onboarding_complete, segments, router]);

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
        <Host>
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(public)" />
                <Stack.Screen name="(private)" />
                <Stack.Screen name="on-boarding" />
            </Stack>
        </Host>
    );
}
