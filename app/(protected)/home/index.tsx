import HOME from "@/assets/svgs/home.svg";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { DrawerActions } from "@react-navigation/native";
import { Link, useNavigation } from "expo-router";
import Drawer from "expo-router/drawer";
import { Image, useWindowDimensions, View } from "react-native";
import Herobg from "@/assets/svgs/hero_bg.svg";
import Herofeet from "@/assets/svgs/hero_feet.svg";
import Herodot from "@/assets/svgs/hero_dot.svg";
import { useHeaderHeight } from "@react-navigation/elements";

export default function Screen() {
  const { width } = useWindowDimensions();
  const height = useHeaderHeight();
  const navigation = useNavigation();
  const { isGerman } = useLanguageStore();
  return (
    <>
      <Drawer.Screen
        options={{
          drawerLabel({ focused }) {
            return (
              <View className="flex-row gap-2 items-center">
                <HOME />
                <Typography className="text-2xl text-white font-semibold">
                  Home
                </Typography>
              </View>
            );
          },
        }}
      />

      <Layout
        edges={[]}
        className="bg-backgroundDark"
        style={{ paddingHorizontal: 0 }}
        scrollable
        noPadding
      >
        <View
          className="bg-background px-3 pt-7 pb-7 rounded-b-[30px] mb-7"
          style={{
            paddingTop: height + 20,
          }}
        >
          <View className="mb-3">
            <Typography
              variant="title"
              className="font-medium text-foreground text-[30px]"
            >
              {isGerman() ? "Willkommen" : "Benvenuto"}
            </Typography>
            <Typography
              variant="title"
              className="font-medium text-foreground text-[30px]"
            >
              Jhon!
            </Typography>
          </View>

          <View className="w-[68%]">
            <View className="flex flex-row gap-2 w-full mb-3">
              <Button
                variant="outline"
                textClassName="text-white font-normal text-sm"
                className="border-white/15 rounded-full bg-white/10 flex-1 justify-center "
              >
                {isGerman() ? "Masseinlage" : "Plantare"}
              </Button>
              <Button
                variant="outline"
                textClassName="text-white font-normal text-sm"
                className="border-white/15 rounded-full bg-white/10 flex-1 justify-center"
              >
                {isGerman() ? "Fussübungen" : "Esercizi piedi"}
              </Button>
            </View>
            <View className="">
              <Button
                variant="outline"
                textClassName=" text-base"
                className="border-primary rounded-[12px] bg-primary/20 py-3"
              >
                {isGerman() ? "Dein perfekter Schuh" : "Esercizi per i piedi"}
              </Button>
            </View>
          </View>
          <View
            className="absolute"
            style={{
              top: height - 10,
            }}
            pointerEvents="none"
          >
            <View className="absolute left-[211px] -top-[45px]">
              <Herobg height={300} width={300} />
            </View>
            <View className="absolute left-[115px] -top-[145px]">
              <Herofeet height={400} width={300} />
            </View>
            <View className="absolute left-[265px] top-[45px]">
              <Herodot height={135} />
            </View>
          </View>
        </View>
        <View className="px-4 flex-col gap-3">
          <View>
            <Typography className="font-semibold">
              {isGerman()
                ? "Dein Scan. Deine Passform. Deine Individualisierung."
                : "La tua scansione. La tua vestibilità. La tua individualizzazione."}
            </Typography>
          </View>
          <View>
            <Typography className="text-white">
              {isGerman()
                ? `Mit FeetF1rst findest du jetzt deine perfekt passenden Schuhe – basierend auf deinem Scan, fortgeschrittenster Beratung und einem Preisvergleich für das beste Angebot.`
                : `Con FootF1rst ora puoi trovare le scarpe che calzano perfettamente, in base alla tua scansione, ai consigli avanzati e al confronto dei prezzi per ottenere l'offerta migliore.`}
            </Typography>
          </View>
          <View>
            <Link href={"/"}>
              <Typography className="underline font-normal text-white">
                {isGerman()
                  ? `Jetzt testen und selbst überzeugen.`
                  : `
Provalo ora e verifica tu stesso.`}
              </Typography>
            </Link>
          </View>
        </View>
        <View className="px-4">
          <Typography className="text-[25 px] font-bold">
            {"Shoe Finder FeetF1rst"}
          </Typography>
        </View>
      </Layout>
    </>
  );
}
