import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import MultiSelectComponent from "@/components/ui/drop-down";
import { Input } from "@/components/ui/input";
import { useLanguageStore } from "@/store/language";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const data = [
  { label: "German", value: "german" },
  { label: "Italy", value: "italy" },
];

export default function Screen() {
  const { isGerman } = useLanguageStore();
  const [text, setText] = useState<string>("");

  const translations = {
    german: {
      name: "Name",
      surname: "Nachname",
      streetAddress: "Straße und Hausnummer",
      additionalAddress: "Zusätzliche Adresse (optional)",
      postalCode: "PLZ",
      city: "Stadt",
      phoneNumber: "Telefonnummer",
      country: "Land",
      updateButton: "AKTUALISIEREN",
    },
    italian: {
      name: "Nome",
      surname: "Cognome",
      streetAddress: "Indirizzo",
      additionalAddress: "Indirizzo aggiuntivo (opzionale)",
      postalCode: "CAP",
      city: "Città",
      phoneNumber: "Numero di telefono",
      country: "Paese",
      updateButton: "AGGIORNA",
    },
  };

  const t = isGerman() ? translations.german : translations.italian;

  return (
    <Layout className="bg-backgroundDark" avoidKeyboard scrollable avoidTabbar>
      <View className="flex-1 gap-3">
        <View className="flex-row gap-3">
          <View className="flex-1">
            <Input placeholder={t.name} />
          </View>
          <View className="flex-1">
            <Input placeholder={t.surname} />
          </View>
        </View>
        <View>
          <Input placeholder={t.streetAddress} />
        </View>
        <View className="bg-muted-background rounded-lg overflow-hidden p-4 flex-row items-start gap-2">
          <TextInput
            multiline
            value={text}
            onChangeText={setText}
            className="text-foreground bg-muted-background flex-1 h-20 placeholder:text-muted-foreground"
            style={{
              lineHeight: 22,
              paddingTop: 0,
              textAlignVertical: "top",
            }}
            placeholder={
              isGerman()
                ? "Geben Sie zusätzliche Kommentare ein"
                : "Inserisci Ulteriori commenti"
            }
          />
        </View>
        <View className="flex-row gap-3">
          <View className="w-24">
            <Input placeholder={t.postalCode} />
          </View>
          <View className="flex-1">
            <Input placeholder={t.city} />
          </View>
        </View>
        <View>
          <Input placeholder={t.phoneNumber} />
        </View>

        <MultiSelectComponent list={["Italy", "German"]} />
      </View>

      <Button variant="big">{t.updateButton}</Button>
    </Layout>
  );
}
