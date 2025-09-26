import SHIELD from "@/assets/svgs/shield-security.svg";
import SHIELD_CHECK from "@/assets/svgs/shield-check.svg";
import LOCK from "@/assets/svgs/lock.svg";
import { LogoWrapper, LogoWrapperSub } from "@/components/ui/logo";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Button } from "@/components/ui/button";
import { router, useLocalSearchParams } from "expo-router";
import { InputPassword } from "@/components/ui/input";
import { Modal } from "@/components/common/modal";
import { useState } from "react";
import { View } from "react-native";
import { Layout } from "@/components/layout/layout";
import { useResetPassword } from "@/lib/queries/auth";
import { ApiError } from "@/lib/fetcher";

export default function Screen() {
  const { isGerman } = useLanguageStore();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { email, access_token } = useLocalSearchParams<{
    email: string;
    access_token: string;
  }>();
  const [password, setPassword] = useState<null | string>(null);
  const [confirm_password, setConfirmPassword] = useState<null | string>(null);

  const [errors, setErrors] = useState<{
    password?: string;
    confirm_password?: string;
    non_field_error?: string;
  }>({});

  const { mutate: trigger, isPending } = useResetPassword();

  const handleMutate = () => {
    setErrors({});
    if (!password || password.length < 8) {
      setErrors({
        password: isGerman()
          ? "Das Passwort muss mindestens 8 Zeichen lang sein."
          : "La password deve contenere almeno 8 caratteri.",
      });
      return;
    }

    if (password !== confirm_password) {
      setErrors({
        confirm_password: isGerman()
          ? "Passwörter stimmen nicht überein."
          : "Le password non corrispondono.",
      });
      return;
    }
    if (!access_token) {
      setErrors({
        non_field_error: isGerman()
          ? "Authentifizierungstoken fehlt."
          : "Token di autenticazione mancante.",
      });
      return;
    }

    trigger(
      { email, new_password: password, access_token },
      {
        onSuccess: (data) => {
          setShowModal(true);
        },
        onError: (error: any) => {
          console.log(error);
          if (error instanceof ApiError) {
              console.log(error.data)
          }
          if (error?.error === "You can only reset your own password.") {
            setErrors({
              non_field_error: isGerman()
                ? "Du kannst nur dein eigenes Passwort zurücksetzen."
                : "Puoi reimpostare solo la tua password.",
            });
          } else if (
            error?.detail === "Authentication credentials were not provided."
          ) {
            setErrors({
              non_field_error: isGerman()
                ? "Keine Authentifizierung angegeben."
                : "Credenziali di autenticazione non fornite.",
            });
            router.replace("/login");
          } else if (error?.non_field_error) {
            setErrors({ non_field_error: error.non_field_error });
          } else {
            setErrors({
              non_field_error: isGerman()
                ? "Etwas ist schief gelaufen."
                : "Qualcosa è andato storto.",
            });
          }
        },
      },
    );
  };

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
        onChangeText={setPassword}
        value={password ?? ""}
        placeholder={
          isGerman() ? "Neue Passwort eingeben" : "Inserisci la nuova password"
        }
      />
      {errors.password && (
        <Typography variant="error">{errors.password}</Typography>
      )}

      <InputPassword
        Icon={LOCK}
        onChangeText={setConfirmPassword}
        value={confirm_password ?? ""}
        placeholder={
          isGerman() ? "Neue Passwort bestätigen" : "Conferma la nuova password"
        }
      />

      {errors.confirm_password && (
        <Typography variant="error">{errors.confirm_password}</Typography>
      )}

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

      <Button variant="big" isLoading={isPending} onPress={handleMutate}>
        {isGerman() ? "Passwort ändern" : "Cambia password"}
      </Button>
      {errors.non_field_error && (
        <Typography variant="error">{errors.non_field_error}</Typography>
      )}
    </Layout>
  );
}
