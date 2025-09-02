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
import {
  Image,
  View,
  ScrollView,
  Text,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { OutlinedText } from "@donkasun/react-native-outlined-text";

const translations = {
  german: {
    title: "Individuelle Fussübungen",
    subtitle: "Von Physiotherapeuten entwickelt   - exklusiv für Sie",
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
  const { width } = useWindowDimensions();

  const { isGerman } = useLanguageStore();
  const t = isGerman() ? translations.german : translations.italian;

  const renderVorteile = (text, Icon) => {
    return (
      <View className="bg-muted-background w-[48%] p-6 rounded-3xl mb-4 min-h-[180px] justify-between relative text-white">
        <Text className="text-base font-medium">{text}</Text>
        <View className="absolate p-3 w-36 bg-primary/20 border-2 border-primary rounded-2xl items-center justify-center">
          <Icon />
        </View>
      </View>
    );
  };

  return (
    <Layout className="bg-backgroundDark" style={{ paddingHorizontal: 0 }}>
      <ScrollView className="flex-1">
        <Typography className="text-3xl font-bold text-white text-center mb-4 leading-tight">
          {t.title}
        </Typography>
        <View className="relative h-96 w-full">
          <LinearGradient
            colors={["rgba(0,0,0,0.6)", "rgba(98, 160, 123, 0.5)"]}
            className="absolute inset-0 z-[99]"
          />

          <Image source={Woman} className="w-full h-full" resizeMode="cover" />

          <Typography
            variant="subtitle"
            className="text-white absolute top-2 left-1/2 -translate-x-1/2 z-[99] text-center"
          >
            {t.subtitle}
          </Typography>
        </View>
        <View className="mt-8 px-6">
          <Typography className="text-white text-xl font-bold leading-6">
            {t.description}
          </Typography>
        </View>
        <View className="mt-6 px-6">
          <Typography className="text-xl text-white mb-3">
            {isGerman()
              ? "Schon wenige Minuten täglich machen spürbar den Unterschied: für mehr Stabilität, Beweglichkeit und Wohlbefinden."
              : "Bastano pochi minuti al giorno per fare una differenza notevole: maggiore stabilità, mobilità e benessere."}
          </Typography>

          <Typography className="text-xl text-white my-4">
            {isGerman() ? "Wähle deine Kategorie" : "Scegli la tua categoria"}
          </Typography>
        </View>

        {/* category cards */}
        <View className="mb-6">
          <View className="bg-muted-background mx-4 border-2 border-primary/40 p-6 rounded-3xl relative">
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
        <View className="mb-6">
          <View className="bg-muted-background mx-4 p-6 border-2 border-primary/40 rounded-3xl relative">
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
        </View>
        <View className="mb-6">
          <View className="bg-muted-background mx-4 border-2 border-primary/40 p-6 rounded-3xl relative">
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

        <View className="p-4">
      {renderVorteile("Gezielt trainieren", Bones)}
      {renderVorteile("Effektiv vorbeugen", Infinity)}
    </View>
        {/* Vorteile */}
        {/* <View className="px-6 py-8">
          <Typography className="text-4xl font-bold text-white mb-8">
            {isGerman() ? "Vorteile" : "Vantaggi"}
          </Typography>

          <View className="flex-row flex-wrap justify-between">

            <View className="bg-muted-background w-[48%] p-6 rounded-3xl mb-4 min-h-[180px] justify-between relative">
              <Typography className="text-white text-lg font-semibold leading-tight">
                {isGerman()
                  ? "Verbesserter Gleichgewichtssinn und mehr Stabilität"
                  : "Miglioramento dell'equilibrio e maggiore stabilità"}
              </Typography>
                <View className="absolate p-3 w-36 bg-primary/20 border-2 border-primary rounded-2xl items-center justify-center">
                  <Infinity />
                </View>
            </View>


            <View className="bg-muted-background w-[48%] p-6 rounded-3xl mb-4 min-h-[180px] justify-between">
              <Typography className="text-white text-lg font-semibold leading-tight">
                {isGerman() ? "Erhöhte Flexibilität" : "Maggiore flessibilità"}
              </Typography>
              <View className="self-end">
                <View className="p-3 border-2 bg-primary/20 border-primary rounded-2xl items-center justify-center">
                  <Bones />
                </View>
              </View>
            </View>


            <View className="bg-muted-background w-[48%] p-6 rounded-3xl mb-4 min-h-[180px] justify-between">
              <Typography className="text-white text-lg font-semibold leading-tight">
                {isGerman() ? "Bessere Durchblutung" : "Migliore circolazione"}
              </Typography>
              <View className="self-end">
                <View className="p-3 border-2 bg-primary/20 border-primary rounded-2xl items-center justify-center">
                  <Refresh />
                </View>
              </View>
            </View>


            <View className="bg-muted-background w-[48%] p-6 rounded-3xl mb-4 min-h-[180px] justify-between">
              <Typography className="text-white text-lg font-semibold leading-tight">
                {isGerman()
                  ? "Reduzierte Fußschmerzen"
                  : "Riduzione del dolore ai piedi"}
              </Typography>
              <View className="self-end">
                <View className="p-3 border-2 bg-primary/20 border-primary rounded-2xl items-center justify-center">
                  <Meditation />
                </View>
              </View>
            </View>
          </View>
        </View> */}
      </ScrollView>
    </Layout>
  );
}
