const optionsIT: string[] = [
  "Salute generale del piede",
  "Corsa",
  "Ciclismo",
  "Sport Invernali",
  "Calcio",
  "Lifestyle",
  "Golf",
  "Fitness / Yoga",
  "Escursionismo",
];

const optionsDE: string[] = [
  "Allgemeine Fußgesundheit",
  "Laufsport",
  "Radsport",
  "Bergsport",
  "Wintersport",
  "Fußball",
  "Lifestyle",
  "Golf",
  "Fitness / Yoga",
];

import { OnBoardingLayout } from "@/components/layout/onboarding";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import useOnboardingQuestionStore from "@/store/onboarding-questions";
import { Link } from "expo-router";

export default function Screen() {
  const { isGerman } = useLanguageStore();
  const { setOnboardingQuestion } = useOnboardingQuestionStore();
  const list = isGerman() ? optionsDE : optionsIT;
  return (
    <OnBoardingLayout
      HeaderComponent={
        <Typography
          variant="onboarding-header"
          className="text-white font-pathSemiBold text-[20px]"
        >
          {isGerman()
            ? "Wofür interessieren Sie sich besonders?"
            : "A cosa sei particolarmente interessato/a?"}
        </Typography>
      }
      options={list}
      multiple={true}
      showOtherInput={true}
      onSelectionChange={(selection: string[]) => {
        setOnboardingQuestion("interests", selection);
      }}
      FooterComponent={
        <Link asChild href={"/on-boarding/gender"}>
          <Button
            variant="big"
            textClassName="text-white font-pathSemiBold text-[16px] py-1"
          >
            {isGerman() ? "nächste" : "prossima"}
          </Button>
        </Link>
      }
    />
  );
}
