import { OnBoardingLayout } from "@/components/layout/onboarding";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";
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
          <Typography variant="title" className="text-foreground">
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
            <TextInput className="flex-1 border-b-2 pb-1 -translate-y-1/4 border-dotted border-foreground"></TextInput>
          </View>
        </>
      }
      FooterComponent={
        <Link href={"/others/winsole"} asChild>
          <Button variant="big">
            {isGerman()
              ? "Abschliessen und Einlage in den Warenkorb legen"
              : "Completa e aggiungi il deposito al carrello"}
          </Button>
        </Link>
      }
    />
    // <Layout avoidKeyboard scrollable>
    //   <View className="flex-1">
    //     <Typography variant="title" className="text-foreground">
    //       {isGerman()
    //         ? "Glückwunsch, Sie Haben Ihre Einlage Erfolgreich Konfiguriert!"
    //         : "Congratulazioni, hai configurato correttamente il tuo deposito!"}
    //     </Typography>
    //
    //     <Typography variant="subtitle" className="text-foreground">
    //       {isGerman()
    //         ? "Stellen Sie Jetzt Sicher, Dass Sie Perfekt In Ihre Schuhe Passt, Indem Sie Ihr Modell Angeben Oder Mit Dem FeetFirst-System Nach Ihrem Schuh Suchen."
    //         : "Assicurati subito che si adatti perfettamente alle tue scarpe specificando il tuo modello o cercando la tua scarpa tramite il sistema FeetFirst."}
    //     </Typography>
    //
    //     <View className={"mt-12 flex-row items-center gap-2"}>
    //       <Typography className="text-foreground" variant="subtitle">
    //         {isGerman() ? "Modell angeben" : "Specificare il modello"}
    //       </Typography>
    //       <TextInput className="flex-1 border-b-2 pb-1 -translate-y-1/4 border-dotted border-foreground"></TextInput>
    //     </View>
    //     <View>
    //       <Button>{isGerman() ? "Modell suchen" : "Käufe durchsuchen"}</Button>
    //     </View>
    //   </View>
    //
    // </Layout>
  );
}
