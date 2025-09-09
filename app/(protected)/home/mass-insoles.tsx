import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useLanguageStore } from "@/store/language";
import { Button } from "@/components/ui/button";
import Herobg from "@/assets/svgs/mass_insole_hero_bg.svg";
import HeroIcon from "@/assets/svgs/mass_insole_hero_icon.svg";
import Like from "@/assets/svgs/like_home.svg";
import Entypo from "@expo/vector-icons/Entypo";
import TouchButtonBefore from "@/assets/svgs/touch_button_before.svg";
import TouchButtonAfter from "@/assets/svgs/touch_button_after.svg";

import { Link, router } from "expo-router";
import { useState } from "react";
import NewsFlatlist from "@/components/ui/flatlist-news";
import MassFlatList from "@/components/ui/flatlist-massinsole";
import { useDrawerHeader } from "@/components/common/drawer-header";
import { TwoDAccordian } from "@/components/common/2d-accordian";

export type ShoeItem = {
    title: string;
    desc: string;
    img: number; // local image with require()
};

export const shoesData: ShoeItem[] = [
    {
        title: "Sportschuhe",
        desc: "Einlagen für jede Sportart – maximale Leistung, optimale Balance.",
        img: require("@/assets/images/playing.jpg"),
    },
    {
        title: "Radschuhe",
        desc: "Patentierte Winsole – für maximale Effizienz und optimale Kraftübertragung.",
        img: require("@/assets/images/cycling.jpg"),
    },
    {
        title: "Alltagssneaker",
        desc: "Ganztägiger Komfort und gesunde Fußunterstützung.",
        img: require("@/assets/images/running.jpg"),
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
    const { height, HeaderComponent, onScroll } = useDrawerHeader({
        threeshold: 100,
    });
    const { isGerman } = useLanguageStore();
    return (
        <View className="flex-1">
            {HeaderComponent}
            <Layout
                avoidTabbar
                scrollable
                noPadding
                className="bg-backgroundDark"
                onScroll={onScroll}
                style={{
                    marginTop: -height - 20,
                }}
            >
                {/* Hero  */}
                <View
                    className="bg-background px-3 rounded-b-[30px] mb-7 overflow-hidden isolate"
                    style={{
                        paddingTop: height + 20,
                        paddingBottom: 140,
                    }}
                >
                    <View className="mb-3 pl-3 pt-5 z-20">
                        <Typography className="font-medium text-foreground text-[28px]">
                            {isGerman() ? "Masseinlagen" : "Depositi di massa"}
                        </Typography>
                        <Typography className=" text-foreground underline text-sm leading-6">
                            {isGerman()
                                ? "Konfiguriere deine Einlage"
                                : "Configura il tuo deposito"}
                        </Typography>
                    </View>

                    <View
                        className="absolute"
                        style={{
                            top: height - 10,
                        }}
                        pointerEvents="none"
                    >
                        <View className="absolute left-[85px] top-[20px]">
                            <Herobg />
                        </View>
                        <View className="absolute -left-[145px] -top-4">
                            <Image
                                source={require("@/assets/images/mass_insole_hero_sole.png")}
                                style={{ height: 390, width: 470 }}
                            />
                        </View>
                        <View className="absolute left-[125px] top-[40px]">
                            <HeroIcon />
                        </View>
                    </View>
                </View>
                {/* Text Info  */}
                <View className="w-[90%] mx-auto flex-col gap-3 mb-8">
                    <View>
                        <Typography className="font-semibold text-[12px] ">
                            {isGerman()
                                ? "Individuell gefertigt. Präzise angepasst. Spürbar besser."
                                : "Prodotto individualmente. Regolato con precisione. Notevolmente migliore."}
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


                <TwoDAccordian />
                {/* Sole Details */}
                {/* <View className="relative isolate overflow-hidden">
                    <View className="relative flex-col w-[90%] mx-auto border border-primary/20 px-6 py-8 rounded-[30px] z-40 bg-background">
                        <View className="flex-row justify-between items-center mb-4 ">
                            <View className="border border-primary bg-primary/15 p-2.5 rounded-2xl">
                                <Like height={24} width={24} />
                            </View>
                            <View>
                                <Typography className="font-medium text-sm">
                                    Vorbeugung von Fehlstellungen
                                </Typography>
                            </View>
                            <View>
                                <Entypo name="chevron-small-up" size={30} color={"#62A07B"} />
                            </View>
                        </View>
                        <View>
                            <Typography className="text-sm">
                                Unterstützt die natürliche Fußhaltung, beugt Fehlstellungen wie
                                Plattfüßen oder Überpronation vor und sorgt für gesunde
                                Bewegungsabläufe langfristig.
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
                                onPressOut={() => {
                                    if (touch.first !== true) handleTouch("first");
                                }}
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
                                onPressOut={() => {
                                    if (touch.second !== true) handleTouch("second");
                                }}
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
                        <View className="absolute  left-[45px] top-[170px] z-30">
                            <TouchableOpacity
                                onPressOut={() => {
                                    if (touch.third !== true) handleTouch("third");
                                }}
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
                                onPressOut={() => {
                                    if (touch.fourth !== true) handleTouch("fourth");
                                }}
                                className="absolute -left-5 top-10"
                            >
                                {touch.fourth === false ? (
                                    <TouchButtonBefore height={35} width={35} />
                                ) : (
                                    <>
                                        <TouchButtonAfter height={35} width={35} />
                                        <View
                                            style={{
                                                width: 1.5, // thickness of the bar
                                                height: 240, // how long it should be

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
                </View> */}
                {/* Individual Insole */}
                <View className="w-[90%] mx-auto -mt-[90px]">
                    <View className="mb-5">
                        <Typography className="text-2xl font-bold text-boldText mb-3">
                            Individuelle Einlagen
                        </Typography>
                        <Typography className="text-white font-normal text-sm">
                            Von der Arbeit bis zum Sport – immer perfekt abgestimmt.
                        </Typography>
                    </View>
                    <View>
                        {shoesData.map((item, index) => (
                            <View
                                key={index}
                                className="mb-[16px] rounded-[30px] overflow-hidden border border-primary/30"
                            >
                                <ImageBackground
                                    source={item.img}
                                    style={{ height: 350, transform: [{ scaleX: -1 }] }}
                                    resizeMode="cover"
                                    className=""
                                >
                                    <View
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            bottom: 0,
                                            left: 0,
                                            backgroundColor: "rgba(0,0,0,0.6)",
                                        }}
                                    />
                                    <View
                                        style={{ transform: [{ scaleX: -1 }] }}
                                        className="h-full flex-col justify-end p-5 "
                                    >
                                        <Typography className="mb-2 text-2xl font-medium text-boldText">
                                            {item.title}
                                        </Typography>
                                        <Typography className="mb-2.5 text-white font-normal text-sm">
                                            {item.desc}
                                        </Typography>
                                        <Button
                                            onPress={() =>
                                                router.push("/(scan-upload)/while-scan-upload")
                                            }
                                            variant="outline"
                                            textClassName="text-base font-semibold"
                                            className="w-1/2 rounded-2xl py-2.5 bg-primary/20"
                                        >
                                            {isGerman() ? "Jetzt bestellen" : "Ordina ora"}
                                        </Button>
                                    </View>
                                </ImageBackground>
                            </View>
                        ))}
                    </View>
                </View>
                <View className="flex-col justify-end p-5 bg-background">
                    <Typography className="mb-2 text-sm font-medium text-boldText">
                        Gebrauchsanweisung Einlagen
                    </Typography>
                    <Typography className="mb-2.5 text-white font-light text-[12px]">
                        Schritt für Schritt zu richtigem Einsatz und Pflege – für maximalen
                        Komfort und lange Lebensdauer.
                    </Typography>
                    <Button
                        variant="outline"
                        textClassName="text-base font-semibold"
                        className="w-1/3 rounded-2xl py-3 bg-primary/20"
                    >
                        Download
                    </Button>
                </View>
                <View className="mt-7 mb-5">
                    <View className="w-[90%] mx-auto mb-4">
                        <Typography className="text-2xl text-boldText font-bold mb-2">
                            So einfach funktioniert’s
                        </Typography>
                        <Typography className="text-sm  text-white font-light">
                            Einzigartig. Einfach. Direkt zu dir nach Hause.
                        </Typography>
                    </View>
                    <View className="">
                        <Image
                            source={require("@/assets/images/iphoneLeft.png")}
                            style={{
                                width: 115,
                                height: 240,
                                left: `26%`,
                            }}
                            className=" -translate-x-1/2 absolute bottom-0 -rotate-[15deg]"
                        />
                        <Image
                            source={require("@/assets/images/iphoneRight.png")}
                            style={{
                                width: 115,
                                height: 240,
                                left: `74%`,
                            }}
                            className=" -translate-x-1/2 absolute bottom-0 rotate-[15deg]"
                        />
                        <Image
                            source={require("@/assets/images/iphoneMiddle.png")}
                            style={{ width: 125, height: 260, left: `50%` }}
                            className=" -translate-x-1/2"
                        />
                    </View>
                </View>
                <View className="mb-[90px]">
                    <MassFlatList />
                </View>
            </Layout>
        </View>
    );
}
