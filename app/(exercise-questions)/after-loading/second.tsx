const optionsDE: string[] = [
  "Schmerzen lindem",
  "Kraft aufbauen",
  "Beweglichkeit steigern",
  "Beschwerden vorbeugen",
  "Leistung im Sport verbesser",
];

const optionsIT: string[] = [
  "alleviare il dolore",
  "Costruisci forza",
  "Aumentare la mobilità",
  "Prevenire i reclami",
  "Migliorare le prestazioni nello spor",
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
            ? "Was möchten Sie mit den Übungen erreichen?"
            : "Wie Aktiv Sind Sie Im Alltag Oder Beruf?"}
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
          <Link asChild href={"/(exercise-questions)/after-loading/third"}>
            <Button variant="big">
              {isGerman() ? "Nächste Frage" : "Prossima domanda"}
            </Button>
          </Link>

          <Link asChild href={"/(exercise-questions)/after-loading/third"}>
            <Button variant="ghost">
              {isGerman() ? "Überspringen" : "Saltare"}
            </Button>
          </Link>
        </>
      }
    />
  );
}
