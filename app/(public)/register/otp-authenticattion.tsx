import CHECK from "@/assets/svgs/password-check.svg";
import { KeyboardAvoidingLayout } from "@/components/layout/keyboard-avoiding-layout";
import { Button } from "@/components/ui/button";
import { LogoWrapper } from "@/components/ui/logo";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";
import ResponsiveOtpInput from "@/components/ui/otp-input";

export default function OTPScreen() {
    const { isGerman } = useLanguageStore();
    return (
        <KeyboardAvoidingLayout edges={["bottom"]}>
            <Typography
                variant="title"
                className="text-start text-muted-foreground w-full"
            >
                {isGerman() ? "OTP-Authentifizierung" : "Autenticazione OTP"}
            </Typography>

            <LogoWrapper Logo={CHECK} />
            <Typography variant="subtitle" className="text-center text-white">
                {isGerman()
                    ? "Gib den Verifizierungscode ein, den wir dir per E-Mail geschickt haben."
                    : "Inserisci il codice di verifica che ti abbiamo inviato via email."}
            </Typography>

            <ResponsiveOtpInput numberOfDigits={4} />

            <Link href={"/on-boarding"} replace asChild>
                <Button variant="big">
                    {isGerman() ? "Überprüfen" : "Verificare"}
                </Button>
            </Link>
        </KeyboardAvoidingLayout>
    );
}
