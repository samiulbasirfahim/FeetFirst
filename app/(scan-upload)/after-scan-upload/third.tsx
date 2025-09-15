import { OnBoardingLayout } from "@/components/layout/onboarding";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link,  useLocalSearchParams } from "expo-router";
import {  View } from "react-native";

function FirstScreen() {
  const { isGerman } = useLanguageStore();

  const optionsDE: string[] = [
    "Sneaker",
    "Halbschuhe",
    "Stiefeletten",
    "Hausschuhe",
  ];
  const optionsIT: string[] = [
    "Sneaker",
    "Scarpe basse",
    "Stivaletti",
    "Pantofole",
  ];
  const list = isGerman() ? optionsDE : optionsIT;

  return (
    <OnBoardingLayout
      HeaderComponent={
        <Typography variant="onboarding-header" className="text-white font-pathSemiBold text-[20px]">
          {isGerman() ? "Für Welchen Einsatz?" : "Per quale utilizzo?"}
        </Typography>
      }
      options={list}
      multiple={false}
      showOtherInput={true}
      onSelectionChange={(selection: string[]) => {
        console.log("Selected:", selection);
      }}
      otherPlaceholder={isGerman() ? "Bitte angeben..." : "Specifica qui..."}
      otherButtonText={
        isGerman() ? "Sonstiges (bitte angeben)" : "Altro (specificare)"
      }
      FooterComponent={
        <>
          <Link asChild href={"/(scan-upload)/after-scan-upload/fourth"}>
            <Button variant="big">
              {isGerman() ? "Nächste Frage" : "Prossima domanda"}
            </Button>
          </Link>
          <Link asChild href={"/(scan-upload)/after-scan-upload/fourth"}>
            <Button variant="ghost">
              {isGerman() ? "Überspringen" : "Saltare"}
            </Button>
          </Link>
        </>
      }
    />
  );
}

function SecondScreen() {
  const { isGerman } = useLanguageStore();

  const optionsDE: string[] = [
    "Sportschuhe",
    "Laufschuhe",
    "Skischuhe",
    "Tennisschuhe",
    "Fußballschuhe",
    "Basketballschuhe",
  ];
  const optionsIT: string[] = [
    "Scarpe sportive",
    "Scarpe da corsa",
    "Scarponi da sci",
    "Scarpe da tennis",
    "Scarpe da calcio",
    "Scarpe da basket",
  ];
  const list = isGerman() ? optionsDE : optionsIT;

  return (
    <OnBoardingLayout
      HeaderComponent={
        <Typography variant="onboarding-header" className="text-foreground">
          {isGerman() ? "Für Welchen Einsatz?" : "Per quale utilizzo?"}
        </Typography>
      }
      options={list}
      multiple={false}
      showOtherInput={true}
      onSelectionChange={(selection: string[]) => {
        console.log("Selected:", selection);
      }}
      otherPlaceholder={isGerman() ? "Bitte angeben..." : "Specifica qui..."}
      otherButtonText={
        isGerman() ? "Sonstiges (bitte angeben)" : "Altro (specificare)"
      }
      FooterComponent={
        <>
          <Link asChild href={"/(scan-upload)/after-scan-upload/fourth"}>
            <Button variant="big" textClassName="text-white font-pathSemiBold text-[16px] py-1">
              {isGerman() ? "Nächste Frage" : "Prossima domanda"}
            </Button>
          </Link>
          <Link asChild href={"/(scan-upload)/after-scan-upload/fourth"}>
            <Button variant="ghost">
              {isGerman() ? "Überspringen" : "Saltare"}
            </Button>
          </Link>
        </>
      }
    />
  );
}

export default function Screen() {
  const { picked } = useLocalSearchParams();
  if (!picked) return <View className="bg-background flex-1"></View>;

  if (picked === "freizeit") return <FirstScreen />;
  if (picked === "sports") return <SecondScreen />;
  return <View className="bg-background flex-1"></View>;
}
