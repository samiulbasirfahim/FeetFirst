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
import { Link } from "expo-router";

export default function Screen() {
  const { isGerman } = useLanguageStore();
  const list = isGerman() ? optionsDE : optionsIT;
  return (
    <OnBoardingLayout
      HeaderComponent={
        <Typography variant="onboarding-header">
          {isGerman()
            ? "Wofür interessieren Sie sich besonders?"
            : "A cosa sei particolarmente interessato/a?"}
        </Typography>
      }
      options={list}
      multiple={true}
      showOtherInput={true}
      onSelectionChange={(selection: string[]) => {
        console.log("Selected:", selection);
      }}
      FooterComponent={
        <Link asChild href={"/on-boarding/gender"}>
          <Button variant="big">{isGerman() ? "nächste" : "prossima"}</Button>
        </Link>
      }
    />
  );
}
