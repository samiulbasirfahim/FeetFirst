import CHECK from "@/assets/svgs/password-check.svg";
import { Button } from "@/components/ui/button";
import { LogoWrapper } from "@/components/ui/logo";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import ResponsiveOtpInput from "@/components/ui/otp-input";
import { Layout } from "@/components/layout/layout";
import { useState } from "react";
import { useVerifyOTP } from "@/lib/queries/auth";
import { Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function OTPScreen() {
  const { isGerman } = useLanguageStore();
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { email } = useLocalSearchParams<{ email: string }>(); // 👈 assume email is passed from previous screen
  const router = useRouter();

  const { mutate: verifyOtp, isPending } = useVerifyOTP();

  const handleVerify = () => {
    setError(null);

    if (!otp || otp.length < 4) {
      setError(
        isGerman()
          ? "Bitte gib den vollständigen Code ein."
          : "Inserisci il codice completo.",
      );
      return;
    }

    verifyOtp(
      { email, otp },
      {
        onSuccess: (res: any) => {
          if (!res.success) {
            setError(res.error);
          } else {
            console.log("OTP verified");
            router.replace("/on-boarding");
          }
        },
        onError: () => {
          setError(
            isGerman()
              ? "Etwas ist schief gelaufen. Versuche es erneut."
              : "Qualcosa è andato storto. Riprova.",
          );
        },
      },
    );
  };

  return (
    <Layout avoidKeyboard scrollable>
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

      <ResponsiveOtpInput
        onChange={(text) => setOtp(text)}
        numberOfDigits={4}
      />

      {error && <Text className="text-red-500 mt-2 text-center">{error}</Text>}

      <Button variant="big" onPress={handleVerify} disabled={isPending}>
        {isPending
          ? isGerman()
            ? "Überprüfen..."
            : "Verifica in corso..."
          : isGerman()
            ? "Überprüfen"
            : "Verificare"}
      </Button>
    </Layout>
  );
}
