import CHECK from "@/assets/svgs/password-check.svg";
import { Button } from "@/components/ui/button";
import { LogoWrapper } from "@/components/ui/logo";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import ResponsiveOtpInput from "@/components/ui/otp-input";
import { Layout } from "@/components/layout/layout";
import { useState } from "react";
import { useVerifyOTP, useOTP } from "@/lib/queries/auth";
import { Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ApiError } from "@/lib/fetcher";
import { setItem } from "@/store/mmkv";
import { User } from "@/type/user";
import { useAuthStore } from "@/store/auth";

export default function OTPScreen() {
  const { isGerman } = useLanguageStore();
  const { setUser } = useAuthStore();
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { email } = useLocalSearchParams<{ email: string }>();
  const router = useRouter();

  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOTP();
  const { mutate: resendOtp, isPending: isResending } = useOTP();

  const handleVerify = () => {
    setError(null);
    setMessage(null);

    if (!otp || otp.length < 4) {
      setError(
        isGerman()
          ? "Bitte gib den vollständigen Code ein."
          : "Inserisci il codice completo.",
      );
      return;
    }

    verifyOtp(
      { email, otp_code: otp },
      {
        onSuccess: (res: any) => {
          console.log(res);
          const { access, refresh } = res;
          if (access && refresh) {
            setItem("access_token", access);
            setItem("refresh_token", refresh);

            const mappedUser: User = {
              id: res.user.id,
              name: res.user.name,
              email: res.user.email,
              date_of_birth: res.user.date_of_birth,
              image: res.user.image ?? "",
              phone: res.user.phone,
            };

            setUser(mappedUser);

            router.replace("/on-boarding");
          } else {
            setError(
              isGerman()
                ? "Etwas ist schief gelaufen. Versuche es erneut."
                : "Qualcosa è andato storto. Riprova.",
            );
          }
        },
        onError: (err) => {
          if (err instanceof ApiError) {
            setError(err.data.error);
          }
          setError(
            isGerman()
              ? "Etwas ist schief gelaufen. Versuche es erneut."
              : "Qualcosa è andato storto. Riprova.",
          );
        },
      },
    );
  };

  const handleResend = () => {
    setError(null);
    setMessage(null);

    resendOtp(
      { email, task: "Verify Account" },
      {
        onSuccess: (res: any) => {
          if (res.success) {
            setMessage(
              isGerman()
                ? "OTP erfolgreich erneut gesendet."
                : "OTP inviato nuovamente con successo.",
            );
          } else {
            setError(res.error);
          }
        },
        onError: (err) => {
          if (err instanceof ApiError) {
            setError(err.data.error);
          } else {
            setError(
              isGerman()
                ? "Etwas ist schief gelaufen. Versuche es erneut."
                : "Qualcosa è andato storto. Riprova.",
            );
          }
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
      {message && (
        <Text className="text-primary mt-2 text-center">{message}</Text>
      )}

      <Button
        variant="big"
        onPress={handleVerify}
        disabled={isVerifying}
        isLoading={isVerifying}
      >
        {isGerman() ? "Überprüfen" : "Verificare"}
      </Button>

      <Button
        variant="outline"
        onPress={handleResend}
        disabled={isResending}
        isLoading={isResending}
        className="mt-4"
      >
        {isGerman() ? "OTP erneut senden" : "Invia nuovamente OTP"}
      </Button>
    </Layout>
  );
}
