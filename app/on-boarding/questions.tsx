import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import CheckBox from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, View } from "react-native";

const optionsIT: string[] = [
    "Attraverso i social media (Instagram, Facebook, ecc.)",
    "In un negozio partner",
    "Durante uno scan event",
    "Passaparola (consiglio di un amico o conoscente)",
    "Altro",
];

const optionsDE: string[] = [
    "Über soziale Medien (Instagram, Facebook usw.)",
    "In einem Partnergeschäft",
    "Bei einem Scan-Event",
    "Mundpropaganda (Empfehlung eines Freundes oder Bekannten)",
    "Andere",
];

export default function Screen() {
    const { isGerman } = useLanguageStore();

    const [checkedIndex, setCheckedIndex] = useState<number[]>([]);

    function toggleCheck(index: number) {

        if (checkedIndex.includes(index)) {
            return setCheckedIndex(checkedIndex.filter((i) => i !== index))
        }
        setCheckedIndex(prev => [...prev, index])
    }

    return (
        <Layout className="justify-between">
            <View>
                <Typography variant="title" className="text-foreground">
                    {isGerman()
                        ? "Wie haben Sie FeetF1rst entdeckt?"
                        : "Come ha scoperto FeetF1rst?"}
                </Typography>
                <FlatList
                    className="mt-8"
                    data={isGerman() ? optionsDE : optionsIT}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className="h-[15px]"></View>}
                    renderItem={({ item, index }) => (
                        <Pressable onPress={() => toggleCheck(index)} className="bg-muted-background py-4 ps-4 rounded-lg">
                            <View className="flex-row justify-between items-center">
                                <Typography className="flex-1 text-lg">{item}</Typography>
                                <CheckBox
                                    onPress={() => toggleCheck(index)}
                                    unFillColor="#303231"
                                    innerIconStyle={{
                                        borderWidth: 1,
                                        borderColor: "#585C5B",
                                        borderRadius: 6,
                                    }}
                                    fillColor="#62A07B"
                                    isChecked={checkedIndex.includes(index)}
                                    iconStyle={{
                                        borderRadius: 6,
                                    }}
                                />
                            </View>
                        </Pressable>
                    )}
                />
            </View>

            <Link asChild href={"/on-boarding/gender"}>
                <Button variant="big">{isGerman() ? "nächste" : "prossima"}</Button>
            </Link>
        </Layout>
    );
}
