const optionsDE: string[] = [
  "Nein",
  "Ja, Rückenschmerzen",
  "Ja, Hüftprobleme",
  "Ja, Gelenkschmerzen",
  "Ja, Wadenprobleme",
  "Ja, Achilessehnenprobleme",
];

const optionsIT: string[] = [
  "NO",
  "Sì, mal di schiena",
  "E, Hyftprobleme",
  "Sì, dolori articolari",
  "Sì, problemi al polpaccio",
  "Sì, problemi al tendine d'Achille",
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
            ? "Haben Sie aktuell Beschwerden oder Schmerzen an den Füßen?"
            : "Attualmente avverti fastidio o dolore ai piedi?"}
        </Typography>
      }
      options={list}
      multiple={false}
      showOtherInput={true}
      onSelectionChange={(selection: string[]) => {
        console.log("Selected:", selection);
      }}
      otherPlaceholder={isGerman() ? "Bitte angeben..." : "Specifica qui..."}
      otherButtonText={
        isGerman() ? "Sonstiges (bitte angeben)" : "Altro (specificare)"
      }
      FooterComponent={
        <>
          <Link asChild href={"/(exercise-questions)/after-loading/sixth"}>
            <Button variant="big">
              {isGerman() ? "Nächste Frage" : "Prossima domanda"}
            </Button>
          </Link>

          <Link asChild href={"/(exercise-questions)/after-loading/sixth"}>
            <Button variant="ghost">
              {isGerman() ? "Überspringen" : "Saltare"}
            </Button>
          </Link>
        </>
      }
    />
  );
}
