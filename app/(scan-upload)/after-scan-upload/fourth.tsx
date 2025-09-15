const optionsDE: string[] = [
  "Sportlich aktiv (regelmäßiges Training oder sportliche Aktivitäten)",
  "Mäßig aktiv (leichte körperliche Aktivität oder Gehen)",
  "Wenig aktiv (hauptsächlich sitzende Tätigkeit)",
  "Sehr wenig aktiv",
];

const optionsIT: string[] = [
  "Attivo nello sport (allenamento regolare o attività sportive)",
  "Moderatamente attivo (attività fisica leggera o camminata)",
  "Non molto attivo (principalmente sedentario)",
  "Molto poco attivo",
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
        <Typography variant="onboarding-header" className="text-white font-pathSemiBold text-[20px]">
          {isGerman()
            ? "Welches Aktivitätslevel treffen am besten auf Sie zu?"
            : "Quale livello di attività è più adatto a te?"}
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
          <Link asChild href={"/(scan-upload)/after-scan-upload/fifth"}>
            <Button variant="big" textClassName="text-white font-pathSemiBold text-[16px] py-1">
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
