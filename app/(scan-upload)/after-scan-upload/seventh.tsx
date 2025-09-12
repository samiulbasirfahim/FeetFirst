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
    <Layout scrollable>
      <View style={{ flex: 1, paddingBottom: 24 }}>
        <Typography variant="onboarding-header" className="text-foreground">
          {isGerman()
            ? "Haben Sie Schmerzen? Wenn ja, bitte markieren Sie die betroffenen Bereiche auf dem 2D-Modell"
            : "Avverti dolore? In tal caso, contrassegna le aree interessate sul modello 2D."}
        </Typography>
      </View>

      <View className="mb-20 -mx-3">
        <TwoDPreview />
      </View>

      <View className="mb-20">
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
      </View>
    </Layout>
  );
}
