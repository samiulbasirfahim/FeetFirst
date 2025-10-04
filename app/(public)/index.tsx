import { Typography } from "@/components/ui/typography";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { TouchableOpacity, View } from "react-native";
import GermanFlag from "@/assets/svgs/germany.svg";
import ItalianFlag from "@/assets/svgs/italy.svg";
import { router, Stack } from "expo-router";
import { useLanguageStore } from "@/store/language";
import React from "react";
import { SvgProps } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";

export default function Page() {
    const { isGerman } = useLanguageStore();
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView className="flex-1 bg-background">
                <View className="flex-1 justify-between p-6">
                    <View className="items-center">
                        <Typography variant="title">
                            {isGerman() ? "Sprachen" : "Lingue"}
                        </Typography>
                        <Typography variant="subtitle">
                            {isGerman()
                                ? "Wähle eine Sprache, um zu beginnen"
                                : "Seleziona una lingua per iniziare"}
                        </Typography>

                        <View className="gap-4 flex-row mt-16">
                            <LanguageButton
                                Logo={GermanFlag}
                                language="german"
                                title="German"
                            />
                            <LanguageButton
                                Logo={ItalianFlag}
                                language="italian"
                                title="Italian"
                            />
                        </View>
                    </View>

                    <Button variant="big" onPress={() => router.push("/welcome")}>
                        {isGerman() ? "Fortfahren" : "Continuare"}
                    </Button>
                </View>
            </SafeAreaView>
        </>
    );
}

type Props = {
    Logo: React.FC<SvgProps>;
    language: "italian" | "german";
    title: string;
};

function LanguageButton({ title, Logo, language: ln }: Props) {
    const { language, setLanguage } = useLanguageStore();
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className="bg-muted-background w-1/2 rounded-xl"
            onPress={() => setLanguage(ln)}
        >
            <BouncyCheckbox
                useBuiltInState={false}
                isChecked={language === ln}
                fillColor="#62A07B"
                iconStyle={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                }}
                innerIconStyle={{
                    borderColor: language === ln ? "#62A07B" : "#585C5B",
                    borderWidth: 2,
                }}
            />
            <View className="p-4 mt-6 gap-4">
                <Logo />
                <Typography
                    variant={language === ln ? "selected" : "muted"}
                    className="text-xl"
                >
                    {title}
                </Typography>
            </View>
        </TouchableOpacity>
    );
}
