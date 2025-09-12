import { OnBoardingLayout } from "@/components/layout/onboarding";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";

export default function Screen() {
  const { isGerman } = useLanguageStore();
  return (
    <OnBoardingLayout
      HeaderComponent={
        <Typography variant="title" className="text-foreground">
          {isGerman()
            ? "Sonstige Anliegen Oder Fragen Zur Fußgesundheit:"
            : "Altre preoccupazioni o domande sulla salute dei piedi:"}
        </Typography>
      }
      options={isGerman() ? ["[Freitextfeld]"] : ["[Testo libero]"]}
      multiple={false}
      showOtherInput={false}
      onSelectionChange={(selection: string[]) => {
        console.log("Selected:", selection);
      }}
      FooterComponent={
        <>
          <Link asChild href={"/(scan-upload)/after-scan-upload/fourteenth"}>
            <Button variant="big">
              {isGerman() ? "Nächste Frage" : "Prossima domanda"}
            </Button>
          </Link>

          <Link asChild href={"/(scan-upload)/after-scan-upload/fourteenth"}>
            <Button variant="ghost">
              {isGerman() ? "Überspringen" : "Saltare"}
            </Button>
          </Link>
        </>
      }
    />
  );
}
