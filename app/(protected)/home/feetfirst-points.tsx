import SCANNER from "@/assets/svgs/3d-scanner.svg";
import WORLD from "@/assets/svgs/global_white.svg";
import MESSAGE from "@/assets/svgs/message.svg";
import MAN from "@/assets/svgs/profile.svg";
import EMAIL from "@/assets/svgs/sms.svg";
import FOOTSVG from "@/assets/svgs/human_foot_poly_cropped.svg";
import Map from "@/components/common/map";
import { VersionInfo } from "@/components/common/version";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { BlurView } from "expo-blur";
import { TextInput, useWindowDimensions, View } from "react-native";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { useDrawerHeader } from "@/components/common/drawer-header";
import { OpenWebLink } from "@/lib/web-link";
import { ContactUsBody } from "@/type/contact-us";
import { useContactUs } from "@/lib/queries/contact-us";
import { ApiError } from "@/lib/fetcher";
import { useAuthStore } from "@/store/auth";

export default function Screen() {
    const { isGerman } = useLanguageStore();
    const { width } = useWindowDimensions();
    const [scanner_height, setScannerHeight] = useState(0);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [form, setForm] = useState<ContactUsBody>({
        email: "",
        message: "",
        name: "",
        subject: "",
    });

    const { mutate, isPending } = useContactUs();
    const { user } = useAuthStore();

    function handleForm(key: keyof ContactUsBody, value: string) {
        setErrors((prev) => {
            const n = { ...prev };
            delete n[key];
            return n;
        });
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    }

    function handleSubmit() {
        mutate(
            { ...form, email: user?.email ?? "" },
            {
                onSuccess() {
                    setForm({
                        email: "me@gmail.com",
                        message: "",
                        name: "",
                        subject: "",
                    });
                },
                onError(e) {
                    if (e instanceof ApiError) {
                        if (e.data) {
                            setErrors(e.data);
                        } else {
                            setErrors({ non_field_errors: ["Failed to send your message"] });
                        }
                    }
                },
            },
        );
    }

    const { HeaderComponent, onScroll, height } = useDrawerHeader({
        threeshold: 100,
    });

    return (
        <View className="flex-1">
            {HeaderComponent}
            <Layout
                scrollable
                avoidKeyboard
                avoidTabbar
                className="bg-backgroundDark"
                noPadding
                onScroll={onScroll}
                style={{ marginTop: -height - 20 }}
            >
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
                            onPress={() => OpenWebLink("https://feetf1rst.com/")}
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

                <View className="p-3 gap-2 items-start">
                    <Typography variant="title" className="text-white">
                        {isGerman()
                            ? "Scanevents in Ihrer Stadt"
                            : "Scansiona gli eventi nella tua città"}
                    </Typography>
                    <Input
                        Icon={MAN}
                        placeholder={isGerman() ? "Namen" : "nomi"}
                        onChangeText={(t) => handleForm("name", t)}
                        value={form.name}
                    />

                    {errors.name && (
                        <Typography variant="error">{errors.name[0]}</Typography>
                    )}

                    <Input
                        editable={false}
                        defaultValue="info@feetf1rst.com"
                        Icon={EMAIL}
                        placeholder={isGerman() ? "E-Mail" : "Email"}
                    />

                    <Input
                        Icon={WORLD}
                        value={form.subject}
                        placeholder={
                            isGerman() ? "Ihre gewünschte Stadt" : "La tua città desiderata"
                        }
                        onChangeText={(t) => handleForm("subject", t)}
                    />

                    {errors.subject && (
                        <Typography variant="error">{errors.subject[0]}</Typography>
                    )}

                    <View className="bg-muted-background rounded-lg overflow-hidden p-4 flex-row items-start gap-2">
                        <View className="pr-2 border-r-2 border-muted-foreground py-0">
                            <MESSAGE width={22} height={22} />
                        </View>
                        <TextInput
                            value={form.message}
                            onChangeText={(t) => handleForm("message", t)}
                            multiline
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

                    {errors.message && (
                        <Typography variant="error">{errors.message[0]}</Typography>
                    )}

                    {errors.non_field_errors && (
                        <Typography variant="error">
                            {errors.non_field_errors[0]}
                        </Typography>
                    )}

                    <Button
                        variant="big"
                        isLoading={isPending}
                        className="bg-primary/20 border-primary border-2 mb-4"
                        textClassName="text-primary"
                        onPress={handleSubmit}
                    >
                        SEND
                    </Button>
                </View>
                <VersionInfo />
            </Layout>
        </View>
    );
}
