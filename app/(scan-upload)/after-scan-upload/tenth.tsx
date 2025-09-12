const optionsDE: string[] = [
  "Besserer Komfort",
  "Unterstützung bei Fußproblemen (z.B. Plantarfasziitis, Hallux valgus)",
  "Bessere Performance beim Sport",
  "Vorbeugung von Fußschmerzen/Fußproblemen und Verletzunge",
];

const optionsIT: string[] = [
  "Migliore comfort",
  "Supporto per problemi ai piedi (ad esempio fascite plantare, alluce valgo)",
  "Migliori prestazioni nello sport",
  "Prevenzione del dolore/problemi e lesioni ai piedi",
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
            ? "Welche Erwartungen Oder Ziele Haben Sie Mit Den Einlagen?"
            : "Quali sono le tue aspettative o i tuoi obiettivi riguardo alle solette?"}
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
          <Link asChild href={"/(scan-upload)/after-scan-upload/eleventh"}>
            <Button variant="big">
              {isGerman() ? "Nächste Frage" : "Prossima domanda"}
            </Button>
          </Link>

          <Link asChild href={"/(scan-upload)/after-scan-upload/eleventh"}>
            <Button variant="ghost">
              {isGerman() ? "Überspringen" : "Saltare"}
            </Button>
          </Link>
        </>
      }
    />
  );
}
