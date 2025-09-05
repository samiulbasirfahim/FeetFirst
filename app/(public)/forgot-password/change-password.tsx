import SHIELD from "@/assets/svgs/shield-security.svg";
import SHIELD_CHECK from "@/assets/svgs/shield-check.svg";
import LOCK from "@/assets/svgs/lock.svg";
import { KeyboardAvoidingLayout } from "@/components/layout/keyboard-avoiding-layout";
import { LogoWrapper, LogoWrapperSub } from "@/components/ui/logo";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { InputPassword } from "@/components/ui/input";
import { Modal } from "@/components/common/modal";
import { useState } from "react";
import { View } from "react-native";
import { Layout } from "@/components/layout/layout";

export default function Screen() {
    const { isGerman } = useLanguageStore();
    const [showModal, setShowModal] = useState<boolean>(false);
    return (
        <Layout scrollable avoidKeyboard edges={["bottom"]}>
            <Typography
                variant="title"
                className="text-start text-muted-foreground w-full"
            >
                {isGerman() ? "Ändere dein Passwort" : "Cambia la tua password"}
            </Typography>

            <LogoWrapper Logo={SHIELD} />
            <Typography variant="subtitle" className="text-center text-white">
                {isGerman()
                    ? "Das Passwort muss sich vom vorherigen unterscheiden."
                    : "La password deve essere diversa da quella precedente."}
            </Typography>

            <InputPassword
                Icon={LOCK}
                placeholder={
                    isGerman() ? "Neue Passwort eingeben" : "Inserisci la nuova password"
                }
            />

            <InputPassword
                Icon={LOCK}
                placeholder={
                    isGerman() ? "Neue Passwort bestätigen" : "Conferma la nuova password"
                }
            />

            <Modal
                isOpen={showModal}
                onClickOutside={() => {
                    setShowModal(false);
                    router.dismissAll();
                    router.back();
                }}
            >
                <View className="flex-col items-center justify-center py-10 px-4 gap-6">
                    <LogoWrapperSub Logo={SHIELD_CHECK} />
                    <Typography variant="title" className="text-white">
                        {isGerman() ? "Alles bereit" : "Tutto pronto"}
                    </Typography>

                    <Typography variant="subtitle">
                        {isGerman()
                            ? "Dein Passwort wurde zurückgesetzt."
                            : "La tua password è stata reimpostata."}
                    </Typography>
                    <Button
                        onPress={() => {
                            router.dismissAll();
                            router.back();
                        }}
                        variant="big"
                    >
                        {isGerman() ? "In Ordnung" : "Va bene"}
                    </Button>
                </View>
            </Modal>

            <Button variant="big" onPress={() => setShowModal(true)}>
                {isGerman() ? "Passwort ändern" : "Cambia password"}
            </Button>
        </Layout>
    );
}
