import CALENDAR from "@/assets/svgs/calendar.svg";
import LOCK from "@/assets/svgs/lock.svg";
import Human from "@/assets/svgs/profile.svg";
import SMS from "@/assets/svgs/sms.svg";
import { DatePicker } from "@/components/common/datepicker";
import { Modal } from "@/components/common/modal";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import CheckBox from "@/components/ui/checkbox";
import { Input, InputPassword } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Page() {
  const { isGerman } = useLanguageStore();

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

  const [checked, setIsChecked] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  return (
    <Layout scrollable avoidKeyboard edges={["bottom"]}>
      <Logo className="mb-20" />

      <Input
        Icon={Human}
        placeholder={isGerman() ? "Namen eingeben" : "Inserisci nome"}
      />
      <Input
        Icon={SMS}
        placeholder={isGerman() ? "E-Mail eingeben" : "Inserisci l'email"}
      />

      <Pressable
        onPress={() => setShowDatePicker(true)}
        className="bg-muted-background w-full rounded-lg flex-row px-3 py-3 items-center relative"
      >
        <CALENDAR />
        <TextInput
          editable={false}
          pointerEvents="none"
          value={
            dateOfBirth
              ? `${dateOfBirth.getDate()}, ${dateOfBirth.toLocaleDateString("en-US", { month: "short" })}, ${dateOfBirth.getFullYear()}`
              : ""
          }
          placeholder={
            isGerman()
              ? "Geburtsdatum eingeben"
              : "Inserisci la data di nascita"
          }
          className={
            "h-full flex-1 py-[0] ms-3 ps-3 border-s-2 border-muted-foreground text-foreground placeholder:text-muted-foreground"
          }
        />
      </Pressable>

      <InputPassword
        Icon={LOCK}
        placeholder={isGerman() ? "Passwort eingeben" : "Inserisci password"}
      />

      <InputPassword
        Icon={LOCK}
        placeholder={isGerman() ? "Passwort bestätigen" : "Conferma password"}
      />
      <View className="flex-row items-start">
        <CheckBox
          onPress={() => setIsChecked((prev) => !prev)}
          isChecked={checked}
        />
        <TouchableOpacity className="flex-1" onPress={() => setShowModal(true)}>
          <Text className="text-muted-foreground">
            {isGerman() ? (
              <>
                Ich akzeptiere die <Text>Datenschutzrichtlinie</Text>
                und die{" "}
                <Text className="text-primary">
                  Allgemeinen Geschäftsbedingungen
                </Text>
              </>
            ) : (
              <>
                Accetto la{" "}
                <Text className="text-primary">
                  Politica sulla riservatezza
                </Text>{" "}
                e i<Text className="text-primary">Termini e condizioni </Text>
              </>
            )}
          </Text>
        </TouchableOpacity>
      </View>

      <DatePicker
        showDateTimePicker={showDatePicker}
        onClickOutside={(date: Date) => {
          setDateOfBirth(date);
          setShowDatePicker(false);
        }}
        closeModal={() => {
            setShowDatePicker(false);
        }}
      />

      <Modal
        isOpen={showModal}
        onClickOutside={() => {
          setShowModal(false);
          setShowDetails(false);
        }}
      >
        <View className="p-6">
          {!showDetails ? (
            <>
              <Typography
                className="text-justify text-foreground"
                variant="subtitle"
              >
                {isGerman()
                  ? "Hiermit willige ich ausdrücklich in die Verarbeitung meines 3D-Fußscans (biometrische Daten, besondere Kategorie personenbezogener Daten) sowie meiner personenbezogenen Daten gemäß der Datenschutzerklärung ein."
                  : "Con la presente acconsento espressamente al trattamento della mia scansione 3D del piede (dati biometrici, categoria particolare di dati personali) e dei miei dati personali secondo l’informativa sulla privacy."}
              </Typography>
              <TouchableOpacity onPress={() => setShowDetails(true)}>
                <Text className="text-primary text-lg py-2">
                  {isGerman() ? "Mehr erfahren" : "Scopri di più"}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <Typography
              className="text-justify text-foreground"
              variant="subtitle"
            >
              {isGerman()
                ? "Um die FeetF1rst App nutzen zu können, ist Ihre ausdrückliche Einwilligung erforderlich. Wir verarbeiten Ihren 3D-Fußscan (biometrische Daten) sowie Ihre personenbezogenen Daten, um passgenaue Schuhempfehlungen, Maßanfertigungen und personalisierte Services bereitzustellen. Ihre Daten werden verschlüsselt gespeichert, nur bei Bestellungen an den gewählten Händler weitergegeben und können jederzeit in den App-Einstellungen gelöscht werden. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen."
                : "Per utilizzare l’app FeetF1rst è necessario il tuo esplicito consenso. Trattiamo la scansione 3D del tuo piede (dati biometrici) e i tuoi dati personali al fine di offrirti raccomandazioni di scarpe su misura, prodotti personalizzati e servizi dedicati. I tuoi dati vengono archiviati in forma criptata, condivisi solo con il rivenditore scelto in caso di ordine e possono essere eliminati in qualsiasi momento nelle impostazioni dell’app. Puoi revocare il tuo consenso in qualsiasi momento con effetto per il futuro."}
            </Typography>
          )}
        </View>
      </Modal>

      <Button
        variant="big"
        className="w-full"
        onPress={() => router.push("/register/otp-authenticattion")}
      >
        {isGerman() ? "Registrieren" : "Registrati"}
      </Button>
    </Layout>
  );
}
