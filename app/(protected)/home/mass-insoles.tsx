import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import PARTNER1 from "@/assets/svgs/feetfirst-partner.svg";
import PARTNER2 from "@/assets/svgs/partern-2.svg";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import { useLanguageStore } from "@/store/language";
import { Button } from "@/components/ui/button";
import Herobg from "@/assets/svgs/mass_insole_hero_bg.svg";
import HeroIcon from "@/assets/svgs/mass_insole_hero_icon.svg";
import k2 from "@/assets/images/k2.png";
import dalbello from "@/assets/images/dalbello.png";
import head from "@/assets/images/head.png";

import { Link, router } from "expo-router";
import { useState } from "react";
import NewsFlatlist from "@/components/ui/flatlist-news";
import MassFlatList from "@/components/ui/flatlist-massinsole";
import { useDrawerHeader } from "@/components/common/drawer-header";
import { TwoDAccordian } from "@/components/common/2d-accordian";
import { Marquee } from "@animatereactnative/marquee";
import { AutoImage } from "@/components/ui/auto-image";

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
                        <Link href={"/(scan-upload)/while-scan-upload"}>
                            <Typography className=" text-foreground underline text-sm leading-6">
                                {isGerman()
                                    ? "Konfiguriere deine Einlage"
                                    : "Configura il tuo deposito"}
                            </Typography>
                        </Link>
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
                        <Link href={"/(scan-upload)/while-scan-upload"}>
                            <Typography className="underline  text-white font-light text-[12px]">
                                {isGerman()
                                    ? `Jetzt testen und selbst überzeugen.`
                                    : `Provalo ora e verifica tu stesso.`}
                            </Typography>
                        </Link>
                    </View>
                </View>

                <View
                    style={{
                        marginTop: 28,
                    }}
                >
                    {
                        // <Typography
                        //     className="text-center mb-2 text-muted-foreground"
                        //     variant="titleSecondary"
                        // >
                        //     OUR PARTNERS
                        // </Typography>
                    }

                    <View className="bg-[#333340]/40 items-center justify-between py-4 flex-row px-4">
                        <View className="items-center">
                            <Typography className="font-bold text-xl">OUR</Typography>
                            <Typography className="font-bold text-xl">PARTNERS</Typography>
                        </View>
                        <PARTNER1 />
                        <PARTNER2 />
                    </View>

                    {
                        // <Marquee spacing={0} speed={0.6} withGesture={false}>
                        //     <View
                        //         className="bg-black flex-row py-4 opacity-40"
                        //         style={{
                        //             gap: 30,
                        //         }}
                        //     >
                        //         <AutoImage source={k2} height={40} />
                        //         <AutoImage source={dalbello} height={40} />
                        //         <AutoImage source={head} height={40} />
                        //     </View>
                        // </Marquee>
                    }
                </View>

                <TwoDAccordian />

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
