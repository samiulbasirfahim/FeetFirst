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
        <Typography variant="onboarding-header" className="text-foreground text-center">
          {isGerman()
            ? "Willkommen bei Ihrem persönlichen Übungsplan für gesunde Füße!"
            : "Benvenuti al vostro programma di esercizi personalizzato per piedi sani!"}
        </Typography>

        <Typography variant="subtitle" className="text-foreground text-center">
          {isGerman()
            ? "Gezielte Fußübungen können Ihre Beschwerden lindern, die Muskulatur stärken, Ihr Gleichgewicht verbessern und Ihre Mobilität und Fussgesundheit nachhaltig fördern."
            : "Esercizi mirati per i piedi possono alleviare il disagio, rafforzare i muscoli, migliorare l'equilibrio e promuovere in modo duraturo la mobilità e la salute dei piedi."}
        </Typography>
        <Typography
          variant="subtitle"
          className="text-foreground text-center mt-6"
        >
          {isGerman()
            ? "Ihr Trainingsplan wird individuell auf Sie abgestimmt - basierend auf Ihren Zielen, Bedürfnissen und möglichen Fußproblemen."
            : "Il tuo programma di allenamento sarà personalizzato in base ai tuoi obiettivi, alle tue esigenze e ai tuoi possibili problemi ai piedi."}
        </Typography>
      </View>

      <Link asChild href={"/(exercise-questions)/after-loading/second"}>
        <Button variant="big">
          {isGerman()
            ? "Fortfahren und mit deinen gezielten, persönlichen Fragen starten"
            : "Continua e inizia con le tue domande mirate e personali"}
        </Button>
      </Link>
    </Layout>
  );
}
