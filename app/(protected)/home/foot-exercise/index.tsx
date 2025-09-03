import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import Woman from "@/assets/images/woman-yoga.png";
import Arrow from "@/assets/svgs/arrow-exercise.svg";
import Culves from "@/assets/images/culves.jpg";
import Infinity from "@/assets/svgs/Infinity.svg";
import Bones from "@/assets/svgs/Bones.svg";
import Refresh from "@/assets/svgs/Refresh.svg";
import Meditation from "@/assets/svgs/Meditation Round.svg";
import ManAboutTORun from "@/assets/images/man-about-to-run.png";
import {
  Image,
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { OutlinedText } from "@donkasun/react-native-outlined-text";
import { Button } from "@/components/ui/button";
import { VersionInfo } from "@/components/common/version";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

const translations = {
  german: {
    title: "Individuelle Fussübungen",
    description:
      "Fußübungen fördern deine gesamte Fußgesundheit, beugen Fehlstellungen, Beschwerden und vielem mehr vor – und werden trotzdem oft unterschätzt.",
    benefitsList: [
      "Stärkung der Fußmuskulatur",
      "Verbesserung der Beweglichkeit",
      "Schmerzlinderung",
      "Verbesserung der Balance",
    ],
    exercises: "Übungen zur Fußkräftigung:",
    exercisesList: [
      {
        title: "Zehengreifen",
        description: "Greifen Sie mit den Zehen kleine Gegenstände auf",
      },
      {
        title: "Fußgewölbe-Übungen",
        description: "Heben Sie das Fußgewölbe an, ohne die Zehen zu krümmen",
      },
      {
        title: "Achillessehnen-Dehnung",
        description: "Dehnen Sie die Achillessehne durch Wandstütze",
      },
    ],
    individualExercises: "Die individuellen Übungen",
    individualDescription:
      "Jede Person hat unterschiedliche Bedürfnisse. Unsere Physiotherapeuten haben spezielle Übungen für Ihre individuellen Anforderungen entwickelt.",
    startButton: "Übungen starten",
  },
  italian: {
    title: "Esercizi individuali per i piedi",
    subtitle: "Sviluppato da fisioterapisti esclusivamente per te",
    description:
      "Gli esercizi per i piedi promuovono la salute generale dei piedi, prevengono disallineamenti, fastidi e molto altro ancora, eppure sono spesso sottovalutati.",
    benefits: "Vantaggi:",
    benefitsList: [
      "Rafforzamento della muscolatura del piede",
      "Miglioramento della mobilità",
      "Alleviamento del dolore",
      "Miglioramento dell'equilibrio",
    ],
    exercises: "Esercizi per il rafforzamento del piede:",
    exercisesList: [
      {
        title: "Presa con le dita",
        description: "Afferrate piccoli oggetti con le dita dei piedi",
      },
      {
        title: "Esercizi per l'arco plantare",
        description: "Sollevate l'arco plantare senza curvare le dita",
      },
      {
        title: "Stretching del tendine d'Achille",
        description: "Allungate il tendine d'Achille appoggiandovi al muro",
      },
    ],
    individualExercises: "Gli esercizi individuali",
    individualDescription:
      "Ogni persona ha esigenze diverse. I nostri fisioterapisti hanno sviluppato esercizi speciali per le vostre esigenze individuali.",
    startButton: "Inizia esercizi",
  },
};

export default function Screen() {
  const header_height = useHeaderHeight();
  const { width } = useWindowDimensions();

  const { isGerman } = useLanguageStore();
  const t = isGerman() ? translations.german : translations.italian;

  const renderVorteile = (text, Icon) => {
    return (
      <View className="bg-muted-background/40 w-[48%] min-h-[180px] rounded-3xl mb-4 gap-4 justify-between relative text-white border-2 border-primary/30">
        <Text className="text-white font-bold text-xl px-4 pt-4">{text}</Text>
        <View className="flex-row justify-end">
          <View className="bg-primary/20 border-2 border-primary bottom-0 right-0 rounded-3xl items-center justify-center p-3">
            <Icon />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Layout className="bg-backgroundDark" scrollable>
      <View style={{ height: header_height }}></View>
      <Typography className="text-3xl font-bold text-white text-center my-4 leading-tight">
        {t.title}
      </Typography>

      <View className="relative h-96 w-full">
        <LinearGradient
          colors={["transparent", "rgba(98, 160, 123, 0.5)"]}
          className="absolute inset-0 z-[10]"
        />
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(0,0,0, 0.5)", "transparent"]}
          className="absolute inset-0 z-[10]"
        />

        <Image source={Woman} className="w-full h-full" resizeMode="cover" />

        <Typography
          variant="subtitle"
          className="text-white absolute top-2 left-1/2 -translate-x-1/2 z-[99] text-center "
        >
          {isGerman()
            ? "Von Physiotherapeuten entwickelt"
            : "Sviluppato da fisioterapisti"}
        </Typography>
        <Text className="text-white absolute top-2 left-1/2 -translate-x-1/2 z-[99] text-center mt-8">
          {isGerman() ? "– exklusiv für Sie" : "- esclusivamente per te"}
        </Text>
      </View>
      <View className="mt-8">
        <Typography className="text-white text-xl font-bold leading-6">
          {t.description}
        </Typography>
      </View>
      <View className="mt-6">
        <Typography className="text-xl text-white mb-3">
          {isGerman()
            ? "Schon wenige Minuten täglich machen spürbar den Unterschied: für mehr Stabilität, Beweglichkeit und Wohlbefinden."
            : "Bastano pochi minuti al giorno per fare una differenza notevole: maggiore stabilità, mobilità e benessere."}
        </Typography>

        <Typography className="text-xl font-bold text-white my-4">
          {isGerman() ? "Wähle deine Kategorie" : "Scegli la tua categoria"}
        </Typography>
      </View>

      {/* category cards */}
      <View className="mb-6">
        <View className="bg-muted-background border-2 border-primary/40 p-6 rounded-3xl relative">
          <Text className="text-white text-lg">
            {isGerman()
              ? "Gezielte Übungen zur Stärkung der Fußmuskulatur"
              : "Esercizi mirati per rafforzare i muscoli del piede"}
          </Text>
          <Text className="text-5xl text-muted-foreground font-bold mt-10">
            {isGerman() ? "Stärkung" : "rafforzamento"}
          </Text>
          <View className="absolute bottom-0 right-0 border border-primary p-4 rounded-3xl">
            <Arrow />
          </View>
        </View>
      </View>

      <Link href={"/(protected)/home/foot-exercise/flexibility" as any} asChild>
        <TouchableOpacity activeOpacity={0.9} className="mb-6">
          <View className="bg-muted-background p-6 border-2 border-primary/40 rounded-3xl relative">
            <Text className="text-white w-2/3 text-lg">
              {isGerman()
                ? "Übungen zur Flexibilitätserhöhung"
                : "Esercizi per aumentare la flessibilità"}
            </Text>
            <Text className="text-5xl text-muted-foreground font-bold mt-10">
              {isGerman() ? "Flexibilität" : "flessibilità"}
            </Text>
            <View className="absolute bottom-0 right-0 border border-primary p-4 rounded-3xl">
              <Arrow />
            </View>
          </View>
        </TouchableOpacity>
      </Link>

      <View className="mb-6">
        <View className="bg-muted-background border-2 border-primary/40 p-6 rounded-3xl relative">
          <Text className="text-white text-lg">
            {isGerman()
              ? "Allgemeine Übungen für die gesamte Fussgesundheit"
              : "Esercizi generali per la salute generale del piede"}
          </Text>
          <Text className="text-5xl text-muted-foreground font-bold mt-10">
            {isGerman() ? "Gesundheit" : "Salute"}
          </Text>
          <View className="absolute bottom-0 right-0 border border-primary p-4 rounded-3xl">
            <Arrow />
          </View>
        </View>
      </View>

      <View className="relative -mt-6 h-96 w-full">
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.0)"]}
          className="absolute inset-0 z-[99]"
        />
        <Image source={Culves} className="w-full h-full" resizeMode="cover" />
        <View className="absolute top-1/2 -translate-y-1/2 z-[99]">
          <OutlinedText
            width={width}
            strokeColor="#62A07B"
            strokeWidth={1}
            fillColor="#2E2E2E94"
            fontSize={32}
            text={
              isGerman()
                ? "Gezielt trainieren, effektiv vorbeugen"
                : "Formazione mirata, prevenzione efficace"
            }
          />
        </View>
      </View>

      {/* Vorteile */}
      <View className="pt-8">
        <Typography className="text-4xl font-bold text-white mb-8">
          {isGerman() ? "Vorteile" : "Vantaggi"}
        </Typography>
      </View>

      <View className="flex-row flex-wrap justify-between">
        {renderVorteile(
          isGerman()
            ? "Verbesserter Gleichgewichtssinn und mehr Stabilität"
            : "Miglioramento dell'equilibrio e maggiore stabilità",
          Infinity,
        )}
        {renderVorteile(
          isGerman() ? "Erhöhte Flexibilität" : "Maggiore flessibilità",
          Bones,
        )}
        {renderVorteile(
          isGerman() ? "Bessere Durchblutung" : "Migliore circolazione",
          Refresh,
        )}
        {renderVorteile(
          isGerman()
            ? "Reduzierte Fußschmerzen"
            : "Riduzione del dolore ai piedi",
          Meditation,
        )}
      </View>

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

        <View className="h-96 w-full my-8">
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
