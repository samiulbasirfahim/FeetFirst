import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import skifinder from "@/assets/images/skifinder.png";
import { useHeaderHeight } from "@react-navigation/elements";
import { LinearGradient } from "expo-linear-gradient";
import { useLanguageStore } from "@/store/language";
import { Button } from "@/components/ui/button";
import { Marquee } from "@animatereactnative/marquee";
import K2 from "@/assets/svgs/k2.svg";
import Dalbello from "@/assets/svgs/dalbello.svg";
import Head from "@/assets/svgs/head.svg";
import HomeCarausel, { ShoeItem } from "@/components/ui/carousel-home";
import shoeImage from "@/assets/images/ski-shoe.png";
import BrandLogoSvg from "@/assets/svgs/Vibram_logo.svg";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import Arrow from "@/assets/svgs/arrow-exercise.svg";
import { VersionInfo } from "@/components/common/version";
import { Map } from "@/components/common/mapview";

const shoes: ShoeItem[] = [
  {
    itemName: "Find your snowboard boot – perfectly matched for you.",
    brandName: "VIBRAM",
    brandLogo: BrandLogoSvg,
    price: "$350.99",
    image: shoeImage,
  },
  {
    itemName: "Item A5",
    brandName: "VIBRAM",
    brandLogo: BrandLogoSvg,
    price: "$289.49",
    image: shoeImage,
  },
  {
    itemName: "Item A5",
    brandName: "VIBRAM",
    brandLogo: BrandLogoSvg,
    price: "$410.00",
    image: shoeImage,
  },
  {
    itemName: "Item A5",
    brandName: "VIBRAM",
    brandLogo: BrandLogoSvg,
    price: "$199.75",
    image: shoeImage,
  },
  {
    itemName: "Item A5",
    brandName: "VIBRAM",
    brandLogo: BrandLogoSvg,
    price: "$479.20",
    image: shoeImage,
  },
];

export default function Screen() {
  const { isGerman } = useLanguageStore();
  const { height } = useWindowDimensions();

  const { width } = Dimensions.get("window");
  const progress = useSharedValue<number>(0);

  const renderItem = ({ item }: { item: ShoeItem }) => (
    <View
      className="flex bg-background p-6 border-primary/30 border rounded-2xl w-[76%] h-[530px] relative"
      accessible={true}
      accessibilityLabel={`${item.itemName || "Shoe item"} for $${item.price || "850.99"}`}
    >
      {/* Header Section */}
      <View className="mb-4">
        <Typography className="text-3xl font-medium text-right">
          {item.itemName ||
            "Find your snowboard boot – perfectly matched for you."}
        </Typography>
        <Text className="text-primary text-right text-3xl mt-4">
          ${item.price || "850.99"}
        </Text>
      </View>

      {/* Image Container */}
      <View className="h-40 w-full items-center justify-center mt-4 mb-4">
        <Image
          source={
            typeof item.image === "string" ? { uri: item.image } : item.image
          }
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain" // Changed from "cover" to show full product
          accessible={true}
          accessibilityLabel={item.itemName || "Product image"}
        />
      </View>

      {/* Brand Logo - Positioned relative to image container */}
      <View className="absolute top-[200px] left-7">
        <item.brandLogo
          height={50}
          width={100}
          accessible={true}
          accessibilityLabel={`${item.brandName || "Brand"} logo`}
        />
      </View>

      {/* Arrow Button - Better positioned */}
      <View className="absolute bottom-6 right-6">
        <TouchableOpacity
          className="p-3 border border-primary rounded-2xl bg-background"
          onPress={() => {
            /* Handle item selection */
          }}
          accessible={true}
          accessibilityLabel="Select this item"
          accessibilityRole="button"
        >
          <Arrow />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Layout noPadding avoidTabbar scrollable className="bg-backgroundDark">
      {/* header */}
      <View className="relative">
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
          {isGerman()
            ? "Skiverleih – schnell & unkompliziert"
            : "Noleggio sci: facile e veloce"}
        </Typography>
        <Text className="text-white mt-6">
          {isGerman()
            ? "Keine langen Wartezeiten und unnötiges Anprobieren – konfiguriere dein Leih-Set und hole es darauf perfekt vorbereitet ab."
            : "Niente lunghi tempi di attesa o montaggi inutili: configura il tuo set a noleggio e ritiralo perfettamente preparato."}
        </Text>
        <Button
          variant="outline"
          className="px-6 py-4 bg-primary/15 rounded-2xl w-3/5 mt-6"
        >
          {isGerman() ? "JETZT KONFIGURIEREN" : "CONFIGURA ORA"}
        </Button>
      </View>

      {/* carousel */}
      <View className="my-18">
        <Carousel
          autoPlayInterval={2000}
          // panGestureHandlerProps={{
          //   activeOffsetX: [-10, 10],
          // }}
          data={shoes}
          loop={true}
          pagingEnabled={true}
          snapEnabled={true}
          width={width}
          height={230}
          style={{
            width: width,
            borderColor: "#ffffff",
          }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 80,
          }}
          onProgressChange={progress}
          renderItem={renderItem}
        />
      </View>

      <View
        style={{
          height: height * 0.5,
        }}
      >
        <Map />
      </View>

      <View>
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.0)"]}
          className="absolute inset-0 z-[99]"
        />
        <VersionInfo />
      </View>
    </Layout>
  );
}
