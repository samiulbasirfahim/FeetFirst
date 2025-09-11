const optionsIT: string[] = [
  "Attraverso i social media (Instagram, Facebook, ecc.)",
  "In un negozio partner",
  "Durante uno scan event",
  "Passaparola (consiglio di un amico o conoscente)",
];

const optionsDE: string[] = [
  "Über soziale Medien (Instagram, Facebook usw.)",
  "In einem Partnergeschäft",
  "Bei einem Scan-Event",
  "Mundpropaganda (Empfehlung eines Freundes oder Bekannten)",
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
            ? "Wie haben Sie FeetF1rst entdeckt?"
            : "Come ha scoperto FeetF1rst?"}
        </Typography>
      }
      options={list}
      multiple={true}
      showOtherInput={true}
      onSelectionChange={(selection: string[]) => {
        console.log("Selected:", selection);
      }}
      FooterComponent={
        <Link asChild href={"/on-boarding/interests-question"}>
          <Button variant="big">{isGerman() ? "nächste" : "prossima"}</Button>
        </Link>
      }
    />
  );
}
