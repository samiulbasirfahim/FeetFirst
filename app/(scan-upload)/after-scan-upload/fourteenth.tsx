import { OnBoardingLayout } from "@/components/layout/onboarding";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { router } from "expo-router";
import { View } from "react-native";
import { TextInput } from "react-native";

export default function Screen() {
  const { isGerman } = useLanguageStore();
  return (
    <OnBoardingLayout
      multiple={false}
      onSelectionChange={(selected) => {
        console.log(selected);
      }}
      options={
        isGerman()
          ? ["Modell suchen", "Käufe durchsuchen"]
          : ["Cerca modello", "Sfoglia gli acquisti"]
      }
      HeaderComponent={
        <>
          <Typography variant="onboarding-header" className="text-foreground">
            {isGerman()
              ? "Glückwunsch, Sie Haben Ihre Einlage Erfolgreich Konfiguriert!"
              : "Congratulazioni, hai configurato correttamente il tuo deposito!"}
          </Typography>

          <Typography variant="subtitle" className="text-foreground">
            {isGerman()
              ? "Stellen Sie Jetzt Sicher, Dass Sie Perfekt In Ihre Schuhe Passt, Indem Sie Ihr Modell Angeben Oder Mit Dem FeetFirst-System Nach Ihrem Schuh Suchen."
              : "Assicurati subito che si adatti perfettamente alle tue scarpe specificando il tuo modello o cercando la tua scarpa tramite il sistema FeetFirst."}
          </Typography>

          <View className={"mt-12 flex-row items-center gap-2"}>
            <Typography className="text-foreground" variant="subtitle">
              {isGerman() ? "Modell angeben" : "Specificare il modello"}
            </Typography>
            <View className="flex-1 border-foreground border-solid border-b-2">
            <TextInput className="flex-1 py-2 border-dotted border-foreground text-foreground" />
            </View>
          </View>
        </>
      }
      FooterComponent={
        <Button
          variant="big"
          onPress={() => {
            router.replace("/(protected)/home/mass-insoles")
            
          }}
        >
          {isGerman()
            ? "Abschliessen und Einlage in den Warenkorb legen"
            : "Completa e aggiungi il deposito al carrello"}
        </Button>
      }
    />
  );
}
