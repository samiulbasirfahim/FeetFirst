import { Button } from "@/components/ui/button";
import CheckBox from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    TextInput,
    View,
} from "react-native";

const optionsIT: string[] = [
    "Salute generale del piede",
    "Corsa",
    "Ciclismo",
    "Sport Invernali",
    "Calcio",
    "Lifestyle",
    "Golf",
    "Fitness / Yoga",
    "Escursionismo",
];

const optionsDE: string[] = [
    "Allgemeine Fußgesundheit",
    "Laufsport",
    "Radsport",
    "Bergsport",
    "Wintersport",
    "Fußball",
    "Lifestyle",
    "Golf",
    "Fitness / Yoga",
];

export default function Screen() {
    const { isGerman } = useLanguageStore();

    const [checkedValues, setCheckedValues] = useState<string[]>([]);
    const [customOptions, setCustomOptions] = useState<string[]>([]);
    const [showOtherInput, setShowOtherInput] = useState(false);
    const [otherValue, setOtherValue] = useState("");

    function toggleCheck(value: string) {
        if (checkedValues.includes(value)) {
            return setCheckedValues(checkedValues.filter((v) => v !== value));
        }
        setCheckedValues((prev) => [...prev, value]);
    }

    const baseOptions = isGerman() ? optionsDE : optionsIT;
    const data = [...baseOptions, ...customOptions];

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "padding"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 100}
            className="flex-1 p-6 bg-background"
        >
            <View style={{ flex: 1 }}>
                <Typography variant="title" className="text-foreground">
                    {isGerman()
                        ? "Wofür interessieren Sie sich besonders?"
                        : "A cosa sei particolarmente interessato/a?"}
                </Typography>

                <FlatList
                    style={{ marginTop: 16, flex: 1 }}
                    data={data}
                    keyExtractor={(item, idx) => `${item}-${idx}`}
                    showsVerticalScrollIndicator={true}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps={"always"}
                    ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => toggleCheck(item)}
                            style={{
                                backgroundColor: "#2C2C2D",
                                paddingVertical: 16,
                                paddingHorizontal: 16,
                                borderRadius: 8,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: 4,
                                }}
                            >
                                <Typography className="flex-1 text-lg">{item}</Typography>
                                <CheckBox
                                    onPress={() => toggleCheck(item)}
                                    unFillColor="#303231"
                                    innerIconStyle={{
                                        borderWidth: 1,
                                        borderColor: "#585C5B",
                                        borderRadius: 6,
                                    }}
                                    fillColor="#62A07B"
                                    isChecked={checkedValues.includes(item)}
                                    iconStyle={{
                                        borderRadius: 6,
                                    }}
                                />
                            </View>
                        </Pressable>
                    )}
                    ListFooterComponent={
                        <View style={{ marginTop: 16, marginBottom: 16 }}>
                            {!showOtherInput ? (
                                <Pressable
                                    onPress={() => setShowOtherInput(true)}
                                    style={{
                                        backgroundColor: "#2C2C2D",
                                        paddingVertical: 16,
                                        paddingHorizontal: 16,
                                        borderRadius: 8,
                                    }}
                                >
                                    <Typography className="flex-1 text-lg">
                                        {isGerman()
                                            ? "Sonstiges (bitte angeben)"
                                            : "Altro (specificare)"}
                                    </Typography>
                                </Pressable>
                            ) : (
                                <TextInput
                                    autoFocus
                                    placeholder={
                                        isGerman() ? "Bitte angeben..." : "Specifica qui..."
                                    }
                                    style={{
                                        backgroundColor: "#2C2C2D",
                                        paddingVertical: 16,
                                        paddingHorizontal: 16,
                                        borderRadius: 8,
                                        fontSize: 16,
                                        color: "#FFFFFF",
                                    }}
                                    value={otherValue}
                                    onChangeText={setOtherValue}
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => {
                                        const trimmed = otherValue.trim();
                                        if (trimmed.length > 0) {
                                            setCustomOptions((prev) => [...prev, trimmed]);
                                            setCheckedValues((prev) => [...prev, trimmed]);
                                        }
                                        setShowOtherInput(false);
                                        setOtherValue("");
                                    }}
                                />
                            )}
                        </View>
                    }
                />
            </View>

            {/* Button pinned at bottom */}
            <Link asChild href={"/on-boarding/gender"}>
                <Button variant="big">{isGerman() ? "nächste" : "prossima"}</Button>
            </Link>
        </KeyboardAvoidingView>
    );
}
