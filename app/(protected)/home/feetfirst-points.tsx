import SCANNER from "@/assets/svgs/3d-scanner.svg";
import WORLD from "@/assets/svgs/global_white.svg";
import MESSAGE from "@/assets/svgs/message.svg";
import MAN from "@/assets/svgs/profile.svg";
import EMAIL from "@/assets/svgs/sms.svg";
import FOOTSVG from "@/assets/svgs/human_foot_poly_cropped.svg";
import Map from "@/components/common/map";
import { VersionInfo } from "@/components/common/version";
import { Layout } from "@/components/layout/layout";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { BlurView } from "expo-blur";
import { TextInput, useWindowDimensions, View } from "react-native";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Screen() {

    const { isGerman } = useLanguageStore();
    const { width } = useWindowDimensions();
    const [scanner_height, setScannerHeight] = useState(0);
    return (
        <Layout className="flex-1 bg-backgroundDark" scrollable noPadding >
            <Map />


            <View className="p-3 mt-12 gap-4">
                <Typography variant="title" className="text-foreground">
                    {isGerman() ? "FeetFirst-Scanstandorte" : "FeetFirst-Scanstandorte"}
                </Typography>

                <Typography className="text-foreground">
                    {isGerman()
                        ? "Besuche unsere Partner, erlebe FeetFirst hautnah und lege die Grundlage für deine persönliche Erfahrung in der App"
                        : "Visita i nostri partner, sperimenta FeetFirst in prima persona e getta le basi per la tua esperienza personale nell'app."}
                </Typography>
            </View>

            <View className="flex-1 my-12">
                <FOOTSVG />
                <BlurView
                    intensity={90}
                    tint="dark"
                    experimentalBlurMethod="dimezisBlurView"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 p-2 rounded-2xl -translate-y-1/2"
                    style={{
                        width: width * 0.85,
                    }}
                >
                    <Typography variant="body" className="text-center">
                        {isGerman()
                            ? "Unsere modernste 3D-Technologie erfasst in wenigen Sekunden jeden Aspekt Ihres Fußes von Form und Länge bis hin zu Fehlstellungen und Druckpunkten"
                            : "La nostra tecnologia 3D all'avanguardia cattura ogni aspetto del tuo piede in pochi secondi, dalla forma e lunghezza ai disallineamenti e punti di pressione"}
                    </Typography>
                </BlurView>
            </View>

            <View className="p-3 gap-4">
                <Typography variant="title" className="text-white">
                    {isGerman()
                        ? "FeetFirst Gruppenbuchung -Wir Kommen Zu Ihnen"
                        : "Prenotazione di gruppo FeetFirst - Veniamo da te"}
                </Typography>
                <View
                    style={{
                        height: scanner_height,
                    }}
                    className="items-start gap-4"
                >
                    <Typography variant="titleSecondary">
                        {isGerman()
                            ? "FeetFirst Gruppenbuchung -Wir Kommen Zu Ihnen"
                            : "Prenotazione di gruppo FeetFirst - Veniamo da te"}
                    </Typography>

                    <Button
                        variant="ghost"
                        className="bg-primary/50 border-primary border-2 mb-4"
                        textClassName="text-white"
                    >
                        {isGerman() ? "Mehr erfahren" : "Saperne di più"}
                    </Button>
                    <SCANNER
                        onLayout={(ev) => {
                            setScannerHeight(ev.nativeEvent.layout.height);
                        }}
                        width={width * 0.8}
                        style={{
                            position: "absolute",
                            right: 10,
                            zIndex: -10,
                        }}
                    />
                </View>
            </View>

            <View className="p-3 gap-4">
                <Typography variant="title" className="text-white">
                    {isGerman()
                        ? "Scanevents in Ihrer Stadt"
                        : "Scansiona gli eventi nella tua città"}
                </Typography>
                <Input Icon={MAN} placeholder={isGerman() ? "Namen" : "nomi"} />

                <Input Icon={EMAIL} placeholder={isGerman() ? "E-Mail" : "Email"} />

                <Input
                    Icon={WORLD}
                    placeholder={
                        isGerman() ? "Ihre gewünschte Stadt" : "La tua città desiderata"
                    }
                />

                <View className="bg-muted-background rounded-lg overflow-hidden p-4 flex-row items-start gap-2">
                    <View className="pr-2 border-r-2 border-muted-foreground py-0">
                        <MESSAGE width={22} height={22} />
                    </View>
                    <TextInput
                        multiline
                        // value={text}
                        // onChangeText={setText}
                        className="text-foreground bg-muted-background flex-1 h-24 placeholder:text-muted-foreground"
                        style={{
                            lineHeight: 22,
                            paddingTop: 0,
                            textAlignVertical: "top",
                        }}
                        placeholder={
                            isGerman()
                                ? "Geben Sie zusätzliche Kommentare ein"
                                : "Inserisci Ulteriori commenti"
                        }
                    />
                </View>

                <Button
                    variant="big"
                    className="bg-primary/20 border-primary border-2 mb-4"
                    textClassName="text-primary"
                >
                    SEND
                </Button>
                <VersionInfo />
            </View>
        </Layout>
    );
}
