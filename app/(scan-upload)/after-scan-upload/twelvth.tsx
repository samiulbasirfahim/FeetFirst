const optionsDE: string[] = [
  "Laufgut Ziegler (Heilbronn, Deutschland)",
  "Putzer Orthopädie (Bozen, Italien)",
  "Wallenborn Sportorthopädie (Köln, Deutschland)",
];

const optionsIT: string[] = [
  "Laufgut Ziegler (Heilbronn, Germania)",
  "Putzer Orthopaedics (Bolzano, Italia)",
  "Wallenborn Sports Orthopedics (Colonia, Germania)",
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
            ? "Wählen Sie Bitte Einen Unserer Exklusiven Partner Aus, Der Ihre Maßeinlage Für Sie Anfertigen Soll."
            : "Seleziona uno dei nostri partner esclusivi per realizzare la soletta personalizzata per te."}
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
          <Link asChild href={"/(scan-upload)/after-scan-upload/thirteenth"}>
            <Button variant="big">
              {isGerman() ? "Nächste Frage" : "Prossima domanda"}
            </Button>
          </Link>

          <Link asChild href={"/(scan-upload)/after-scan-upload/thirteenth"}>
            <Button variant="ghost">
              {isGerman() ? "Überspringen" : "Saltare"}
            </Button>
          </Link>
        </>
      }
    />
  );
}
