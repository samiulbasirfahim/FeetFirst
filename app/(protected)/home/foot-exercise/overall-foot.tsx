import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Image, Text, View } from "react-native";
import woman from "@/assets/images/woman-upside-down.png";
import { Button } from "@/components/ui/button";
import MyCarousel from "@/components/ui/MyCarousel";
import { VersionInfo } from "@/components/common/version";
import ManAboutTORun from "@/assets/images/man-about-to-run.png";
import { LinearGradient } from "expo-linear-gradient";
import { useHeaderHeight } from "@react-navigation/elements";

export default function Screen() {
  const header_height = useHeaderHeight();
  const { isGerman } = useLanguageStore();
  return (
    <Layout scrollable className="bg-backgroundDark">
      <View style={{ height: header_height }}></View>
      {/* header */}
      <View className="relative -mx-3">
        <Typography className="absolute z-[99] text-3xl font-bold text-white text-center my-4 leading-tight px-3">
          {isGerman()
            ? "Allgemeine Übungen für die gesamte Fussgesundheit"
            : "Esercizi generali per la salute generale del piede"}
        </Typography>
        <View className="h-96 w-full my-8">

          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="absolute inset-0 z-[10] mb-16"
          />

          <Image
            source={woman}
            className="w-full h-full mt-20"
            resizeMode="cover"
          />
        </View>
      </View>

      <View className="mt-24">
        <Typography className="font-bold text-3xl">
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

      {/* product */}
      <View className="mt-8">
        <Typography className="text-3xl font-bold mb-4">
          {isGerman() ? "Produkte" : "Prodotti"}
        </Typography>

        <MyCarousel />
      </View>

      {/* point foot areas of pain */}

      {/* exercise plan */}
      <View className="pt-8">
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

        <View className="relative h-96 w-full my-8">
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
