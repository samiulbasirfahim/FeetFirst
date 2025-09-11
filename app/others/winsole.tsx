import Image1 from "@/assets/images/winsole-5.png";
import Image2 from "@/assets/images/winsole-2.png";
import Image3 from "@/assets/images/winsole-3.png";
import Image4 from "@/assets/images/winsole-4.png";
import Image5 from "@/assets/images/winsole-1.png";
import { VersionInfo } from "@/components/common/version";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { HeaderBackButton } from "@/components/ui/header-back-button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { BlurView } from "expo-blur";
import Drawer from "expo-router/drawer";
import {
    Image,
    ImageBackground,
    useWindowDimensions,
    View,
} from "react-native";
import { Portal } from "react-native-portalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useDrawerHeader } from "@/components/common/drawer-header";

export const images: Record<number, any> = {
    1: Image1,
    2: Image2,
    3: Image3,
    4: Image4,
    5: Image5,
};

const pagesDE = {
    tittle1: 'IHRE "WINSOLE"CARBON RADSCHUHEINLAGE',
    subtittle1a:
        "Ausgewählte Einlagenhersteller fertigen Ihre speziell angefertigte Winsole.",
    subtittle1b:
        "Steigern Sie Ihre Leistung um bis zu 44W mit diesen patentierten Radeinlagen.",
    buttonText: "JETZT KONFIGURIEREN",
    imageText:
        "FEETFIRST X WINSOLE FÜR EINE EINZIGARTIGE VERIUNDUNG ZWISCHEN FUSS UND SCHUH",
    tittle2: "Maximale Power auf dem Rad",
    subtittle2a:
        "Jeder Fuß ist einzigartig - je besser der Radschuh mit dem Fuß verbunden ist, desto effizienter wird die Kraftübertragung auf die Pedale. Mit dem FeetFirst Shoe Finder und den individuell angepassten Winsole Einlagen bist du auf Profi-Niveau.",
    button2: "Jetzt testen!",

    benefits: [
        "Bemerkbar weniger Ermüdung",
        "Geringes Gewicht mit unter 50 Gramm",
        "Verletzungsvorbeugung und schonende Entlastung der Laufmuskulatur",
        "Mehr Leistung durch direkte Kraftübertragung und gleichmäßigen Druckverlauf",
        "Entlastung und Stabilisierung von Knie-, Sprung- und Vorfuß",
    ],
};

const pagesIT = {
    tittle1: "LA TUA SOTTOPIEDE PER SCARPE DA CICLISMO WINSOLE CARBON",
    subtittle1a:
        "I produttori di solette selezionati realizzano le tue Winsole personalizzate.",
    subtittle1b:
        "Aumenta la tua potenza fino a 44 W con questi inserti ruota brevettati.",
    buttonText: "CONFIGURA ORA",
    imageText: "FEETFIRST X WINSOLE PER UNA CONNESSIONE UNICA TRA PIEDE E SCARPA",
    tittle2: "Massima potenza sulla bici",
    subtittle2a:
        "Ogni piede è unico: più la scarpa da ciclismo si adatta al piede, più efficiente sarà il trasferimento di potenza ai pedali. Con il FeetFirst Shoe Finder e le solette Winsole personalizzate, raggiungerai un livello da professionista.",
    button2: "Provalo adesso!",

    benefits: [
        "Meno affaticamento percepibile",
        "Peso ridotto sotto i 50 grammi",
        "Prevenzione degli infortuni e sollievo delicato della muscolatura di corsa",
        "Maggiore potenza grazie al trasferimento diretto della forza e alla distribuzione uniforme della pressione",
        "Sollievo e stabilizzazione di ginocchio, caviglia e avampiede",
    ],
};

export default function Screen() {
    const { height } = useWindowDimensions();
    const { isGerman } = useLanguageStore();

    const { top } = useSafeAreaInsets();

    const texts = isGerman() ? pagesDE : pagesIT;


    const {
        HeaderComponent,
        onScroll,
        height: h_heihgt
    } = useDrawerHeader({
        threeshold: 100,
        shouldGoBack: true
    })

    return (
        <>
            <Drawer.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View className="flex-1">


                {HeaderComponent}

                <Layout onScroll={onScroll} noPadding scrollable avoidTabbar className="bg-backgroundDark" style={{
                    marginTop: - h_heihgt - 20,
                }}>
                    {/* <Portal>
                        <View
                            style={{
                                top: top + 10,
                                left: 10,
                                position: "absolute",
                                zIndex: 20,
                                overflow: "hidden",
                            }}
                            className="flex items-center justify-center rounded-full"
                        >
                            <BlurView className="flex-1 px-3" tint="light" intensity={30}>
                                <HeaderBackButton />
                            </BlurView>
                        </View>
                    </Portal> */}

                    <ImageBackground
                        source={require("@/assets/images/winsole.jpg")}
                        style={{
                            height: height * 0.4 + h_heihgt,
                            width: "100%",
                        }}
                    >
                        <View className="absolute inset-0 bg-backgroundDark/70 items-center justify-center">
                            <Typography variant="title" className="text-foreground text-center">
                                {texts.tittle1}
                            </Typography>
                        </View>
                    </ImageBackground>

                    <View className="py-4 gap-4 p-3">
                        <Typography variant="body" className="text-center">
                            {texts.subtittle1a}
                        </Typography>
                        <Typography variant="subtitle" className="text-white text-center">
                            {texts.subtittle1b}
                        </Typography>

                        <Button
                            variant="big"
                            textClassName="text-white"
                            className="border-white bg-transparent border-2"
                            onPress={() => router.push("/(scan-upload)/while-scan-upload")}
                        >
                            {texts.buttonText}
                        </Button>

                        <ImageBackground
                            resizeMode="cover"
                            source={require("@/assets/images/winsol-bottom.jpg")}
                            className="p-2 items-center justify-end"
                            style={{
                                height: height * 0.4,
                            }}
                        >
                            <Typography className="bg-backgroundDark p-1 text-center">
                                {texts.imageText}
                            </Typography>
                        </ImageBackground>
                        <Typography variant="title" className="text-foreground">
                            {texts.tittle2}
                        </Typography>
                        <Typography>{texts.subtittle2a}</Typography>

                        <View className="flex-row">
                            <Button
                                variant="ghost"
                                className="p-0"
                                textClassName="underline text-white underline-offset-4 text-xl"
                            >
                                {texts.button2}
                            </Button>
                        </View>

                        <View className="gap-4">
                            {texts.benefits.map((benifit, index) => {
                                return (
                                    <View key={index} className="flex-row items-center">
                                        <Image source={images[index + 1]} className="w-20 h-20" />
                                        <View className="flex-grow-0 shrink px-2">
                                            <Typography>{benifit}</Typography>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>

                        <VersionInfo />
                    </View>
                </Layout>
            </View>
        </>
    );
}
