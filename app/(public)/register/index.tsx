import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Input, InputPassword } from "@/components/ui/input";
import Human from "@/assets/svgs/profile.svg";
import SMS from "@/assets/svgs/sms.svg";
import CALENDAR from "@/assets/svgs/calendar.svg";
import LOCK from "@/assets/svgs/lock.svg";
import { useLanguageStore } from "@/store/language";
import { Logo } from "@/components/ui/logo";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { KeyboardAvoidingLayout } from "@/components/layout/keyboard-avoiding-layout";

export default function Page() {
  const { isGerman } = useLanguageStore();

  const [checked, setIsChecked] = useState<boolean>(false);

  return (
    <KeyboardAvoidingLayout>
      <Logo className="mb-20" />

      <Input
        Icon={Human}
        placeholder={isGerman() ? "Namen eingeben" : "Inserisci nome"}
      />
      <Input
        Icon={SMS}
        placeholder={isGerman() ? "E-Mail eingeben" : "Inserisci l'email"}
      />

      <TouchableWithoutFeedback>
        <Input
          Icon={CALENDAR}
          placeholder={
            isGerman()
              ? "Geburtsdatum eingeben"
              : "Inserisci la data di nascita"
          }
        />
      </TouchableWithoutFeedback>
      <InputPassword
        Icon={LOCK}
        placeholder={isGerman() ? "Passwort eingeben" : "Inserisci password"}
      />

      <InputPassword
        Icon={LOCK}
        placeholder={isGerman() ? "Passwort bestätigen" : "Conferma password"}
      />
      <View className="flex-row items-start">
        <View className="flex-shrink-0">
          <BouncyCheckbox
            onPress={() => setIsChecked((prev) => !prev)}
            bounceEffect={0}
            useBuiltInState={false}
            isChecked={checked}
            unFillColor="#303231"
            innerIconStyle={{
              borderWidth: 0,
            }}
            fillColor="#303231"
            iconStyle={{
              borderRadius: 8,
            }}
          />
        </View>
        <Text className="flex-1 text-muted-foreground">
          {isGerman() ? (
            <>
              Ich akzeptiere die{" "}
              <Text className="text-primary">Datenschutzrichtlinie</Text> und
              die{" "}
              <Text className="text-primary">
                Allgemeinen Geschäftsbedingungen
              </Text>
            </>
          ) : (
            <>
              Accetto la{" "}
              <Text className="text-primary">Politica sulla riservatezza</Text>{" "}
              e i<Text className="text-primary">Termini e condizioni </Text>
            </>
          )}
        </Text>
      </View>
      <Button variant="big" className="w-full">
        {isGerman() ? "Registrieren" : "Registrati"}
      </Button>
    </KeyboardAvoidingLayout>
  );
}
