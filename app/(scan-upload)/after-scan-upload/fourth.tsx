const optionsDE: string[] = [
  "Sportschuhe",
  "Laufschuhe",
  "Skischuhe",
  "Tennisschuhe",
  "Fußballschuhe",
  "Basketballschuhe",
];

const optionsIT: string[] = [
  "Scarpe sportive",
  "Scarpe da corsa",
  "Scarponi da sci",
  "Scarpe da tennis",
  "Scarpe da calcio",
  "Scarpe da basket",
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
          {isGerman() ? "Für Welchen Einsatz?" : "Per quale utilizzo?"}
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
          <Link asChild href={"/(scan-upload)/after-scan-upload/fifth"}>
            <Button variant="big">
              {isGerman() ? "Nächste Frage" : "Prossima domanda"}
            </Button>
          </Link>

          <Link asChild href={"/(scan-upload)/after-scan-upload/fifth"}>
            <Button variant="ghost">
              {isGerman() ? "Überspringen" : "Saltare"}
            </Button>
          </Link>
        </>
      }
    />
  );
}
