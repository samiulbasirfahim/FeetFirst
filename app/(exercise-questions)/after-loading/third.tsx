const optionsDE: string[] = [
  "Wenig aktiv (viel sitzen)",
  "Mäßig aktiv (Spazieren, Alltagsbewegung)",
  "Sehr aktiv (Sport, körperliche Arbeit, viel Stehen)",
];

const optionsIT: string[] = [
  "Non molto attivo (stare seduto molto)",
  "Moderatamente attivo (camminare, esercizio quotidiano)",
  "Molto attivo (sport, lavoro fisico, molto in piedi)",
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
        <Typography variant="onboarding-header" className="text-foreground">
          {isGerman()
            ? "Wie Aktiv Sind Sie Im Alltag Oder Beruf?"
            : "Quanto sei attivo nella vita quotidiana o al lavoro?"}
        </Typography>
      }
      options={list}
      multiple={false}
      showOtherInput={false}
      onSelectionChange={(selection: string[]) => {
        console.log("Selected:", selection);
      }}
      otherPlaceholder={isGerman() ? "Bitte angeben..." : "Specifica qui..."}
      otherButtonText={
        isGerman() ? "Sonstiges (bitte angeben)" : "Altro (specificare)"
      }
      FooterComponent={
        <>
          <Link asChild href={"/(exercise-questions)/after-loading/fourth"}>
            <Button variant="big">
              {isGerman() ? "Nächste Frage" : "Prossima domanda"}
            </Button>
          </Link>

          <Link asChild href={"/(exercise-questions)/after-loading/fourth"}>
            <Button variant="ghost">
              {isGerman() ? "Überspringen" : "Saltare"}
            </Button>
          </Link>
        </>
      }
    />
  );
}
