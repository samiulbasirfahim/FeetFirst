import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link, router } from "expo-router";
import {
    Image,
    View,
    ImageBackground,
    Pressable,
    useWindowDimensions,
} from "react-native";
import Herobg from "@/assets/svgs/hero_bg.svg";
import Herofeet from "@/assets/images/hero_feet.png";
import Herodot from "@/assets/svgs/hero_dot.svg";
import HomeCarausel from "@/components/ui/carousel-home";
import HomeCarauselSecond from "@/components/ui/carousel-home-second";
import HomeFlatList from "@/components/ui/flatlist-home";
import { VersionInfo } from "@/components/common/version";
import NewsFlatlist from "@/components/ui/flatlist-news";
import { useDrawerHeader } from "@/components/common/drawer-header";
import { TwoDAccordian } from "@/components/common/2d-accordian";
import { useAuthStore } from "@/store/auth";
import { useTopProducts } from "@/lib/queries/products";
import { useEffect, useState } from "react";
import { ShoeItem } from "@/type/product";

export default function Screen() {
    const { user } = useAuthStore();
    const { isGerman } = useLanguageStore();
    const { width: dm_width } = useWindowDimensions();
    const { HeaderComponent, onScroll, height } = useDrawerHeader({
        threeshold: 100,
    });
    const { data, isPending } = useTopProducts(10);
    const [shoes, setShoes] = useState<ShoeItem[]>([]);
    useEffect(() => {
        if (isPending || !(data as any).results) return;
        const shoes_tmp: ShoeItem[] = (data as any).results.map((item) => ({
            itemName: item.name,
            brandName: "Nike",
            brandLogo: null,
            price: `$${item.price}`,
            image: item.image,
        }));
        setShoes(shoes_tmp);
    }, [data, isPending]);

    return (
        <View className="flex-1">
            {HeaderComponent}
            <Layout
                style={{
                    marginTop: -height - 20,
                }}
                className="bg-backgroundDark"
                scrollable
                noPadding
                avoidTabbar
                onScroll={onScroll}
            >
                <View
                    className="bg-background px-3 pb-7 rounded-b-[30px] mb-7"
                    style={{
                        paddingTop: height + 20,
                    }}
                >
                    <View className="mb-3">
                        <Typography
                            variant="title"
                            className=" text-foreground text-[30px] font-medium"
                        >
                            {isGerman() ? "Willkommen" : "Benvenuto"}
                        </Typography>
                        <Typography
                            variant="title"
                            className="font-medium text-foreground text-[30px]"
                        >
                            {user?.name.split(" ")[0] ?? ""}!
                        </Typography>
                    </View>

                    <View className="w-[68%]">
                        <View className="flex flex-row gap-2 w-full mb-3">
                            <Button
                                variant="outline"
                                textClassName="text-white font-normal text-sm"
                                className="border-white/15 rounded-full bg-white/10 flex-1 justify-center z-10"
                                style={{
                                    zIndex: 99,
                                }}
                                onPress={() => router.push("/home/mass-insoles")}
                            >
                                {isGerman() ? "Masseinlage" : "Plantare"}
                            </Button>
                            <Button
                                variant="outline"
                                onPress={() => router.push("/home/foot-exercise")}
                                textClassName="text-white font-normal text-sm"
                                style={{
                                    zIndex: 99,
                                }}
                                className="border-white/15 rounded-full bg-white/10 flex-1 justify-center"
                            >
                                {isGerman() ? "Fussübungen" : "Esercizi piedi"}
                            </Button>
                        </View>
                        <View className="">
                            <Button
                                onPress={() => router.push("/home/foot-exercise")}
                                variant="outline"
                                textClassName=" text-base"
                                className="border-primary rounded-[12px] bg-primary/15 py-3"
                            >
                                {isGerman()
                                    ? "Dein perfekter Schuh"
                                    : "Esercizi per i piedi"}
                            </Button>
                        </View>
                    </View>
                    <View
                        style={{
                            position: "absolute",
                            top: height - 10,
                            left: dm_width > 400 ? 40 : 10,
                        }}
                        pointerEvents="none"
                    >
                        <View className="absolute left-[211px] -top-[45px]">
                            <Herobg height={300} width={300} />
                        </View>
                        <View className="absolute left-[178px] -top-[10px]">
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
                        <Link href={"/(protected)/shoe-recommendations"}>
                            <Typography className="underline  text-white font-light text-[12px]">
                                {isGerman()
                                    ? `Jetzt testen und selbst überzeugen.`
                                    : `Provalo ora e verifica tu stesso.`}
                            </Typography>
                        </Link>
                    </View>
                </View>

                {shoes.length > 0 && (
                    <View className="mb-10">
                        <View className="px-5 pb-7">
                            <Typography className="text-[22px] font-medium text-foreground">
                                {isGerman()
                                    ? "Schuhfinder FeetF1rst"
                                    : "Shoe Finder FeetF1rst"}
                            </Typography>
                        </View>
                        <View>{<HomeCarausel shoes={shoes} />}</View>
                        <View className="w-[60%] mt-5 ml-6">
                            <Button
                                onPress={() => {
                                    router.push({
                                        pathname: "/(protected)/shoe-recommendations",
                                    });
                                }}
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
                )}

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
                        <Link href={"/(protected)/home/mass-insoles"}>
                            <Typography className="underline  text-white  text-base">
                                {isGerman() ? `Mehr erfahren.` : `Saperne di più.`}
                            </Typography>
                        </Link>
                    </View>
                </View>

                {/* Sole Details */}
                <TwoDAccordian />

                {/* 2nd Carousel   */}
                {shoes.length > 0 && (
                    <View className="mb-10 -mt-[100px]">
                        <View className="px-7 pb-3">
                            <Typography className="text-[22px] font-medium text-foreground mb-5">
                                {isGerman()
                                    ? "Vorschläge Für Dich"
                                    : "Suggerimenti per te"}
                            </Typography>
                            <Typography className="text-base font-light leading-[18px] text-white">
                                {isGerman()
                                    ? "Passgenau für dich. Maximaler Komfort – basierend auf deinem 3D-Scan und deinen Bedürfnissen."
                                    : "Su misura per te. Massimo comfort – basato sulla tua scansione 3D e le tue esigenze."}
                            </Typography>
                        </View>
                        <View>
                            <HomeCarauselSecond shoes={shoes} />
                        </View>
                        <View className="w-[40%] mt-4 ml-9">
                            <Button
                                onPress={() => {
                                    router.push({
                                        pathname: "/shoe-recommendations",
                                        params: {
                                            category: "sports",
                                            redirect: "/shoe-recommendations/subcategory",
                                            redirectId: Math.random().toString(),
                                        },
                                    });
                                }}
                                variant="outline"
                                textClassName=" text-base font-medium"
                                className="border-primary rounded-[12px] bg-primary/15 py-[10px]  font-medium"
                            >
                                {isGerman() ? "Zur Kategorie" : "Alla categoria"}
                            </Button>
                        </View>
                    </View>
                )}

                {/* Last Carousel   */}
                <View>
                    <HomeFlatList />
                </View>

                {/* Plan Info */}
                <View className="mt-20 mb-10 w-[90%] mx-auto">
                    <View className="mb-5">
                        <Typography className="text-lg font-medium  text-center">
                            {isGerman()
                                ? "Gezieltes Training für deine Füße"
                                : "Allenamento mirato per i tuoi piedi"}
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
                                <Pressable
                                    onPress={() =>
                                        router.push("/(protected)/home/foot-exercise/flexibility")
                                    }
                                    className="px-4 py-5 flex-col gap-2"
                                >
                                    <View className="flex-row justify-between ">
                                        <Typography className="text-base font-medium text-[#C3C3C3]">
                                            {isGerman() ? "Basic Plan" : "Piano Base"}
                                        </Typography>
                                        <Typography className="text-base font-medium text-white">
                                            {isGerman() ? "Kostenlos" : "Gratis"}
                                        </Typography>
                                    </View>
                                    <View className="px-1">
                                        <Typography className="text-[12px] text-white">
                                            {" "}
                                            {`\u2022`} {isGerman()
                                                ? "Einfache Übungen für mehr Stabilität, Flexibilität & mehr"
                                                : "Esercizi semplici per maggiore stabilità, flessibilità e altro"}
                                        </Typography>
                                        <Typography className="text-[12px] text-white">
                                            {" "}
                                            {`\u2022`} {isGerman()
                                                ? "Ideal zur Vorbeugung von Fussfehlstellungen"
                                                : "Ideale per prevenire deformazioni del piede"}
                                        </Typography>
                                        <Typography className="text-[12px] text-white">
                                            {" "}
                                            {`\u2022`} {isGerman()
                                                ? "Stärkung der Fuß- und Beinmuskulatur"
                                                : "Rinforzo dei muscoli di piedi e gambe"}
                                        </Typography>
                                    </View>
                                </Pressable>
                            </ImageBackground>
                        </View>

                        <Pressable className="flex-col relative border-primary/60 border rounded-3xl overflow-hidden">
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
                                            {isGerman() ? "Pro Plan" : "Piano Pro"}
                                        </Typography>
                                        <Typography className="text-lg font-medium text-primary">
                                            {isGerman() ? "4,99€" : "4,99€"}
                                        </Typography>
                                    </View>
                                    <View className="px-1 ">
                                        <Typography className="text-[12px] text-white leading-6">
                                            {" "}
                                            {`\u2022`} {isGerman()
                                                ? "Gezielte Übungen basierend auf deinen Antworten"
                                                : "Esercizi mirati basati sulle tue risposte"}
                                        </Typography>
                                        <Typography className="text-[12px] text-white leading-6">
                                            {" "}
                                            {`\u2022`} {isGerman()
                                                ? "Individuelle Trainingspläne für deine Fußbedürfnisse"
                                                : "Piani di allenamento personalizzati per le tue esigenze"}
                                        </Typography>
                                        <Typography className="text-[12px] text-white leading-6">
                                            {" "}
                                            {`\u2022`} {isGerman()
                                                ? "Fortschrittsanalyse und Anpassung der Übungen"
                                                : "Analisi dei progressi e adattamento degli esercizi"}
                                        </Typography>
                                    </View>
                                </View>
                            </ImageBackground>
                        </Pressable>
                        <View className="flex-row justify-between items-center border border-primary/20 py-4 px-6 bg-background rounded-3xl">
                            <Typography className="w-1/2 text-base text-[#C3C3C3] leading-[18px]">
                                {isGerman()
                                    ? "Personalisiertes Lauftraining"
                                    : "Allenamento di corsa personalizzato"}
                            </Typography>
                            <Typography className="text-xl text-primary">
                                {isGerman() ? "Kommt bald" : "In arrivo"}
                            </Typography>
                        </View>
                    </View>
                </View>

                <View>
                    <NewsFlatlist />
                </View>

                <VersionInfo />
            </Layout>
        </View>
    );
}
