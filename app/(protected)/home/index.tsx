import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link, router, useNavigation } from "expo-router";
import { Image, TouchableOpacity, View, ImageBackground } from "react-native";
import Herobg from "@/assets/svgs/hero_bg.svg";
import Herofeet from "@/assets/images/hero_feet.png";
import Herodot from "@/assets/svgs/hero_dot.svg";
import HomeCarausel, { ShoeItem } from "@/components/ui/carousel-home";
import HomeCarauselSecond, {
    ShoeItemSecond,
} from "@/components/ui/carousel-home-second";
import Like from "@/assets/svgs/like_home.svg";
import Entypo from "@expo/vector-icons/Entypo";
import TouchButtonBefore from "@/assets/svgs/touch_button_before.svg";
import TouchButtonAfter from "@/assets/svgs/touch_button_after.svg";
import shoeImage from "@/assets/images/shoe_vibram_a6.png";
import BrandLogoSvg from "@/assets/svgs/Vibram_logo.svg";
import shoeImage2 from "@/assets/images/shoe_hoka_a54.png";
import BrandLogoSvg2 from "@/assets/svgs/hoka_logo.svg";
import { useState } from "react";
import HomeFlatList from "@/components/ui/flatlist-home";
import { VersionInfo } from "@/components/common/version";
import NewsFlatlist from "@/components/ui/flatlist-news";
import { useDrawerHeader } from "@/components/common/drawer-header";

const shoes: ShoeItem[] = [
    {
        itemName: "Item A5",
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

const shoesSecond: ShoeItemSecond[] = [
    {
        itemName: "Item A54",
        brandName: "HOKA",
        brandLogo: BrandLogoSvg2,
        price: "$350.99",
        image: shoeImage2,
    },
    {
        itemName: "Item A55",
        brandName: "HOKA",
        brandLogo: BrandLogoSvg2,
        price: "$289.49",
        image: shoeImage2,
    },
    {
        itemName: "Item A56",
        brandName: "HOKA",
        brandLogo: BrandLogoSvg2,
        price: "$410.00",
        image: shoeImage2,
    },
    {
        itemName: "Item A57",
        brandName: "HOKA",
        brandLogo: BrandLogoSvg2,
        price: "$199.75",
        image: shoeImage2,
    },
    {
        itemName: "Item A58",
        brandName: "HOKA",
        brandLogo: BrandLogoSvg2,
        price: "$479.20",
        image: shoeImage2,
    },
];

export default function Screen() {
    const [touch, setTouch] = useState({
        first: true,
        second: false,
        third: false,
        fourth: false,
    });

    const handleTouch = (position) => {
        setTouch((prev) => {
            const reset = {
                first: false,
                second: false,
                third: false,
                fourth: false,
            };

            return { ...reset, [position]: !prev[position] };
        });
    };

    const { isGerman } = useLanguageStore();
    const { HeaderComponent, onScroll, height } = useDrawerHeader({
        threeshold: 100,
    });
    return (
        <Layout
            className="bg-backgroundDark"
            scrollable
            noPadding
            avoidTabbar
            onScroll={onScroll}
            stickyIndex={[0]}
        >
            {HeaderComponent}
            <View
                className="bg-background px-3 pb-7 rounded-b-[30px] mb-7"
                style={{
                    paddingTop: height + 20,
                    marginTop: -height - 20,
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
                            className="border-primary rounded-[12px] bg-primary/15 py-3"
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
                    <View className="absolute left-[178px] -top-[10px]">
                        {/* <Herofeet height={400} width={300} /> */}
                        <Image source={Herofeet} style={{ height: 250, width: 200 }} />
                    </View>
                    <View className="absolute left-[265px] top-[45px]">
                        <Herodot height={135} />
                    </View>
                </View>
            </View>

            {/* Text Info  */}
            <View className="w-[90%] mx-auto flex-col gap-3 mb-8">
                <View>
                    <Typography className="font-semibold text-[12px] ">
                        {isGerman()
                            ? "Dein Scan. Deine Passform. Deine Individualisierung."
                            : "La tua scansione. La tua vestibilità. La tua individualizzazione."}
                    </Typography>
                </View>
                <View>
                    <Typography className="text-white font-light text-[12px] leading-[16px]">
                        {isGerman()
                            ? `Mit FeetF1rst findest du jetzt deine perfekt passenden Schuhe – basierend auf deinem Scan, fortgeschrittenster Beratung und einem Preisvergleich für das beste Angebot.`
                            : `Con FootF1rst ora puoi trovare le scarpe che calzano perfettamente, in base alla tua scansione, ai consigli avanzati e al confronto dei prezzi per ottenere l'offerta migliore.`}
                    </Typography>
                </View>
                <View>
                    <Link href={"/"}>
                        <Typography className="underline  text-white font-light text-[12px]">
                            {isGerman()
                                ? `Jetzt testen und selbst überzeugen.`
                                : `
Provalo ora e verifica tu stesso.`}
                        </Typography>
                    </Link>
                </View>
            </View>

            {/* 1st Carousel  */}
            <View className="mb-10">
                <View className="px-5 pb-7">
                    <Typography className="text-[22px] font-medium text-foreground">
                        {"Shoe Finder FeetF1rst"}
                    </Typography>
                </View>
                <View>
                    <HomeCarausel shoes={shoes} />
                </View>
                <View className="w-[60%] mt-5 ml-6">
                    <Button
                        onPress={() =>
                            router.push({
                                pathname: "/shoe-recommendations/subcategory",
                                params: {
                                    category: "all",
                                },
                            })
                        }
                        variant="outline"
                        textClassName=" text-base font-medium"
                        className="border-primary rounded-[12px] bg-primary/15 py-[6px] font-medium"
                    >
                        {isGerman()
                            ? "Alle Kategorien entdecken"
                            : "Scopri tutte le categorie"}
                    </Button>
                </View>
            </View>

            {/* Text Info */}
            <View className="w-[90%] mx-auto flex-col gap-3 mb-5">
                <View>
                    <Typography className="font-bold text-2xl ">
                        {isGerman() ? "Maßeinlage" : "Inserto dimensionale"}
                    </Typography>
                </View>
                <View>
                    <Typography className="text-white font-light text-[12px] leading-[16px]">
                        {isGerman()
                            ? `Passgenau für dich. Maximaler Komfort – basierend auf deinem 3D-Scan und  deinen Bedürfnissen.`
                            : `Perfetto per te. Massimo comfort – in base alla tua scansione 3D e alle tue esigenze.`}
                    </Typography>
                </View>
                <View>
                    <Link href={"/"}>
                        <Typography className="underline  text-white  text-base">
                            {isGerman() ? `Mehr erfahren.` : `Saperne di più.`}
                        </Typography>
                    </Link>
                </View>
            </View>

            {/* Sole Details */}
            <View className="relative isolate overflow-hidden">
                <View className="relative flex-col w-[90%] mx-auto border border-primary/20 px-6 py-8 rounded-[30px] z-40 bg-backgroundDark">
                    <View className="flex-row justify-between items-center mb-4 ">
                        <View className="border border-primary bg-primary/15 p-2.5 rounded-2xl">
                            <Like height={24} width={24} />
                        </View>
                        <View>
                            <Typography className="font-medium text-sm">
                                Leistungssteigerung mit Einlagen
                            </Typography>
                        </View>
                        <View>
                            <Entypo name="chevron-small-up" size={30} color={"#62A07B"} />
                        </View>
                    </View>
                    <View>
                        <Typography className="text-sm">
                            Optimiert deine Bewegungsabläufe, steigert deine sportliche
                            Leistung und reduziert Ermüdung für mehr Ausdauer und Effizienz.
                        </Typography>
                    </View>
                </View>
                <View className="relative z-20">
                    <Image
                        source={require("@/assets/images/foot_sole3.png")}
                        style={{ height: 400, width: 550, right: 65, top: 20 }}
                    />
                    <View className="absolute right-[50px] top-[45px] ">
                        <TouchableOpacity
                            onPressOut={() => handleTouch("first")}
                            className="absolute -left-10"
                        >
                            {touch.first === false ? (
                                <TouchButtonBefore height={35} width={35} />
                            ) : (
                                <>
                                    <TouchButtonAfter height={35} width={35} />
                                    <View
                                        style={{
                                            width: 1.5, // thickness of the bar
                                            height: 50, // how long it should be
                                            position: "absolute",
                                        }}
                                        className="absolute right-1/2 bottom-10 bg-primary/50"
                                    />
                                </>
                            )}
                        </TouchableOpacity>
                        <Typography className="w-[150px] font-medium text-base leading-[14px] pl-2">
                            Leistungssteigerung mit Einlagen
                        </Typography>
                    </View>
                    <View className="absolute  right-[10px] top-[98px]">
                        <TouchableOpacity
                            onPressOut={() => handleTouch("second")}
                            className="absolute -left-10 top-8"
                        >
                            {touch.second === false ? (
                                <TouchButtonBefore height={35} width={35} />
                            ) : (
                                <>
                                    <TouchButtonAfter height={35} width={35} />
                                    <View
                                        style={{
                                            width: 1.5,
                                            height: 140,

                                            position: "absolute",
                                        }}
                                        className="absolute right-1/2 bottom-10 bg-primary/50"
                                    />
                                </>
                            )}
                        </TouchableOpacity>
                        <Typography className="w-[150px] font-medium text-base leading-[14px] pl-2">
                            Längere Lebensdauer Ihrer Schuhe
                        </Typography>
                    </View>
                    <View className="absolute  left-[45px] top-[170px] z-10">
                        <TouchableOpacity
                            onPressOut={() => handleTouch("third")}
                            className="absolute -top-12"
                        >
                            {touch.third === false ? (
                                <TouchButtonBefore height={35} width={35} />
                            ) : (
                                <>
                                    <TouchButtonAfter height={35} width={35} />
                                    <View
                                        style={{
                                            width: 1.5, // thickness of the bar
                                            height: 140, // how long it should be

                                            position: "absolute",
                                        }}
                                        className="absolute right-1/2 bottom-10 bg-primary/50"
                                    />
                                </>
                            )}
                        </TouchableOpacity>
                        <Typography className=" w-[150px]  font-medium text-base leading-[14px] pl-2">
                            Schmerzreduktion & Problembehandlung
                        </Typography>
                    </View>
                    <View className="absolute  -right-5 top-[190px]">
                        <TouchableOpacity
                            onPressOut={() => handleTouch("fourth")}
                            className="absolute -left-5 top-10"
                        >
                            {touch.fourth === false ? (
                                <TouchButtonBefore height={35} width={35} />
                            ) : (
                                <>
                                    <TouchButtonAfter height={35} width={35} />
                                    <View
                                        style={{
                                            width: 1.5,
                                            height: 240,

                                            position: "absolute",
                                        }}
                                        className="absolute right-1/2 bottom-10 bg-primary/50"
                                    />
                                </>
                            )}
                        </TouchableOpacity>
                        <Typography className="w-[150px] font-medium text-base leading-[14px] ">
                            Vorbeugung von Fehlstellungen
                        </Typography>
                    </View>
                </View>
            </View>

            {/* 2nd Carousel   */}
            <View className="mb-10 -mt-[100px]">
                <View className="px-7 pb-3">
                    <Typography className="text-[22px] font-medium text-foreground mb-5">
                        {"Vorschläge Für Dich"}
                    </Typography>
                    <Typography className="text-base font-light leading-[18px] text-white">
                        Passgenau für dich. Maximaler Komfort – basierend auf deinem 3D-Scan
                        und deinen Bedürfnissen.
                    </Typography>
                </View>
                <View>
                    <HomeCarauselSecond shoes={shoesSecond} />
                </View>
                <View className="w-[40%] mt-4 ml-9">
                    <Button
                        variant="outline"
                        textClassName=" text-base font-medium"
                        className="border-primary rounded-[12px] bg-primary/15 py-[10px]  font-medium"
                    >
                        {isGerman() ? "Zur Kategorie" : "Alla categoria"}
                    </Button>
                </View>
            </View>

            {/* Last Carousel   */}
            <View>
                <HomeFlatList />
            </View>

            {/* Plan Info */}
            <View className="mt-20 mb-10 w-[90%] mx-auto">
                <View className="mb-5">
                    <Typography className="text-lg font-medium  text-center">
                        Gezieltes Training für deine Füße
                    </Typography>
                </View>
                <View className="flex-col gap-4">
                    <View className="flex-col relative border-primary/20 border rounded-3xl overflow-hidden">
                        <ImageBackground
                            source={require("@/assets/images/basic_plan_bg.png")}
                            style={{ flex: 1 }}
                            resizeMode="cover"
                            className=" -z-10"
                        >
                            <View
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                    backgroundColor: "rgba(0,0,0,0.7)",
                                }}
                            />
                            <View className="px-4 py-5 flex-col gap-2">
                                <View className="flex-row justify-between ">
                                    <Typography className="text-base font-medium text-[#C3C3C3]">
                                        Basic plan
                                    </Typography>
                                    <Typography className="text-base font-medium text-white">
                                        Kostenlos
                                    </Typography>
                                </View>
                                <View className="px-1">
                                    <Typography className="text-[12px] text-white">
                                        {" "}
                                        {`\u2022`} Einfache Übungen für mehr Stabilität,
                                        Flexibilität & mehr
                                    </Typography>
                                    <Typography className="text-[12px] text-white">
                                        {" "}
                                        {`\u2022`} Ideal zur Vorbeugung von Fussfehlstellungen
                                    </Typography>
                                    <Typography className="text-[12px] text-white">
                                        {" "}
                                        {`\u2022`} Stärkung der Fuß- und Beinmuskulatur
                                    </Typography>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>

                    <View className="flex-col relative border-primary/60 border rounded-3xl overflow-hidden">
                        <ImageBackground
                            source={require("@/assets/images/pro_plan_bg.jpg")}
                            style={{ flex: 1 }}
                            resizeMode="cover"
                            className=" -z-10 rounded-3xl"
                        >
                            <View
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                    backgroundColor: "rgba(0,0,0,0.5)",
                                    borderRadius: 30,
                                }}
                            />
                            <View className="px-4 py-5 flex-col gap-2">
                                <View className="flex-row justify-between ">
                                    <Typography className="text-base font-medium text-[#C3C3C3]">
                                        Pro Plan
                                    </Typography>
                                    <Typography className="text-lg font-medium text-primary">
                                        4,99€
                                    </Typography>
                                </View>
                                <View className="px-1 ">
                                    <Typography className="text-[12px] text-white leading-6">
                                        {" "}
                                        {`\u2022`} Gezielte Übungen basierend auf deinen Antworten
                                    </Typography>
                                    <Typography className="text-[12px] text-white leading-6">
                                        {" "}
                                        {`\u2022`} Individuelle Trainingspläne für deine
                                        Fußbedürfnisse
                                    </Typography>
                                    <Typography className="text-[12px] text-white leading-6">
                                        {" "}
                                        {`\u2022`} Fortschrittsanalyse und Anpassung der Übungen
                                    </Typography>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View className="flex-row justify-between items-center border border-primary/20 py-4 px-6 bg-background rounded-3xl">
                        <Typography className="w-1/2 text-base text-[#C3C3C3] leading-[18px]">
                            Personalisiertes Lauftraining
                        </Typography>
                        <Typography className="text-xl text-primary">
                            Coming soon
                        </Typography>
                    </View>
                </View>
            </View>

            <View>
                <NewsFlatlist />
            </View>

            <VersionInfo />
        </Layout>
    );
}
