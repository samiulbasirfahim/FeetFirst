import { HeaderBackButton } from "@/components/ui/header-back-button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Stack } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsLayout() {
    const { isGerman } = useLanguageStore();
    const { top } = useSafeAreaInsets();
    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                header: ({ options }) => {
                    return (
                        <View
                            style={{ paddingTop: top }}
                            className="bg-backgroundDark w-full flex-row relative"
                        >
                            <View className="flex-row items-center justify-start flex-1">
                                <View className="ps-4">
                                    <HeaderBackButton />
                                </View>
                                <Typography className="absolute left-1/2 -translate-x-1/2 font-semibold text-lg text-white">
                                    {options.title}
                                </Typography>
                            </View>
                        </View>
                    );
                },
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: isGerman() ? "Einstellungen" : "Impostazioni",
                }}
            />
            <Stack.Screen
                name="address"
                options={{
                    title: isGerman() ? "Adresse" : "Indirizzo",
                }}
            />

            <Stack.Screen
                name="favorites"
                options={{
                    title: isGerman() ? "Favoriten" : "Preferiti",
                }}
            />

            <Stack.Screen
                name="faq"
                options={{
                    title: "FAQ",
                }}
            />

            <Stack.Screen
                name="contact-us"
                options={{
                    title: isGerman() ? "Kontaktieren Sie uns" : "Contattaci",
                }}
            />

            <Stack.Screen
                name="version-information"
                options={{
                    title: isGerman()
                        ? "Versionsinformationen"
                        : "Informazioni sulla versione",
                }}
            />

            <Stack.Screen
                name="privacy-policy"
                options={{
                    title: isGerman()
                        ? "Allgemeine Geschäftsbedingungen"
                        : "Termini e condizioni",
                }}
            />

            <Stack.Screen
                name="terms-and-conditions"
                options={{
                    title: isGerman()
                        ? "Allgemeine Geschäftsbedingungen"
                        : "Termini e condizioni",
                }}
            />
            <Stack.Screen
                name="change-password"
                options={{
                    title: isGerman() ? "Passwort ändern" : "Cambiare la password",
                }}
            />


            <Stack.Screen name="delete-account" options={{
                title: isGerman() ? "Konto löschen" : "Elimina Account"
            }} />

        </Stack>
    );
}
