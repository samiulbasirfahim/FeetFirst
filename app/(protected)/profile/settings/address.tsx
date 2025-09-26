import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import MultiSelectComponent from "@/components/ui/drop-down";
import { Input } from "@/components/ui/input";
import { useLanguageStore } from "@/store/language";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const data = [
  { label: "German", value: "german" },
  { label: "Italy", value: "italy" },
];

export default function Screen() {
  const { isGerman } = useLanguageStore();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    streetAddress: "",
    additionalAddress: "",
    postalCode: "",
    city: "",
    phoneNumber: "",
    country: "",
    comments: "",
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

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

  const handleSubmit = () => {
    console.log("Form submitted:", form);
    // API call or mutation goes here
  };

  return (
    <Layout className="bg-backgroundDark" avoidKeyboard scrollable avoidTabbar>
      <View className="flex-1 gap-3">
        <View className="flex-row gap-3">
          <View className="flex-1">
            <Input
              placeholder={t.name}
              value={form.name}
              onChangeText={(val) => handleChange("name", val)}
            />
          </View>
          <View className="flex-1">
            <Input
              placeholder={t.surname}
              value={form.surname}
              onChangeText={(val) => handleChange("surname", val)}
            />
          </View>
        </View>

        <View>
          <Input
            placeholder={t.streetAddress}
            value={form.streetAddress}
            onChangeText={(val) => handleChange("streetAddress", val)}
          />
        </View>

        <View>
          <Input
            placeholder={t.additionalAddress}
            value={form.additionalAddress}
            onChangeText={(val) => handleChange("additionalAddress", val)}
          />
        </View>

        <View className="bg-muted-background rounded-lg overflow-hidden p-4 flex-row items-start gap-2">
          <TextInput
            multiline
            value={form.comments}
            onChangeText={(val) => handleChange("comments", val)}
            className="text-foreground bg-muted-background flex-1 h-20 placeholder:text-muted-foreground"
            style={{
              lineHeight: 22,
              paddingTop: 0,
              textAlignVertical: "top",
            }}
            placeholder={
              isGerman()
                ? "Geben Sie zusätzliche Kommentare ein"
                : "Inserisci ulteriori commenti"
            }
          />
        </View>

        <View className="flex-row gap-3">
          <View className="w-24">
            <Input
              placeholder={t.postalCode}
              value={form.postalCode}
              onChangeText={(val) => handleChange("postalCode", val)}
            />
          </View>
          <View className="flex-1">
            <Input
              placeholder={t.city}
              value={form.city}
              onChangeText={(val) => handleChange("city", val)}
            />
          </View>
        </View>

        <View>
          <Input
            placeholder={t.phoneNumber}
            value={form.phoneNumber}
            keyboardType="phone-pad"
            onChangeText={(val) => handleChange("phoneNumber", val)}
          />
        </View>

        <MultiSelectComponent
          list={["Italy", "German"]}
          value={form.country}
          onChange={(val) => handleChange("country", val)}
        />
      </View>

      <Button variant="big" onPress={handleSubmit}>
        {t.updateButton}
      </Button>
    </Layout>
  );
}
