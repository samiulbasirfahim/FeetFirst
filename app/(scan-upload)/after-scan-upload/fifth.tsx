import { useRef, useState } from "react";
import { Pressable, TextInput, View, Keyboard } from "react-native";
import { Link } from "expo-router";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import CheckBox from "@/components/ui/checkbox";
import { Layout } from "@/components/layout/layout";

const optionsDE: string[] = ["Nein"];
const optionsIT: string[] = ["NO"];

export default function Screen() {
  const { isGerman } = useLanguageStore();
  const options = isGerman() ? optionsDE : optionsIT;

  const input_ref = useRef<TextInput>(null);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [otherValue, setOtherValue] = useState("");

  const toggleCheck = (value: string) => {
    const newSelectedValue = selectedValue === value ? "" : value;
    setSelectedValue(newSelectedValue);
    console.log("Selected:", [newSelectedValue]);
  };

  const handleOtherSubmit = () => {
    Keyboard.dismiss();
  };

  // ✅ Insert input ABOVE the "No"/"Nein" option
  const allOptions = [...options];
  const currentSelection = [selectedValue].filter(Boolean);

  return (
    <Layout scrollable avoidKeyboard>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ marginBottom: 16 }}>
          <Typography variant="onboarding-header" className="text-white font-pathSemiBold text-[20px]">
            {isGerman()
              ? "Haben Sie Probleme Mit Ihrem Gleichgewicht, Gang Oder Der Beweglichkeit?"
              : "Hai problemi di equilibrio, andatura o mobilità?"}
          </Typography>
        </View>

        <View style={{ gap: 16, flex: 1 }}>
          {/* First TextInput (above "No") */}
          <TextInput
            ref={input_ref}
            placeholder={
              isGerman() ? "Ja (bitte erläutern)" : "Sì (per favore spiega)"
            }
            placeholderTextColor="#999"
            className="placeholder:font-pathMedium placeholder:text-[16px] placeholder:text-foreground"
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
            onSubmitEditing={handleOtherSubmit}
          />

          {/* Render options normally */}
          {allOptions.map((item, idx) => (
            <Pressable
              key={`${item}-${idx}`}
              onPress={() => toggleCheck(item)}
              style={{
                backgroundColor: "#2C2C2D",
                paddingVertical: 14,
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
                <Typography
                  className="flex-1 text-lg text-foreground font-pathMedium text-[16px]"
                  variant="selected"
                >
                  {item}
                </Typography>
                <CheckBox
                  onPress={() => toggleCheck(item)}
                  unFillColor="#303231"
                  innerIconStyle={{
                    borderWidth: 1,
                    borderColor: "#585C5B",
                    borderRadius: 6,
                  }}
                  fillColor="#62A07B"
                  isChecked={currentSelection.includes(item)}
                  iconStyle={{
                    borderRadius: 6,
                  }}
                />
              </View>
            </Pressable>
          ))}
        </View>

        {/* Footer */}
        <View style={{ marginTop: "auto", paddingVertical: 16 }}>
          <Link asChild href={"/(scan-upload)/after-scan-upload/sixth"}>
            <Button variant="big" textClassName="text-white font-pathSemiBold text-[16px] py-1">
              {isGerman() ? "Nächste Frage" : "Prossima domanda"}
            </Button>
          </Link>

          <Link asChild href={"/(scan-upload)/after-scan-upload/sixth"}>
            <Button variant="ghost">
              {isGerman() ? "Überspringen" : "Saltare"}
            </Button>
          </Link>
        </View>
      </View>
    </Layout>
  );
}
