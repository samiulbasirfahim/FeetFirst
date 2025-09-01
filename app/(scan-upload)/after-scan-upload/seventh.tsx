import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import CheckBox from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    View,
} from "react-native";

const optionsDE: string[] = [
    "Sportlich aktiv (regelmäßiges Training oder sportliche Aktivitäten)",
    "Mäßig aktiv (leichte körperliche Aktivität oder Gehen)",
];

const optionsIT: string[] = [
    "Attivo nello sport (allenamento regolare o attività sportive)",
    "Moderatamente attivo (attività fisica leggera o camminata)",
];

export default function Screen() {
    const { isGerman } = useLanguageStore();

    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    function toggleCheck(value: string) {
        setSelectedValue((prev) => (prev === value ? null : value));
    }

    const baseOptions = isGerman() ? optionsDE : optionsIT;
    const data = [...baseOptions];

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "padding"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 100}
            className="flex-1 bg-background"
        >
            <Layout>
                <View style={{ flex: 1, paddingBottom: 24 }}>
                    <Typography variant="title" className="text-foreground">
                        {isGerman()
                            ? "Haben Sie Schmerzen? Wenn ja, bitte markieren Sie die betroffenen Bereiche auf dem 3D-Modell"
                            : "Avverti dolore? In tal caso, contrassegna le aree interessate sul modello 3D."}
                    </Typography>
                </View>

                <Link asChild href={"/(scan-upload)/after-scan-upload/eighth"}>
                    <Button variant="big">
                        {isGerman() ? "Nächste Frage" : "Prossima domanda"}
                    </Button>
                </Link>

                <Link asChild href={"/(scan-upload)/after-scan-upload/eighth"}>
                    <Button variant="ghost">
                        {isGerman() ? "Überspringen" : "Saltare"}
                    </Button>
                </Link>
            </Layout>
        </KeyboardAvoidingView>
    );
}
