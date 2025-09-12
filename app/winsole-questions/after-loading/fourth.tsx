import TwoDPreview from "@/components/common/2d-preview";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Screen() {
    const { isGerman } = useLanguageStore();
    return (
        <Layout className="justify-between" scrollable>
            <View className="flex-1 items-center gap-4">
                <Typography variant="title" className="text-foreground text-center">
                    {isGerman()
                        ? "Haben Sie Schmerzen? Wenn ja, bitte markieren Sie die betroffenen Bereiche auf dem 2D-Modell."
                        : "Avverti dolore? In tal caso, contrassegna le aree interessate sul modello 2D."}
                </Typography>
            </View>
            <View className="mb-14 mt-4">
                <TwoDPreview />
            </View>

            <Link asChild href={"/winsole-questions/after-loading/fifth"}>
                <Button variant="big">
                    {isGerman() ? "Nächste Frage" : "Prossima domanda"}
                </Button>
            </Link>

            <Link asChild href={"/winsole-questions/after-loading/fifth"}>
                <Button variant="ghost">
                    {isGerman() ? "Überspringen" : "Saltare"}
                </Button>
            </Link>
        </Layout>
    );
}
