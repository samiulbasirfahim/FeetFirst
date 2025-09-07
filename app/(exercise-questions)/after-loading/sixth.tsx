const optionsDE: string[] = [
  "Ja, ich merke instabilität",
  "Teilweise / nur in bestimmten Situationen",
  "Nein, mein Gleichgewicht ist gu",
];

const optionsIT: string[] = [
  "Sì, noto instabilità",
  "Parzialmente / solo in determinate situazioni",
  "No, il mio equilibrio è buon",
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
        <Typography variant="title" className="text-foreground text-xl">
          {isGerman()
            ? "Fühlen Sie sich in Ihrem Gleichgewicht manchmal unsicher - z. B. beim Stehen auf einem Bein oder beim schnellen Richtungswechsel?"
            : "Ti capita a volte di avere un equilibrio instabile, ad esempio quando stai in piedi su una gamba o quando cambi direzione rapidamente?"}
        </Typography>
      }
      options={list}
      multiple={false}
      showOtherInput={false}
      onSelectionChange={(selection: string[]) => {
        console.log("Selected:", selection);
      }}
      otherPlaceholder={isGerman() ? "Bitte angeben..." : "Specifica qui..."}
      otherButtonText={
        isGerman() ? "Sonstiges (bitte angeben)" : "Altro (specificare)"
      }
      FooterComponent={
        <>
          <Link asChild href={"/(protected)/home/foot-exercise"}>
            <Button variant="big">
              {isGerman()
                ? "Abschliessen und in den Warenkorb legen"
                : "Completa e aggiungi al carrello"}
            </Button>
          </Link>

          <Link asChild href={"/(protected)/home/foot-exercise"}>
            <Button variant="ghost">
              {isGerman() ? "Überspringen" : "Saltare"}
            </Button>
          </Link>
        </>
      }
    />
  );
}
