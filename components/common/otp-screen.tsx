import CHECK from "@/assets/svgs/password-check.svg";
import { KeyboardAvoidingLayout } from "@/components/layout/keyboard-avoiding-layout";
import { Button } from "@/components/ui/button";
import { LogoWrapper } from "@/components/ui/logo";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { router } from "expo-router";
import ResponsiveOtpInput from "../ui/otp-input";

type Props = {
  href: string;
};

export default function OTPScreen({ href }: Props) {
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
      {/* <OtpInput
                numberOfDigits={4}
                theme={{
                    containerStyle: {
                        justifyContent: "center",
                        gap: 12,
                        flexDirection: "row"
                    },
                    pinCodeContainerStyle: {
                        borderRadius: 18,
                        borderWidth: 0,
                        backgroundColor: "#303231",
                        width: 80,
                        height: 60,
                    },
                    pinCodeTextStyle: {
                        color: "white",
                    },
                    focusedPinCodeContainerStyle: {
                        borderColor: "#62A07B",
                        borderWidth: 2,
                    },
                    focusStickStyle: {
                        backgroundColor: "#62A07B",
                        width: 2,
                    },
                }}
            /> */}

      <Button variant="big" onPress={() => router.push(href as any)}>
        {isGerman() ? "Überprüfen" : "Verificare"}
      </Button>
    </KeyboardAvoidingLayout>
  );
}
