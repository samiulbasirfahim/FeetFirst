import AntDesign from "@expo/vector-icons/AntDesign";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { useState } from "react";
import { ImageBackground, useWindowDimensions } from "react-native";
import { View } from "react-native";
import { HeaderBackButton } from "@/components/ui/header-back-button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { Portal } from "react-native-portalize";

const topTextDE = [
  "FeetFirst revolutioniert den Schuhkauf: Mit modernster 3D-Scan-Technologie und eigener Software erfassen wir die Form deiner Füße millimetergenau in wenigen Sekunden und liefern darauf basierend die fortschrittlichste KI-gestützte Passform-Empfehlung für Schuhe. So findest du genau die Modelle, die perfekt zu deinen Füßen passen für mehr Komfort, weniger Fußprobleme (über 50% aller Fußprobleme entstehen durch falsches Schuhwerk) und deutlich weniger Rücksendungen im Onlinehandel, der mit über 50% aktuell Spitzenreiter aller Retouren ist",
  "Unser Ziel: Diese Quote drastisch zu senken. Weniger Rücksendungen bedeuten weniger CO, Emissionen, weniger Ressourcenverschwendung und ein nachhaltigeres Einkaufserlebnis.Gleichzeitig profitieren unsere Kundinnen von mehr Komfort und einer spürbar höheren Zufriedenheit.",
  "Auch im stationären Handel verbessern wir das Einkaufserlebnis durch interaktive Lösungen und eine Beratung auf höchstem Niveau etwas, das bei komplexen Produkteigenschaften und zunehmendem Fachkräftemangel nur noch selten zu finden ist. FeetFirst unterstützt bei der Auswahl der passenden Schuhe - intuitiv, effizient und nachhaltig.",
];

const topTextIt = [
  "FeetFirst sta rivoluzionando l'acquisto di scarpe: utilizzando una tecnologia di scansione 3D all'avanguardia e un software proprietario, catturiamo la forma dei tuoi piedi con precisione millimetrica in pochi secondi e, in base a ciò, forniamo la più avanzata raccomandazione di calzata basata sull'intelligenza artificiale. In questo modo, troverai la calzata perfetta per i tuoi piedi, con conseguente maggiore comfort, meno problemi ai piedi (oltre il 50% di tutti i problemi ai piedi è causato da calzature inadeguate) e una significativa riduzione dei resi nel commercio al dettaglio online, che attualmente è leader in termini di resi totali con oltre il 50%.",
  "Il nostro obiettivo: ridurre drasticamente questa percentuale. Meno resi significano meno emissioni di CO2, meno spreco di risorse e un'esperienza di acquisto più sostenibile. Allo stesso tempo, i nostri clienti beneficiano di un maggiore comfort e di livelli di soddisfazione notevolmente più elevati.",
  "Miglioriamo inoltre l'esperienza di acquisto nei negozi fisici attraverso soluzioni interattive e consulenza di alta qualità, qualcosa di raro al giorno d'oggi, date le complesse caratteristiche dei prodotti e la crescente carenza di personale qualificato. FeetFirst supporta i clienti nella scelta delle scarpe giuste, in modo intuitivo, efficiente e sostenibile.",
];

const bottomTitleDe = [
  "KI-Schuhempfehlung basierend auf 3D-Scan",
  "Fortschrittlichste KI-Beratung",
];

const bottomTextDe = [
  "Verknüpft exakte Fußmaße mit Modelldaten, um dein ideales Modell inklusive passender Größe zu bestimmen.",
  "Berücksichtigt alle Schuheigenschaften und-funktionen und filtert anhand gezielter Kategoriefragen dein ideales Modell.",
];

const bottomTitleIt = [
  "Raccomandazione di scarpe AI basata sulla scansione 3D",
  "Consulenza AI più avanzata",
];

const bottomTextIt = [
  "Combina le misure esatte del piede con i dati del modello per determinare il modello ideale, inclusa la taglia giusta.",
  "Prende in considerazione tutte le caratteristiche e le funzioni delle scarpe e filtra il modello ideale in base a domande di categoria mirate.",
];

export default function Screen() {
  const { isGerman } = useLanguageStore();
  const { height, width } = useWindowDimensions();

  const topText = isGerman() ? topTextDE : topTextIt;
  const [top_selected_index, set_top_selected_index] = useState(0);
  const bottomText = isGerman() ? bottomTextDe : bottomTextIt;
  const bottomTitle = isGerman() ? bottomTitleDe : bottomTitleIt;
  const [bottom_selected_index, set_bottom_selected_index] = useState(0);

  const { top } = useSafeAreaInsets();

  return (
    <Layout noPadding scrollable avoidTabbar className="bg-backgroundDark">
      <Portal>
        <View
          style={{
            top: top + 10,
            left: 10,
            position: "absolute",
            zIndex: 20,
            overflow: "hidden",
          }}
          className="flex items-center justify-center rounded-full"
        >
          <BlurView className="flex-1 px-2" tint="light" intensity={30}>
            <HeaderBackButton />
          </BlurView>
        </View>
      </Portal>
      <ImageBackground
        source={require("@/assets/images/sustainability-top.jpg")}
        style={{
          height: height * 0.4,
          width: "100%",
        }}
      >
        <View className="absolute inset-0 bg-backgroundDark/70 items-center justify-center">
          <Typography variant="title" className="text-foreground">
            {isGerman() ? "NACHHALTIGKEIT" : "SUSTAINABILITY"}
          </Typography>
        </View>
      </ImageBackground>
      <View className="p-3 my-4 gap-4 items-center">
        <Typography
          variant="subtitle"
          className="text-foreground text-start leading-1 w-full"
        >
          {topText[top_selected_index]}
        </Typography>
        <View className="mt-4 flex-row items-center">
          <Button
            variant="ghost"
            noWrap
            onPress={() =>
              set_top_selected_index((prev) => {
                if (prev === 0) return topText.length - 1;
                return prev - 1;
              })
            }
          >
            <AntDesign name="left" size={20} color={"white"} />
          </Button>
          <Typography variant="subtitle" className="text-white">
            {top_selected_index + 1} / {topText.length}
          </Typography>

          <Button
            variant="ghost"
            noWrap
            onPress={() =>
              set_top_selected_index((prev) => {
                if (prev === topText.length - 1) return 0;
                return prev + 1;
              })
            }
          >
            <AntDesign name="right" size={20} color={"white"} />
          </Button>
        </View>
      </View>
      <View className="p-3 my-4 gap-4 items-center">
        <ImageBackground
          source={require("@/assets/images/sustainability-bottom.png")}
          width={width}
          style={{
            width: width * 0.95,
            aspectRatio: 1,
          }}
        >
          <View className="absolute inset-0 bg-backgroundDark/70 items-center justify-center">
            <Typography variant="subtitle" className="text-foreground">
              {isGerman()
                ? "FEETFIRST-NACHHALTIG EINKAUFEN."
                : "FEETFIRST - ACQUISTI SOSTENIBILI."}
            </Typography>
          </View>
        </ImageBackground>

        <Typography
          variant="titleSecondary"
          className="text-foreground text-start leading-1 w-full"
        >
          {bottomTitle[bottom_selected_index]}:
        </Typography>
        <Typography
          variant="subtitle"
          className="text-foreground text-start leading-1 w-full"
        >
          {bottomText[bottom_selected_index]}
        </Typography>
        <View className="mt-4 flex-row items-center">
          <Button
            variant="ghost"
            noWrap
            onPress={() =>
              set_bottom_selected_index((prev) => {
                if (prev === 0) return bottomText.length - 1;
                return prev - 1;
              })
            }
          >
            <AntDesign name="left" size={20} color={"white"} />
          </Button>
          <Typography variant="subtitle" className="text-white">
            {bottom_selected_index + 1} / {bottomText.length}
          </Typography>

          <Button
            variant="ghost"
            noWrap
            onPress={() =>
              set_bottom_selected_index((prev) => {
                if (prev === bottomText.length - 1) return 0;
                return prev + 1;
              })
            }
          >
            <AntDesign name="right" size={20} color={"white"} />
          </Button>
        </View>
      </View>
    </Layout>
  );
}
