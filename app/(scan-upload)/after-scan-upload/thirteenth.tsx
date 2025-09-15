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
        <Typography variant="onboarding-header" className="text-white font-pathSemiBold text-[20px]">
          {isGerman()
            ? "Sonstige Anliegen Oder Fragen Zur Fußgesundheit:"
            : "Altre preoccupazioni o domande sulla salute dei piedi:"}
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
          <Link asChild href={"/(scan-upload)/after-scan-upload/fourteenth"}>
            <Button variant="big" textClassName="text-white font-pathSemiBold text-[16px] py-1">
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
