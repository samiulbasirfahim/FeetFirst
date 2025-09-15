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
        <Typography
          variant="onboarding-header"
          className="text-white text-center font-pathSemiBold text-[20px]"
        >
          {isGerman()
            ? "Willkommen im Einlagen-Konfigurator"
            : "Benvenuti al configuratore delle solette!"}
        </Typography>

        <Typography variant="subtitle" className="text-white text-center font-pathSemiBold text-[15px] mt-2">
          {isGerman()
            ? "Beantworte jetzt ein paar persönliche Fragen zusammen mit deinem 3D-Scan entstehen daraus deine maßgeschneiderten Einlagen, nur für dich gefertigt."
            : "Rispondi ad alcune domande personali e combina la tua scansione 3D con le solette personalizzate, realizzate appositamente per te."}
        </Typography>
        <Typography
          variant="subtitle"
          className="text-white text-center mt-6 font-pathBold text-[15px]"
        >
          {isGerman()
            ? "Deine Einlagen werden von sorgfältig ausgewählten Partnern gefertigt und sind bereits ab 149,99 € erhältlich."
            : "Le nostre solette sono prodotte da partner accuratamente selezionati e sono disponibili a partire da soli 149,99 €."}
        </Typography>
      </View>

      <Link asChild href={"/after-scan-upload/second"}>
        <Button variant="big" textClassName="font-pathSemiBold text-[16px] text-white py-1">
          
            {isGerman() ? "Nächste Frage" : "Prossima domanda"}
          
        </Button>
      </Link>
    </Layout>
  );
}
