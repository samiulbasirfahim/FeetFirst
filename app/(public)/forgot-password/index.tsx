import SMS from "@/assets/svgs/sms.svg";
import LOCK from "@/assets/svgs/lock-dot.svg";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { LogoWrapper } from "@/components/ui/logo";
import { Layout } from "@/components/layout/layout";
import { useState } from "react";
import { useOTP } from "@/lib/queries/auth";
import { Text } from "react-native";
import { ApiError } from "@/lib/fetcher";
export default function Page() {
    const { isGerman } = useLanguageStore();

    const [email, setEmail] = useState("");
    const { isPending, mutate: trigger } = useOTP();

    const [error, setError] = useState<null | string>(null);

    const handleSendOTP = () => {
        if (email.trim().length === 0) {
            setError(isGerman() ? "E-Mail ist erforderlich" : "Email è richiesta");
            return;
        }

        trigger(
            { task: "Reset Password", email },
            {
                onError: (err: any) => {
                    let message = "";

                    if (err instanceof ApiError) {
                        const apiError = err.data?.error;

                        if (apiError === "User not found.") {
                            message = isGerman()
                                ? "Kein Benutzer mit dieser E-Mail gefunden"
                                : "Nessun utente trovato con questa email";
                        } else if (
                            apiError === "An OTP has already sent. Please check your email."
                        ) {
                            message = isGerman()
                                ? "Ein OTP wurde bereits gesendet. Bitte prüfen Sie Ihre E-Mail."
                                : "Un OTP è già stato inviato. Controlla la tua email.";

                            setTimeout(() => {
                                router.push({
                                    pathname: "/(public)/forgot-password/otp-authenticattion",
                                    params: { email },
                                });
                            }, 2000);
                        } else {
                            message = isGerman()
                                ? "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut."
                                : "Qualcosa è andato storto. Per favore riprova.";
                        }
                    } else {
                        message = isGerman()
                            ? "Ein unerwarteter Fehler ist aufgetreten."
                            : "Si è verificato un errore imprevisto.";
                    }

                    setError(message);
                    console.error(err);
                },
                onSuccess: (res: any) => {
                    if (res.success) {
                        router.push({
                            pathname: "/(public)/forgot-password/otp-authenticattion",
                            params: { email },
                        });
                    } else {
                        setError(
                            isGerman()
                                ? res.error || "OTP konnte nicht gesendet werden"
                                : res.error || "Impossibile inviare l'OTP",
                        );
                    }
                },
            },
        );
    };

    return (
        <Layout scrollable avoidKeyboard edges={["bottom"]}>
            <Typography variant="subtitle" className="text-center text-white">
                {isGerman()
                    ? "Falsches Passwort. Kein Problem! Gib deine E-Mail ein und wir helfen dir, den Zugang wiederherzustellen."
                    : "Password errata. Nessun problema! Inserisci la tua email e ti aiuteremo a recuperare l'accesso."}
            </Typography>

            <LogoWrapper Logo={LOCK} />

            <Input
                Icon={SMS}
                placeholder={isGerman() ? "E-Mail eingeben" : "Inserisci l'email"}
                onChangeText={(t) => setEmail(t.toLowerCase())}
                value={email}
            />
            {error && <Text className="text-red-500 mt-2 text-center">{error}</Text>}
            <Button
                variant="big"
                onPress={handleSendOTP}
                disabled={isPending}
                isLoading={isPending}
            >
                {isGerman() ? "Passwort anfordern" : "Richiedi password"}
            </Button>
        </Layout>
    );
}
