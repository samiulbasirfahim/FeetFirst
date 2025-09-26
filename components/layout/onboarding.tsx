import { Layout } from "./layout";
import CheckBox from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { useState } from "react";
import { Pressable, TextInput, View, Keyboard } from "react-native";

type Props = {
  HeaderComponent?: React.ReactNode;
  FooterComponent?: React.ReactNode;
  options: string[];
  showOtherInput?: boolean;
  multiple?: boolean;
  onSelectionChange: (selection: string[]) => void;
  otherPlaceholder?: string;
  otherButtonText?: string;
};

export function OnBoardingLayout({
  HeaderComponent,
  FooterComponent,
  options,
  showOtherInput = false,
  multiple = false,
  onSelectionChange,
  otherPlaceholder,
  otherButtonText,
}: Props) {
  const { isGerman } = useLanguageStore();
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [otherValue, setOtherValue] = useState("");

  // Get localized placeholder text
  const getPlaceholder = () => {
    if (otherPlaceholder) return otherPlaceholder;
    return isGerman() ? "Bitte angeben..." : "Specifica qui...";
  };

  const toggleCheck = (value: string) => {
    if (multiple) {
      const newValues = checkedValues.includes(value)
        ? checkedValues.filter((v) => v !== value)
        : [...checkedValues, value];

      setCheckedValues(newValues);
      onSelectionChange([...newValues, ...(otherValue ? [otherValue] : [])]);
    } else {
      const newValue = selectedValue === value ? "" : value;
      setSelectedValue(newValue);
      onSelectionChange(
        [newValue, ...(otherValue ? [otherValue] : [])].filter(Boolean),
      );
    }
  };

  const handleOtherInputChange = (text: string) => {
    setOtherValue(text);
    if (multiple) {
      onSelectionChange([...checkedValues, ...(text ? [text] : [])]);
    } else {
      onSelectionChange(
        [selectedValue, ...(text ? [text] : [])].filter(Boolean),
      );
    }
  };

  const currentSelection = multiple
    ? checkedValues
    : [selectedValue].filter(Boolean);

  return (
    <Layout scrollable avoidKeyboard>
      <View style={{ flex: 1 }}>
        {HeaderComponent && (
          <View style={{ marginBottom: 16 }}>{HeaderComponent}</View>
        )}

        <View style={{ gap: 16, flex: 1 }}>
          {options.map((item, idx) => (
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
                  iconStyle={{ borderRadius: 6 }}
                />
              </View>
            </Pressable>
          ))}

          {showOtherInput && (
            <TextInput
              placeholder={getPlaceholder()}
              placeholderTextColor="#999"
              className="placeholder:font-semibold"
              style={{
                backgroundColor: "#2C2C2D",
                paddingVertical: 16,
                paddingHorizontal: 16,
                borderRadius: 8,
                fontSize: 16,
                color: "#FFFFFF",
              }}
              value={otherValue}
              onChangeText={handleOtherInputChange}
              onSubmitEditing={Keyboard.dismiss}
            />
          )}
        </View>

        {FooterComponent && (
          <View style={{ marginTop: "auto", paddingVertical: 16 }}>
            {FooterComponent}
          </View>
        )}
      </View>
    </Layout>
  );
}
