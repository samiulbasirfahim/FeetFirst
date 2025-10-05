import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import {
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import skifinder from "@/assets/images/skifinder.png";
import { LinearGradient } from "expo-linear-gradient";
import { useLanguageStore } from "@/store/language";
import { Button } from "@/components/ui/button";
import { Marquee } from "@animatereactnative/marquee";
import Arrow from "@/assets/svgs/arrow-exercise.svg";
import { VersionInfo } from "@/components/common/version";
import { Map } from "@/components/common/mapview";
import k2 from "@/assets/images/k2.png";
import dalbello from "@/assets/images/dalbello.png";
import head from "@/assets/images/head.png";
import { useState } from "react";
import { useDrawerHeader } from "@/components/common/drawer-header";
import { AutoImage } from "@/components/ui/auto-image";
import { ShoeItem } from "@/type/product";
import { ItemImagePlaceholder } from "@/lib/placeholder";
import { useSuggestedShoes, useTopShoes } from "@/lib/queries/products";
import { LoadingSpinner } from "@/components/common/loading-spinner";

const partners = [
    {
        title: "Brandenburger Tor",
        address: "Pariser Platz, 10117 Berlin, Germany",
        lat: 52.5163,
        lng: 13.3777,
    },
    {
        title: "Kölner Dom",
        address: "Domkloster 4, 50667 Köln, Germany",
        lat: 50.9413,
        lng: 6.9583,
    },
    {
        title: "Neuschwanstein Schloss",
        address: "Neuschwansteinstraße 20, 87645 Schwangau, Germany",
        lat: 47.5576,
        lng: 10.7498,
    },
    {
        title: "Frauenkirche Dresden",
        address: "Neumarkt, 01067 Dresden, Germany",
        lat: 51.0504,
        lng: 13.7373,
    },
    {
        title: "Heidelberger Schloss",
        address: "Schlosshof 1, 69117 Heidelberg, Germany",
        lat: 49.41,
        lng: 8.715,
    },
    {
        title: "Holstentor Lübeck",
        address: "Holstentorplatz, 23552 Lübeck, Germany",
        lat: 53.8689,
        lng: 10.6866,
    },
    {
        title: "Schloss Sanssouci",
        address: "Maulbeerallee, 14469 Potsdam, Germany",
        lat: 52.4036,
        lng: 13.054,
    },
    {
        title: "Olympiastadion Berlin",
        address: "Olympischer Platz 3, 14053 Berlin, Germany",
        lat: 52.5145,
        lng: 13.2394,
    },
    {
        title: "Rathaus Hamburg",
        address: "Rathausmarkt 1, 20095 Hamburg, Germany",
        lat: 53.5503,
        lng: 10.005,
    },
    {
        title: "Zugspitze",
        address: "82491 Grainau, Germany",
        lat: 47.421,
        lng: 10.985,
    },
];

export default function Screen() {
    const { isGerman } = useLanguageStore();
    const { height: heightOfWindow, width } = useWindowDimensions();

    const { shoeList, isPending: isPending_skifinder, error } = useTopShoes(10);

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
                source={{
                    uri:
                        item.image && typeof item.image.image === "string"
                            ? item.image.image
                            : ItemImagePlaceholder,
                }}
                style={{ width: width * 0.8, height: dimension.height * 0.8 }}
                resizeMode="contain"
                className="absolute bottom-0 -left-10 -rotate-[13deg]"
            />

            <View className="absolute left-1 bottom-10">
                <Image
                    source={{
                        uri:
                            item.brandLogo && typeof item.brandLogo.image === "string"
                                ? item.brandLogo.image
                                : ItemImagePlaceholder,
                    }}
                    style={{
                        height: 50,
                        width: 100,
                    }}
                />
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
                        pointerEvents="none"
                        colors={["transparent", "rgba(98, 160, 123, 0.5)"]}
                        className="absolute inset-0 z-[10] mt-36"
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            zIndex: 99,
                        }}
                    />
                    <LinearGradient
                        pointerEvents="none"
                        colors={["rgba(0,0,0, 0.5)", "transparent"]}
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            zIndex: 99,
                        }}
                    />
                    <Image
                        source={skifinder}
                        className="w-full h-[450px]"
                        resizeMode="cover"
                    />
                    <Typography className="z-[999] absolute text-white text-5xl bottom-8 left-0 right-0 text-center font-medium">
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
                    withGesture={false}
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
                        pointerEvents="none"
                        colors={[
                            "rgba(98, 160, 123, 0.6)",
                            "rgba(98, 160, 123, 0.2)",
                            "transparent",
                            "transparent",
                        ]}
                        start={{ x: 1, y: 1 }}
                        end={{ x: 0.55, y: 0 }}
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            zIndex: 99,
                        }}
                    />
                    <View className="py-4 relative">
                        {error ? (
                            <Typography>Couldn't find shoes</Typography>
                        ) : isPending_skifinder ? (
                            <FlatList
                                data={shoeList}
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
                        ) : (
                            <LoadingSpinner />
                        )}
                    </View>
                </View>

                {/* map */}
                <View className="-mt-4">
                    {true && (
                        <View className=" bottom-0 left-0 right-0 bg-backgroundDark/90 backdrop-blur-md border-t border-primary/20">
                            <View className="p-4">
                                <Typography className="text-white font-semibold text-lg mb-3">
                                    Partners
                                </Typography>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ paddingRight: 16 }}
                                >
                                    {partners.map((marker, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => { }}
                                            className={`mr-3 p-3 rounded-lg border min-w-32 gap-1 bg-tab-background/50 border-primary/30`}
                                        >
                                            <Text
                                                className={`text-base font-medium leading-tight text-white`}
                                            >
                                                {marker.title}
                                            </Text>

                                            <Text
                                                className={`text-sm font-medium leading-tight text-white`}
                                            >
                                                {marker.address}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    )}
                </View>
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
                        pointerEvents="none"
                        className="mt-10"
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            zIndex: 99,
                        }}
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
