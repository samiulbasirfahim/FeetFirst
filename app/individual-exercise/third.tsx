const optionsDE: string[] = [
  "Freizeit / Alltag 149,99€",
  "Sport-169,99€",
  "Arbeit/Arbeitsschuhe-169,99€",
  "Business/Formal-149,99€",
  "Andere (bitte angeben)-169,99€",
  "Winsole-Einlage (Radschuheinlage für Leistungssteigerung. - 199,99€)",
];

const optionsIT: string[] = [
  "Tempo libero / Tutti i giorni 149,99€",
  "Sport - 169,99 €",
  "Scarpe da lavoro/da lavoro - 169,99€",
  "Business/Formale - 149,99 €",
  "Altro (specificare) - 169,99€",
  "Soletta Winsole (soletta per scarpe da ciclismo per migliorare le prestazioni. - € 199,99)",
];

import { OnBoardingLayout } from "@/components/layout/onboarding";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";

export default function Screen() {
  const { isGerman } = useLanguageStore();
  const list = isGerman() ? optionsDE : optionsIT;
  return (
    <OnBoardingLayout
      HeaderComponent={
        <Typography variant="title" className="text-foreground">
          {isGerman()
            ? "Für Welchen Zweck Verwenden Sie Die Einlage?"
            : "Per quale scopo utilizzi l'inserto?"}
        </Typography>
      }
      options={list}
      multiple={false}
      showOtherInput={false}
      onSelectionChange={(selection: string[]) => {
        console.log("Selected:", selection);
      }}
      FooterComponent={
        <>
          <Link asChild href={"/(scan-upload)/after-scan-upload/fourth"}>
            <Button variant="big">
              {isGerman() ? "Nächste Frage" : "Prossima domanda"}
            </Button>
          </Link>

          <Link asChild href={"/(scan-upload)/after-scan-upload/fourth"}>
            <Button variant="ghost">
              {isGerman() ? "Überspringen" : "Saltare"}
            </Button>
          </Link>
        </>
      }
    />
  );
}
