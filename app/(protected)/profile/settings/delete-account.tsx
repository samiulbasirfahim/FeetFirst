import DELETE from "@/assets/svgs/account_delete.svg";
import MESSAGE from "@/assets/svgs/message.svg";
import { Modal } from "@/components/common/modal";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { LogoWrapperSub } from "@/components/ui/logo";
import { Typography } from "@/components/ui/typography";
import { useDeleteUser } from "@/lib/queries/auth";
import { useLanguageStore } from "@/store/language";
import { router } from "expo-router";
import { ReactNode, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";

export default function Screen() {
    const { isGerman } = useLanguageStore();
    const [selected_option, set_selected_option] = useState<string>("");
    const [show_input, set_show_input] = useState<boolean>(false);
    const { mutate: deleteUser, isPending: delete_pending } = useDeleteUser();

    const [show_modal, set_show_modal] = useState<boolean>(false);

    return (
        <Layout className="bg-backgroundDark" avoidKeyboard avoidTabbar scrollable>
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
            <Button
                disabled={selected_option.length < 1}
                onPress={() => set_show_modal(true)}
                variant="big"
                className={`items-center justify-center ${selected_option.length > 0 ? "bg-primary" : "bg-muted-background"}`}
                textClassName="text-center"
            >
                {isGerman() ? "MEIN KONTO LÖSCHEN" : "ELIMINA IL MIO ACCOUNT"}
            </Button>
            <Modal
                isOpen={show_modal}
                onClickOutside={() => {
                    set_show_modal(false);
                }}
            >
                <View className="flex-col items-center justify-center py-10 px-4 gap-6">
                    <LogoWrapperSub Logo={DELETE} />
                    <Typography variant="title" className="text-white">
                        {isGerman() ? "Konto löschen" : "Elimina account"}
                    </Typography>

                    <Typography variant="subtitle" className="w-4/5 text-center">
                        {isGerman()
                            ? "Möchten Sie Ihr Konto wirklich löschen? Dabei gehen alle Ihre Daten verloren und Ihr Konto kann nicht wiederhergestellt werden."
                            : "Sei sicuro di voler eliminare il tuo account? Perderai tutti i tuoi dati e il tuo account non verrà recuperato."}
                    </Typography>

                    <View className="flex-row gap-2">
                        <Button
                            className="bg-transparent border-primary border-2  w-1/2"
                            textClassName="text-primary"
                            variant="big"
                            isLoading={delete_pending}
                            onPress={() =>
                                deleteUser(selected_option ?? "", {
                                    onSuccess: () => {
                                        set_show_modal(false);
                                        router.dismissAll();
                                        router.replace("/(public)");
                                    },
                                    onError(err_) {
                                        console.dir(err_.data);
                                    },
                                })
                            }
                        >
                            {isGerman() ? "Ja" : "si"}
                        </Button>
                        <Button
                            className="bg-transparent border-primary border-2 w-1/2"
                            textClassName="text-primary"
                            variant="big"
                            onPress={() => {
                                set_show_modal(false);
                            }}
                        >
                            {isGerman() ? "NEIN" : "NO"}
                        </Button>
                    </View>
                </View>
            </Modal>
        </Layout>
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
