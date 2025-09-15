import { OnBoardingLayout } from "@/components/layout/onboarding";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { useParamStore } from "@/store/paramStore"; // ✅ import global param store
import { Link, router } from "expo-router";
import { View, TextInput } from "react-native";

export default function Screen() {
  const { isGerman } = useLanguageStore();
  const { getParam } = useParamStore();

  const handleFinish = () => {
    const cameFromScanUpload = getParam("came_from_scan_upload") === "true";

    if (cameFromScanUpload) {
      router.push("/(scan-upload)/after-scan-upload/fourth");
    } else {
      router.dismissAll();
      router.back();
    }
  };

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
          <Typography variant="onboarding-header" className="text-white font-pathSemiBold text-[20px] mb-3">
            {isGerman()
              ? "Glückwunsch, Sie Haben Ihre Einlage Erfolgreich Konfiguriert!"
              : "Congratulazioni, hai configurato correttamente il tuo deposito!"}
          </Typography>

          <Typography variant="subtitle" className="text-white font-pathRegular text-[14px]">
            {isGerman()
              ? "Stellen Sie Jetzt Sicher, Dass Sie Perfekt In Ihre Schuhe Passt, Indem Sie Ihr Modell Angeben Oder Mit Dem FeetFirst-System Nach Ihrem Schuh Suchen."
              : "Assicurati subito che si adatti perfettamente alle tue scarpe specificando il tuo modello o cercando la tua scarpa tramite il sistema FeetFirst."}
          </Typography>

          <View className="mt-8 flex-row items-center gap-2">
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
        <Button variant="big" onPress={handleFinish} textClassName="text-white font-pathSemiBold text-[16px] py-1">
          {isGerman()
            ? "Abschliessen und Einlage in den Warenkorb legen"
            : "Completa e aggiungi il deposito al carrello"}
        </Button>
      }
    />
  );
}
