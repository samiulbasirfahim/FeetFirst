import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import {
    FlatList,
    Image,
    ImageSourcePropType,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import skifinder from "@/assets/images/skifinder.png";
import { LinearGradient } from "expo-linear-gradient";
import { useLanguageStore } from "@/store/language";
import { Button } from "@/components/ui/button";
import { Marquee } from "@animatereactnative/marquee";
import { ShoeItem } from "@/components/ui/carousel-home";
import shoeImage from "@/assets/images/ski-shoe.png";
import BrandLogoSvg from "@/assets/svgs/Vibram_logo.svg";
import Arrow from "@/assets/svgs/arrow-exercise.svg";
import { VersionInfo } from "@/components/common/version";
import { Map } from "@/components/common/mapview";
import k2 from "@/assets/images/k2.png";
import dalbello from "@/assets/images/dalbello.png";
import head from "@/assets/images/head.png";
import { useEffect, useState } from "react";
import { useDrawerHeader } from "@/components/common/drawer-header";
import { AutoImage } from "@/components/ui/auto-image";

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
    const { height: heightOfWindow, width } = useWindowDimensions();

    const [dimension, setDimension] = useState({
        width: 0,
        height: 0,
    });

    const { onScroll, HeaderComponent, height } = useDrawerHeader({
        threeshold: 100,
    });

    const renderItem = ({ item }: { item: ShoeItem }) => (
        <View
            className="flex-1 bg-background p-6 border-primary/30 border rounded-3xl relative ms-3"
            style={{
                width: width * 0.86,
            }}
            onLayout={(e) => {
                setDimension({
                    width: e.nativeEvent.layout.width,
                    height: e.nativeEvent.layout.height,
                });
            }}
        >
            {/* Header Section */}
            <View className="mb-4">
                <Typography variant="titleSecondary" className="font-medium text-right">
                    {item.itemName ||
                        "Find your snowboard boot – perfectly matched for you."}
                </Typography>
                <Typography
                    variant="titleSecondary"
                    className="text-primary text-right mt-4"
                >
                    {item.price || "850.99"}
                </Typography>
            </View>

            <Image
                source={
                    typeof item.image === "string" ? { uri: item.image } : item.image
                }
                style={{ width: width * 0.8, height: dimension.height * 0.8 }}
                resizeMode="contain"
                className="absolute bottom-0 -left-10 -rotate-[13deg]"
            />

            <View className="absolute left-1 bottom-10">
                <item.brandLogo height={50} width={100} className="" />
            </View>
            <View className="absolute bottom-0 right-0 p-3 border border-primary rounded-3xl">
                <Arrow />
            </View>
        </View>
    );

    return (
        <View className="flex-1">
            {HeaderComponent}
            <Layout
                noPadding
                avoidTabbar
                scrollable
                className="bg-backgroundDark"
                onScroll={onScroll}
                style={{
                    marginTop: -height - 20,
                }}
            >
                <View className="relative overflow-hidden isolate">
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
                <Marquee
                    spacing={0}
                    speed={0.6}
                    style={{
                        marginTop: 28,
                    }}
                >
                    <View
                        className="bg-black flex-row py-4"
                        style={{
                            gap: 30,
                        }}
                    >
                        <AutoImage source={k2} height={40} />
                        <AutoImage source={dalbello} height={40} />
                        <AutoImage source={head} height={40} />
                    </View>
                </Marquee>

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
                <View className="pb-16">
                    <LinearGradient
                        colors={[
                            "rgba(98, 160, 123, 0.6)",
                            "rgba(98, 160, 123, 0.2)",
                            "transparent",
                            "transparent",
                        ]}
                        start={{ x: 1, y: 1 }}
                        end={{ x: 0.55, y: 0 }}
                        className="absolute inset-0"
                    />
                    <View className="py-4 relative">
                        {
                            <FlatList
                                data={shoes}
                                ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                                ListFooterComponent={() => <View style={{ width: 30 }} />}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={{
                                    height: 300,
                                    width: width,
                                }}
                                renderItem={renderItem}
                            />
                        }
                    </View>
                </View>

                {/* map */}
                <View
                    style={{
                        height: heightOfWindow * 0.5,
                    }}
                    className=""
                >
                    <Text className="text-black absolute">
                        {isGerman()
                            ? "Ihre zuverlässigen Partner im Bereich Ski Finder…"
                            : "Your reliable partners in the Ski Finder sector…"}
                    </Text>
                    <LinearGradient
                        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)"]}
                        className="absolute inset-0 z-[99] mt-10"
                    />
                    <Map />
                </View>

                <View>
                    <VersionInfo />
                </View>
            </Layout>
        </View>
    );
}
