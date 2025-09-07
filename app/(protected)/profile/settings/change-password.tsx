import LIKE from "@/assets/svgs/like.svg";
import LOCK from "@/assets/svgs/lock.svg";
import { Modal } from "@/components/common/modal";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { InputPassword } from "@/components/ui/input";
import { LogoWrapperSub } from "@/components/ui/logo";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { useState } from "react";
import { View } from "react-native";

export default function Screen() {
  const { isGerman } = useLanguageStore();
  const [show_modal, set_show_modal] = useState<boolean>(false);
  return (
    <Layout scrollable avoidTabbar avoidKeyboard>
      <InputPassword
        Icon={LOCK}
        placeholder={
          isGerman()
            ? "Geben Sie Ihr aktuelles Passwort ein"
            : "Inserisci la password corrente"
        }
      />

      <InputPassword
        Icon={LOCK}
        placeholder={
          isGerman()
            ? "Geben Sie das neue Passwort ein"
            : "Inserisci la nuova password"
        }
      />
      <InputPassword
        Icon={LOCK}
        placeholder={
          isGerman()
            ? "Geben Sie das Bestätigungspasswort ein"
            : "Inserisci conferma password"
        }
      />

      <Button
        onPress={() => set_show_modal(true)}
        variant="big"
        className={`items-center justify-center`}
        textClassName="text-center"
      >
        {!isGerman() ? "Aggiornamento" : "ELIMINA IL MIO ACCOUNT"}
      </Button>

      <Modal
        isOpen={show_modal}
        onClickOutside={() => {
          set_show_modal(false);
        }}
      >
        <View className="flex-col items-center justify-center py-10 px-4 gap-6">
          <LogoWrapperSub Logo={LIKE} />
          <Typography variant="title" className="text-white">
            {isGerman() ? "Passwort geändert" : "Tutto pronto"}
          </Typography>

          <Typography variant="subtitle" className="w-4/5 text-center">
            {isGerman()
              ? "Ihr Passwort wurde erfolgreich geändert"
              : "La tua password è stata modificata con successo."}
          </Typography>
          <Button
            className="bg-transparent border-primary border-2"
            textClassName="text-primary"
            variant="big"
          >
            {isGerman() ? "IN ORDNUNG" : "VA BENE"}
          </Button>
        </View>
      </Modal>
    </Layout>
  );
}
