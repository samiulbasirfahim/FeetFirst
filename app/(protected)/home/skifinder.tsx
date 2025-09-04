import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { Image, Text, View } from "react-native";
import skifinder from "@/assets/images/skifinder.png";
import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { useLanguageStore } from "@/store/language";
import { Button } from "@/components/ui/button";
import { Marquee } from "@animatereactnative/marquee";
import K2 from "@/assets/svgs/k2.svg";
import Dalbello from "@/assets/svgs/dalbello.svg";
import Head from "@/assets/svgs/head.svg";

export default function Screen() {
  const header_height = useHeaderHeight();
  const { isGerman } = useLanguageStore();
  return (
    <Layout noPadding avoidTabbar scrollable className="bg-backgroundDark">
      <View style={{ height: header_height }}></View>

      {/* header */}
      <View className="relative -mt-8">
        <LinearGradient
          colors={["transparent", "rgba(98, 160, 123, 0.5)"]}
          className="absolute inset-0 z-[10] mt-36"
        />
        <LinearGradient
          colors={["rgba(0,0,0, 0.5)", "transparent"]}
          className="absolute inset-0 z-[10]"
        />
        <Image
          source={skifinder}
          className="w-full h-[450px]"
          resizeMode="cover"
        />
        <Typography className="absolute text-white text-5xl bottom-8 left-0 right-0 text-center font-medium z-10">
          SKIFINDER
        </Typography>
      </View>

      <View className="flex-1 justify-center items-center gap-6 mt-8">
        <Typography className="text-center text-xl font-medium w-96">
          {isGerman()
            ? "Finde jetzt mit wenigen Klicks dein passendes Skiset– abgestimmt auf dein Fahrkönnen, Gelände und Style."
            : "Trova il set di sci perfetto per te in pochi clic, su misura per le tue capacità sciistiche, il terreno e lo stile."}
        </Typography>
        <Button
          variant="outline"
          className="px-6 py-4 bg-primary/15 rounded-2xl"
        >
          {isGerman() ? "JETZT KONFIGURIEREN" : "CONFIGURA ORA"}
        </Button>
      </View>

      {/* sponsors */}
      <View className="bg-muted-background p-12 mt-8">
        <Marquee spacing={20} speed={1}>
          <View className="flex-row gap-6">
            {/* <K2 /> */}
            <Text className="text-6xl text-white font-bold">K2</Text>
            <Text className="text-6xl text-white font-bold">Dalbella</Text>
            <Text className="text-6xl text-white font-bold">HEAD</Text>
            {/* <Dalbello width={100} height={100} />
            <Head width={100} height={100} /> */}
          </View>
        </Marquee>
      </View>

      <View className="mt-8 p-6">
        <Typography className="text-3xl font-medium">
            {
                isGerman()
                ? "Skiverleih – schnell & unkompliziert"
                : "Noleggio sci: facile e veloce"
            }
        </Typography>
        <Text className="text-white mt-6">
            {
                isGerman()
                ? "Keine langen Wartezeiten und unnötiges Anprobieren – konfiguriere dein Leih-Set und hole es darauf perfekt vorbereitet ab."
                : "Niente lunghi tempi di attesa o montaggi inutili: configura il tuo set a noleggio e ritiralo perfettamente preparato."
            }
        </Text>
        <Button
          variant="outline"
          className="px-6 py-4 bg-primary/15 rounded-2xl w-3/5 mt-6"
        >
          {isGerman() ? "JETZT KONFIGURIEREN" : "CONFIGURA ORA"}
        </Button>
      </View>
    </Layout>
  );
}
