import { OnBoardingLayout } from "@/components/layout/onboarding";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { useParamStore } from "@/store/paramStore";
import { Link } from "expo-router";
import { useState } from "react";

export default function Screen() {
  const { isGerman } = useLanguageStore();
  const { setParam } = useParamStore();

  const optionsDE: string[] = [
    "Freizeit / Alltag 149,99€",
    "Sport-169,99€",
    "Arbeit/Arbeitsschuhe-169,99€",
    "Business/Formal-149,99€",
    "Andere (bitte angeben)-169,99€",
    "Winsole-Einlage (Radschuheinlage für Leistungssteigerung. - 199,99€)",
  ];

  const optionsIT: string[] = [
    "Tempo libero / Tutti i giorni 149,99€",
    "Sport - 169,99 €",
    "Scarpe da lavoro/da lavoro - 169,99€",
    "Business/Formale - 149,99 €",
    "Altro (specificare) - 169,99€",
    "Soletta Winsole (soletta per scarpe da ciclismo per migliorare le prestazioni. - € 199,99)",
  ];

  const list = isGerman() ? optionsDE : optionsIT;
  const [picked, setPicked] = useState<string | null>(null);

  const winsolePicked = picked === list[list.length - 1];
  const sportPicked = picked === list[1];
  const freizeitPicked = picked === list[0];

  const getNextPath = () => {
    if (winsolePicked) return "/winsole-questions/while-loading";
    if (sportPicked || freizeitPicked)
      return "/(scan-upload)/after-scan-upload/third";
    return "/(scan-upload)/after-scan-upload/fourth";
  };

  const getNextParams = () => {
    if (sportPicked) return { picked: "sports" };
    if (freizeitPicked) return { picked: "freizeit" };
    return { picked: picked };
  };

  const handleBeforeNavigate = () => {
    if (winsolePicked) {
      setParam("came_from_scan_upload", "true"); // ✅ set globally
    }
  };

  return (
    <OnBoardingLayout
      HeaderComponent={
        <Typography variant="onboarding-header" className="text-white font-pathSemiBold text-[20px]">
          {isGerman()
            ? "Für Welchen Zweck Verwenden Sie Die Einlage?"
            : "Per quale scopo utilizzi l'inserto?"}
        </Typography>
      }
      options={list}
      multiple={false}
      showOtherInput={false}
      onSelectionChange={(selection: string[]) => {
        setPicked(selection[0]);
      }}
      FooterComponent={
        <>
          <Link
            asChild
            href={{ pathname: getNextPath(), params: getNextParams() }}
          >
            <Button
              variant="big"
              textClassName="font-pathSemiBold text-[16px] py-1"
              onPress={handleBeforeNavigate} // ✅ store before navigating
            >
              {isGerman() ? "Nächste Frage" : "Prossima domanda"}
            </Button>
          </Link>

          <Link
            asChild
            href={{
              pathname: "/(scan-upload)/after-scan-upload/fourth",
              params: { prev_picked: null },
            }}
          >
            <Button variant="ghost">
              {isGerman() ? "Überspringen" : "Saltare"}
            </Button>
          </Link>
        </>
      }
    />
  );
}
