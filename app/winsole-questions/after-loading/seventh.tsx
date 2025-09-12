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
            ? "Hast du weitere Anliegen oder Fragen zu deiner Fußgesundheit oder zu deiner Winsole-Einlage?"
            : "Hai altre preoccupazioni o domande sulla salute dei tuoi piedi o sulla soletta Winsole?"}
        </Typography>
      }
      options={[]}
      multiple={false}
      showOtherInput={true}
      otherPlaceholder={isGerman() ? "Freitextfeld" : "Testo libero"}
      onSelectionChange={(selection: string[]) => {
        console.log("Selected:", selection);
      }}
      FooterComponent={
        <>
          <Link asChild href={"/winsole-questions/after-loading/eight"}>
            <Button variant="big">
              {isGerman() ? "Nächste Frage" : "Prossima domanda"}
            </Button>
          </Link>

          <Link asChild href={"/winsole-questions/after-loading/eight"}>
            <Button variant="ghost">
              {isGerman() ? "Überspringen" : "Saltare"}
            </Button>
          </Link>
        </>
      }
    />
  );
}
