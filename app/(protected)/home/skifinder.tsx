import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import {
    FlatList,
    Image,
    Pressable,
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
import k2 from "@/assets/images/k2.png";
import dalbello from "@/assets/images/dalbello.png";
import head from "@/assets/images/head.png";
import { useState } from "react";
import { useDrawerHeader } from "@/components/common/drawer-header";
import { AutoImage } from "@/components/ui/auto-image";
import { ShoeItem } from "@/type/product";
import { ItemImagePlaceholder } from "@/lib/placeholder";
import { useTopShoes } from "@/lib/queries/products";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { useGetPartners } from "@/lib/queries/partner";
import { Partner } from "@/type/partner";
import { ComingSoonPopup } from "@/components/common/coming-soon-popup";
import { router } from "expo-router";

export default function Screen() {
    const { isGerman } = useLanguageStore();
    const { height: heightOfWindow, width } = useWindowDimensions();
    const { partners, isPending } = useGetPartners();

    console.log("Partners: ", partners);

    const [showModal, setShowModal] = useState(false);

    const { shoeList, isPending: isPending_skifinder, error } = useTopShoes(10);

    const [dimension, setDimension] = useState({
        width: 0,
        height: 0,
    });

    const { onScroll, HeaderComponent, height } = useDrawerHeader({
        threeshold: 100,
    });

    const renderItem = ({ item }: { item: ShoeItem }) => (
        <Pressable
            onPress={() => {
                router.push({
                    pathname: "/others/shoe-details",
                    params: {
                        id: item.id,
                    },
                });
            }}
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
                <Typography
                    variant="titleSecondary"
                    className="text-foreground text-right z-100"
                >
                    {item.itemName.length > 12
                        ? item.itemName.slice(0, 16) + "..."
                        : item.itemName}
                </Typography>
                <Typography
                    variant="titleSecondary"
                    className="text-primary text-right mt-4 z-100"
                >
                    {item.price}
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
                className="absolute bottom-0 -rotate-[13deg]"
            />

            {item.brandLogo && (
                <View className="absolute left-1 bottom-10">
                    <Image
                        source={{
                            uri:
                                item.brandLogo && typeof item.brandLogo.image === "string"
                                    ? item.brandLogo.image
                                    : ItemImagePlaceholder,
                        }}
                        resizeMode="contain"
                        style={{
                            height: 50,
                            width: 100,
                        }}
                    />
                </View>
            )}
            <View className="absolute bottom-0 right-0 p-3 border border-primary rounded-3xl">
                <Arrow />
            </View>
        </Pressable>
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
                        onPress={() => setShowModal(true)}
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
                        onPress={() => setShowModal(true)}
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
                        ) : !isPending_skifinder ? (
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

                <View className="-mt-4">
                    {partners && partners.length > 0 && (
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
                                    {(partners as Partner[]).map((marker, index) => (
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

                    <Map partners={partners && partners.length > 0 ? partners : []} />
                </View>

                <View>
                    <VersionInfo />
                </View>
            </Layout>
            <ComingSoonPopup
                visible={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
            />
        </View>
    );
}
