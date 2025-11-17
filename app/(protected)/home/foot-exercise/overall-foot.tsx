import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import {
    Image,
    Text,
    TouchableWithoutFeedback,
    useWindowDimensions,
    View,
} from "react-native";
import woman from "@/assets/images/woman-upside-down.png";
import { Button } from "@/components/ui/button";
import MyCarousel from "@/components/ui/MyCarousel";
import { VersionInfo } from "@/components/common/version";
import ManAboutTORun from "@/assets/images/man-about-to-run.png";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { useDrawerHeader } from "@/components/common/drawer-header";
import { router } from "expo-router";
import { ExerciseAccordion } from "@/components/ui/exercise-accordian";
import {
    germanOverallFootSections,
    italianOverallFootSections,
} from "@/lib/exercise-accordian-data";

export default function Screen() {
    const { height: heightOfWindow } = useWindowDimensions();
    const { isGerman } = useLanguageStore();
    const [womanDiv, setWomanDiv] = useState(0);

    const { onScroll, HeaderComponent, height } = useDrawerHeader({
        threeshold: 100,
        shouldGoBack: true,
    });

    const sections = isGerman()
        ? germanOverallFootSections
        : italianOverallFootSections;

    return (
        <View className="flex-1">
            {HeaderComponent}
            <Layout
                scrollable
                className="bg-[#000000]"
                onScroll={onScroll}
                noPadding
                avoidTabbar
                style={{
                    marginTop: -height - 20,
                }}
            >
                <View style={{ height: height + 20 }}></View>
                <View className="relative  overflow-hidden">
                    <Typography className="absolute z-[999] font-poppinsBold text-[24px] text-white text-center  my-4 leading-tight px-3">
                        {isGerman()
                            ? "Allgemeine Übungen für die gesamte Fussgesundheit"
                            : "Esercizi generali per la salute generale del piede"}
                    </Typography>
                    <View
                        className="w-full"
                        style={{
                            height: heightOfWindow * 0.5,
                        }}
                        onLayout={(e) => {
                            setWomanDiv(e.nativeEvent.layout.width);
                        }}
                    >
                        <LinearGradient
                            colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                zIndex: 99,
                            }}
                            pointerEvents="none"
                        />

                        <LinearGradient
                            pointerEvents="none"
                            colors={[
                                "transparent",
                                "rgba(98, 160, 123, 0.3)",
                                "rgba(98, 160, 123, 0.7)",
                            ]}
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                zIndex: 99,
                            }}
                        />

                        <View className="h-full flex-1 overflow-hidden relative bg-primary items-center justify-end">
                            <Image
                                source={woman}
                                style={{
                                    height: womanDiv * 1.5,
                                    width: "100%",
                                }}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>

                <View className="mt-12 px-3">
                    <Typography className="font-poppinsBold text-[20px] text-white">
                        {isGerman()
                            ? "FeetF1rst - Ihr Partner für Fußgesundheit, bietet jetzt die perfekten Fußübungen."
                            : "FeetF1rst, il tuo partner per la salute dei piedi, ora ti offre gli esercizi perfetti per i piedi."}
                    </Typography>
                    <Text className=" mt-4  font-poppinsRegular text-[14px] text-white">
                        {isGerman()
                            ? "Wählen Sie einfach aus, was Sie erreichen. möchten, sehen Sie sich die Anleitung an und legen Sie los!"
                            : "Scegli semplicemente cosa vuoi ottenere. vuoi, dai un'occhiata alle istruzioni e inizia!"}
                    </Text>
                </View>

                <View className="mt-8">
                    <Typography className="font-poppinsBold text-[24px] text-white mb-4 px-3">
                        {isGerman() ? "Produkte" : "Prodotti"}
                    </Typography>

                    <MyCarousel />
                </View>
                <ExerciseAccordion sections={sections} />
                <View className="pt-8 px-3">
                    <Typography className="text-3xl font-bold w-1/2">
                        {isGerman()
                            ? "Ihr Individueller Übungsplan"
                            : "Il tuo piano di esercizi individuale"}
                    </Typography>
                    <Text className="text-white font-poppinsRegular text-[14px] my-6">
                        {isGerman()
                            ? "Sie können sich jetzt auch Ihren individuellen Übungsplan erstellen lassen – basierend auf Ihrem 3D-Scan, Ihren Fußproblemen und Ihren Zielen."
                            : "Ora puoi anche creare il tuo piano di esercizi personalizzato in base alla scansione 3D, ai problemi del tuo piede e ai tuoi obiettivi."}
                    </Text>

                    <View className="flex-row mb-6">
                        <Button
                            variant="outline"
                            className="bg-primary/10 py-4 rounded-2xl"
                            onPress={() => router.push("/(exercise-questions)/while-loading")}
                        >
                            {isGerman() ? "Jetzt erstellen!" : "Crea ora!"}
                        </Button>
                    </View>

                    <View className="h-96 w-full my-8 px-3">
                        <LinearGradient
                            pointerEvents="none"
                            colors={["rgba(0,0,0,0.1)", "black"]}
                            className="mt-36"
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
                            source={ManAboutTORun}
                            className="w-full h-full"
                            resizeMode="contain"
                        />
                    </View>
                </View>
                <VersionInfo />
            </Layout>
        </View>
    );
}
