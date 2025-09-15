import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Screen() {
    const { isGerman } = useLanguageStore();
    return (
        <Layout className="justify-between">
            <View className="flex-1 items-center gap-4">
                <Typography variant="onboarding-header" className="text-center text-white font-pathSemiBold text-[20px]">
                    {isGerman()
                        ? "Willkommen im Winsole-Konfigurator!"
                        : "Benvenuti al configuratore Winsole!"}
                </Typography>

                <Typography variant="subtitle" className="text-white font-pathSemiBold text-[15px] text-center">
                    {isGerman()
                        ? "Starte jetzt mit wenigen persönlichen Fragen und sichere dir die weltweit führende Radschuheinlage - individuell für dich gefertigt."
                        : "Inizia subito con poche domande personali e assicurati la soletta per scarpe da ciclismo leader al mondo, realizzata su misura per te."}
                </Typography>
                <Typography
                    variant="subtitle"
                    className="text-white font-pathBold text-[15px] text-center mt-6"
                >
                    {isGerman()
                        ? "Ab 199,99 € schaffst du eine einzigartige, leistungssteigernde Verbindung zwischen Fuß und Radschuh.."
                        : "A partire da 199,99 €, puoi creare una connessione unica e performante tra il tuo piede e la scarpa da ciclismo."}
                </Typography>
            </View>

            <Link asChild href={"/winsole-questions/after-loading/second"}>
                <Button variant="big" textClassName="text-white font-pathSemiBold text-[16px] py-1">
                    {isGerman()
                        ? "Fortfahren"
                        : "Continuare"}
                </Button>
            </Link>
        </Layout>
    );
}
