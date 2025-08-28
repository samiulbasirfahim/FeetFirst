import MESSAGE from "@/assets/svgs/message.svg";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/language";
import { ReactNode, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";

export default function Screen() {
    const { isGerman } = useLanguageStore();
    const [selected_option, set_selected_option] = useState<string>("");
    const [show_input, set_show_input] = useState<boolean>(false);

    console.log(selected_option);
    return (
        <View className="flex-1 bg-backgroundDark p-4">
            <ScrollView
                contentContainerClassName="grow gap-4"
                className="flex-1 bg-backgroundDark"
                showsVerticalScrollIndicator={false}
            >
                <CustomButton
                    onSelect={(title) => {
                        set_show_input(false);
                        set_selected_option(title);
                    }}
                    selected_option={selected_option}
                >
                    {isGerman()
                        ? "Ich verwende ein anderes Konto"
                        : "Sto usando un account diverso"}
                </CustomButton>

                <CustomButton
                    onSelect={(title) => {
                        set_show_input(false);
                        set_selected_option(title);
                    }}
                    selected_option={selected_option}
                >
                    {isGerman()
                        ? "Die App funktioniert nicht richtig"
                        : "L'app non funziona correttamente"}
                </CustomButton>
                <CustomButton
                    onSelect={(title) => {
                        set_show_input(false);
                        set_selected_option(title);
                    }}
                    selected_option={selected_option}
                >
                    {isGerman()
                        ? "Ich mache mir Sorgen um meine Privatsphäre"
                        : "Sono preoccupato per la mia privacy"}
                </CustomButton>
                <CustomButton
                    onSelect={(title) => {
                        set_show_input(false);
                        set_selected_option(title);
                    }}
                    selected_option={selected_option}
                >
                    {isGerman() ? "Niemand antwortet" : "Nessuno risponde"}
                </CustomButton>

                <CustomButton
                    onSelect={() => {
                        set_selected_option("");
                        set_show_input(true);
                    }}
                    selected_option={selected_option}
                >
                    {isGerman() ? "Andere" : "Altro"}
                </CustomButton>

                {show_input && (
                    <View className="bg-muted-background rounded-lg overflow-hidden p-4 flex-row items-start gap-2">
                        <View className="pr-2 border-r-2 border-muted-foreground py-0">
                            <MESSAGE width={22} height={22} />
                        </View>
                        <TextInput
                            multiline
                            value={selected_option ?? ""}
                            onChangeText={set_selected_option}
                            className="text-foreground bg-muted-background flex-1 h-52"
                            style={{
                                lineHeight: 22,
                                paddingTop: 0,
                                textAlignVertical: "top",
                            }}
                        />
                    </View>
                )}
            </ScrollView>
            <Button disabled={selected_option.length < 1} variant="big" className={`items-center justify-center ${selected_option.length > 0 ? 'bg-primary' : 'bg-muted-background'}`} textClassName="text-center">ELIMINA IL MIO ACCOUNT</Button>
        </View >
    );
}

function CustomButton({
    children,
    onSelect,
    selected_option,
}: {
    selected_option: string;
    children: ReactNode;
    onSelect: (title: string) => void;
}) {
    return (
        <Button
            variant="profile_menu"
            className={`items-center justify-center ${selected_option === (children as string) ? "border-primary" : ""}`}
            onPress={() => onSelect(children as string)}
            textClassName={`text-foreground text-center ${selected_option === (children as string) ? "text-primary" : ""}`}
        >
            {children}
        </Button>
    );
}
