const optionsDE: string[] = [
  "Leistungssteigerung im Training oder Wettkampf",
  "Unterstützung bei Beschwerden (z. B. Knie, Fuß oder Druckstellen)",
  "Mehr Stabilität und Komfort",
  "Verletzungen und Schmerzen vorbeuge",
];

const optionsIT: string[] = [
  "Aumento delle prestazioni in allenamento o in gara",
  "Supporto per disturbi (ad esempio ginocchia, piedi o punti di pressione)",
  "Più stabilità e comfort",
  "Prevenire lesioni e dolor",
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
            ? "Welche Ziele Verfolgst Du Mit Deinen Winsole-Einlagen?"
            : "Quali sono i tuoi obiettivi con le solette Winsole?"}
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
          <Link asChild href={"/winsole-questions/after-loading/seventh"}>
            <Button variant="big">
              {isGerman() ? "Nächste Frage" : "Prossima domanda"}
            </Button>
          </Link>

          <Link asChild href={"/winsole-questions/after-loading/seventh"}>
            <Button variant="ghost">
              {isGerman() ? "Überspringen" : "Saltare"}
            </Button>
          </Link>
        </>
      }
    />
  );
}
