import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import CheckBox from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from "react-native";

const optionsDE: string[] = [
  "Freizeit / Alltag 149,99€",
  "Sport-169,99€",
  "Arbeit/Arbeitsschuhe-169,99€",
  "Business/Formal-149,99€",
  "Andere (bitte angeben)-169,99€",
  "Winsole-Einlage (Radschuheinlage für Leistungssteigerung. - 199,99€)",
];

const optionsIT: string[] = [
  "Tempo libero / Tutti i giorni 149,99€",
  "Sport - 169,99 €",
  "Scarpe da lavoro/da lavoro - 169,99€",
  "Business/Formale - 149,99 €",
  "Altro (specificare) - 169,99€",
  "Soletta Winsole (soletta per scarpe da ciclismo per migliorare le prestazioni. - € 199,99)",
];

export default function Screen() {
  const { isGerman } = useLanguageStore();

  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  function toggleCheck(value: string) {
    setSelectedValue((prev) => (prev === value ? null : value));
  }

  const baseOptions = isGerman() ? optionsDE : optionsIT;
  const data = [...baseOptions];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 100}
      className="flex-1 bg-background"
    >
      <Layout>
        <View style={{ flex: 1, paddingBottom: 24 }}>
          <Typography variant="title" className="text-foreground">
            {isGerman()
              ? "Für Welchen Zweck Verwenden Sie Die Einlage?"
              : "Per quale scopo utilizzi l'inserto?"}
          </Typography>

          <FlatList
            style={{ marginTop: 16, flex: 1 }}
            data={data}
            keyExtractor={(item, idx) => `${item}-${idx}`}
            showsVerticalScrollIndicator={true}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps={"always"}
            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => toggleCheck(item)}
                style={{
                  backgroundColor: "#2C2C2D",
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <CheckBox
                    onPress={() => toggleCheck(item)}
                    unFillColor="#303231"
                    innerIconStyle={{
                      borderWidth: 1,
                      borderColor: "#585C5B",
                      borderRadius: "50%",
                    }}
                    fillColor="#62A07B"
                    isChecked={selectedValue === item}
                    iconStyle={{
                      borderRadius: "50%",
                    }}
                  />
                  <Typography className="flex-1 text-lg">{item}</Typography>
                </View>
              </Pressable>
            )}
          />
        </View>

        <View style={{ gap: 12 }}>
          <Link asChild href={"/(scan-upload)/after-scan-upload/fourth"}>
            <Button variant="big">
              {isGerman() ? "Nächste Frage" : "Prossima domanda"}
            </Button>
          </Link>

          <Link asChild href={"/(scan-upload)/after-scan-upload/fourth"}>
            <Button variant="ghost">
              {isGerman() ? "Überspringen" : "Saltare"}
            </Button>
          </Link>
        </View>
      </Layout>
    </KeyboardAvoidingView>
  );
}
