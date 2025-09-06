import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Image, Text, useWindowDimensions, View } from "react-native";
import woman from "@/assets/images/woman-upside-down.png";
import { Button } from "@/components/ui/button";
import MyCarousel from "@/components/ui/MyCarousel";
import { VersionInfo } from "@/components/common/version";
import ManAboutTORun from "@/assets/images/man-about-to-run.png";
import { LinearGradient } from "expo-linear-gradient";
import { useHeaderHeight } from "@react-navigation/elements";
import { useState } from "react";
import { useDrawerHeader } from "@/components/common/drawer-header";

export default function Screen() {
  const { height: heightOfWindow } = useWindowDimensions();
  const { isGerman } = useLanguageStore();
  const [womanDiv, setWomanDiv] = useState(0);

  const { onScroll, HeaderComponent, height } = useDrawerHeader({
    threeshold: 100,
  });
  return (
    <Layout
      scrollable
      className="bg-backgroundDark"
      onScroll={onScroll}
      stickyIndex={[0]}
      noPadding
      avoidTabbar
    >
      {HeaderComponent}
      <View className="relative  relative overflow-hidden">
        <Typography className="absolute z-[99] text-3xl font-bold text-white text-center my-4 leading-tight px-3">
          {isGerman()
            ? "Übungen zur Flexibilitätserhöhung"
            : "Esercizi per aumentare la flessibilità"}
        </Typography>
        <View
          className="w-full"
          style={{
            height: heightOfWindow * 0.5,
          }}
          onLayout={(e) => {
            setWomanDiv(e.nativeEvent.layout.width);
          }}
        >
          <LinearGradient
            colors={["rgba(13,13,13,0.5)", "rgba(13,13,13,1)"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="absolute inset-0 z-[10]"
          />

          <LinearGradient
            colors={["transparent", "rgba(98, 160, 123, 0.3)"]}
            className="absolute inset-0 z-[10]"
          />

          <View className="h-full flex-1 overflow-hidden relative bg-primary items-center justify-end">
            <Image
              source={woman}
              style={{
                height: womanDiv * 1.5,
                width: "100%",
              }}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <View className="mt-12 px-3">
        <Typography className="font-bold text-3xl ">
          {isGerman()
            ? "FeetFirst - Ihr Partner für Fußgesundheit, bietet jetzt die perfekten Fußübungen."
            : "FeetFirst, il tuo partner per la salute dei piedi, ora ti offre gli esercizi perfetti per i piedi."}
        </Typography>
        <Text className="text-white mt-4">
          {isGerman()
            ? "Wählen Sie einfach aus, was Sie erreichen. möchten, sehen Sie sich die Anleitung an und legen Sie los!"
            : "Scegli semplicemente cosa vuoi ottenere. vuoi, dai un'occhiata alle istruzioni e inizia!"}
        </Text>
      </View>

      <View className="mt-8">
        <Typography className="text-3xl font-bold mb-4 px-3">
          {isGerman() ? "Produkte" : "Prodotti"}
        </Typography>

        <MyCarousel />
      </View>
      <View className="pt-8 px-3">
        <Typography className="text-3xl font-bold w-1/2">
          {isGerman()
            ? "Ihr Individueller Übungsplan"
            : "Il tuo piano di esercizi individuale"}
        </Typography>
        <Text className="text-white my-6">
          {isGerman()
            ? "Sie können sich jetzt auch Ihren individuellen Übungsplan erstellen lassen – basierend auf Ihrem 3D-Scan, Ihren Fußproblemen und Ihren Zielen."
            : "Ora puoi anche creare il tuo piano di esercizi personalizzato in base alla scansione 3D, ai problemi del tuo piede e ai tuoi obiettivi."}
        </Text>

        <View className="flex-row mb-6">
          <Button variant="outline" className="bg-primary/10 py-4 rounded-2xl">
            {isGerman() ? "Jetzt erstellen!" : "Crea ora!"}
          </Button>
        </View>

        <View className="h-96 w-full my-8 px-3">
          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "black"]}
            className="absolute inset-0 z-[99] mt-36"
          />
          <Image
            source={ManAboutTORun}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
      </View>
      <VersionInfo />
    </Layout>
  );
}
