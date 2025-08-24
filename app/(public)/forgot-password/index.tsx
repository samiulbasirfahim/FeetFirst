import SMS from "@/assets/svgs/sms.svg";
import LOCK from "@/assets/svgs/lock-dot.svg";
import { KeyboardAvoidingLayout } from "@/components/layout/keyboard-avoiding-layout";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { LogoWrapper } from "@/components/ui/logo";
export default function Page() {
    const { isGerman } = useLanguageStore();

    return (
        <KeyboardAvoidingLayout>
            <Typography variant="subtitle" className="text-center text-white">
                {isGerman()
                    ? "Falsches Passwort. Kein Problem! Gib deine E-Mail ein und wir helfen dir, den Zugang wiederherzustellen."
                    : "Password errata. Nessun problema! Inserisci la tua email e ti aiuteremo a recuperare l'accesso."}
            </Typography>

            <LogoWrapper Logo={LOCK} />

            <Input
                Icon={SMS}
                placeholder={isGerman() ? "E-Mail eingeben" : "Inserisci l'email"}
            />
            <Button
                variant="big"
                onPress={() => router.push("/forgot-password/otp-authenticattion")}
            >
                {isGerman() ? "Passwort anfordern" : "Richiedi password"}
            </Button>
        </KeyboardAvoidingLayout>
    );
}
