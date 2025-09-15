import { useAuthStore } from "@/store/auth";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Host } from "react-native-portalize";
import "./global.css";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useFonts } from 'expo-font';
import {View} from 'react-native'

export default function RootLayout() {
    const { user, onboarding_complete, setUser } = useAuthStore();
    const router = useRouter();
    const [isReady, setIsReady] = useState<boolean>(false);
    const [fontsLoaded] = useFonts({
    PathRegular: require('@/assets/fonts/PathwayExtreme_14pt-Regular.ttf'),
    PathMedium: require('@/assets/fonts/PathwayExtreme_14pt-Medium.ttf'), 
    PathSemi: require('@/assets/fonts/PathwayExtreme_14pt-SemiBold.ttf'),
    PathBold: require('@/assets/fonts/PathwayExtreme_14pt-Bold.ttf'),
    PoppinsRegular: require('@/assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('@/assets/fonts/Poppins-Medium.ttf'),
    PoppinsSemi: require('@/assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsBold: require('@/assets/fonts/Poppins-Bold.ttf'),
    Test: require('@/assets/fonts/ImperialScript-Regular.ttf'),
    
  });

//   if (!fontsLoaded) {
//     return <></>; // or a splash loader
//   }

    useEffect(() => {
        if (isReady) {
            router.replace("/(public)");
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
