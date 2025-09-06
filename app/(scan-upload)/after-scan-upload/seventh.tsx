import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";
import {
  View,
} from "react-native";
export default function Screen() {
  const { isGerman } = useLanguageStore();


  return (
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
  );
}
