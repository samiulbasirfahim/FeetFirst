import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import CheckBox from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";

const optionsDE: string[] = [
  "Sneaker",
  "Halbschuhe",
  "Stiefeletten",
  "Hausschuhe",
];

const optionsIT: string[] = [
  "Sneaker",
  "Scarpe basse",
  "Stivaletti",
  "Pantofole",
];

export default function Screen() {
  const { isGerman } = useLanguageStore();

  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [customOptions, setCustomOptions] = useState<string[]>([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  const input_ref = useRef<TextInput>(null);

  useEffect(() => {
    if (showOtherInput && Platform.OS === "android") {
      const timer = setTimeout(() => {
        input_ref.current?.focus();
      }, 400);

      return () => clearTimeout(timer);
    } else if (showOtherInput) {
      input_ref.current?.focus();
    }
  }, [showOtherInput]);

  function toggleCheck(value: string) {
    setSelectedValue((prev) => (prev === value ? null : value));
  }

  const baseOptions = isGerman() ? optionsDE : optionsIT;
  const data = [...baseOptions, ...customOptions];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 100}
      className="flex-1 bg-background"
    >
      <Layout>
        <View style={{ flex: 1, paddingBottom: 24 }}>
          <Typography variant="title" className="text-foreground">
            {isGerman() ? "Für Welchen Einsatz?" : "Per quale utilizzo?"}
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
            ListFooterComponent={
              <View style={{ marginTop: 16, marginBottom: 16 }}>
                {!showOtherInput ? (
                  <Pressable
                    onPress={() => setShowOtherInput(true)}
                    style={{
                      backgroundColor: "#2C2C2D",
                      paddingVertical: 16,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                    }}
                  >
                    <Typography className="flex-1 text-lg">
                      {isGerman()
                        ? "Sonstiges (bitte angeben)"
                        : "Altro (specificare)"}
                    </Typography>
                  </Pressable>
                ) : (
                  <TextInput
                    autoFocus
                    placeholder={
                      isGerman() ? "Bitte angeben..." : "Specifica qui..."
                    }
                    style={{
                      backgroundColor: "#2C2C2D",
                      paddingVertical: 16,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      fontSize: 16,
                      color: "#FFFFFF",
                    }}
                    value={otherValue}
                    onChangeText={setOtherValue}
                    blurOnSubmit={false}
                    ref={input_ref}
                    onSubmitEditing={() => {
                      const trimmed = otherValue.trim();
                      if (trimmed.length > 0) {
                        setCustomOptions((prev) => [...prev, trimmed]);
                        setSelectedValue(trimmed);
                      }
                      setShowOtherInput(false);
                      setOtherValue("");
                    }}
                  />
                )}
              </View>
            }
          />
        </View>
        <View style={{gap: 12}}>
          <Link asChild href={"/(scan-upload)/after-scan-upload/third"}>
            <Button variant="big">
              {isGerman() ? "Nächste Frage" : "Prossima domanda"}
            </Button>
          </Link>

          <Link asChild href={"/(scan-upload)/after-scan-upload/third"}>
            <Button variant="ghost">
              {isGerman() ? "Überspringen" : "Saltare"}
            </Button>
          </Link>
        </View>
      </Layout>
    </KeyboardAvoidingView>
  );
}
