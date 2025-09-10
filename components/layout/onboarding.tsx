import { Layout } from "./layout";
import CheckBox from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { useRef, useState } from "react";
import { Pressable, Text, TextInput, View, Keyboard } from "react-native";

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
  otherPlaceholder = "Please specify...",
  otherButtonText = "Other",
}: Props) {
  const { isGerman } = useLanguageStore();

  otherButtonText = isGerman()
    ? "Sonstiges (bitte angeben)"
    : "Altro (specificare)";
  otherPlaceholder = isGerman() ? "Bitte angeben..." : "Specifica qui...";

  const input_ref = useRef<TextInput>(null);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [showOtherInputField, setShowOtherInputField] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  function toggleCheck(value: string) {
    if (multiple) {
      const newCheckedValues = checkedValues.includes(value)
        ? checkedValues.filter((v) => v !== value)
        : [...checkedValues, value];

      setCheckedValues(newCheckedValues);
      onSelectionChange(newCheckedValues);
    } else {
      const newSelectedValue = selectedValue === value ? "" : value;
      setSelectedValue(newSelectedValue);
      onSelectionChange([newSelectedValue]);
    }
  }

  const handleOtherSubmit = () => {
    Keyboard.dismiss(); // Hide the keyboard
    // setShowOtherInputField(false); // Hide the input field
    // setOtherValue(""); // Clear the value
  };

  const allOptions = [...options];
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
          {allOptions.map((item, idx) => (
            <Pressable
              key={`${item}-${idx}`}
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
                <Typography className="flex-1 text-lg">{item}</Typography>
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

          {showOtherInput && (
            <View>
              {!showOtherInputField ? (
                <Pressable
                  onPress={() => setShowOtherInputField(true)}
                  style={{
                    backgroundColor: "#2C2C2D",
                    paddingVertical: 16,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                  }}
                >
                  <Text className="text-lg text-foreground">
                    {otherButtonText}
                  </Text>
                </Pressable>
              ) : (
                <TextInput
                  ref={input_ref}
                  autoFocus
                  // onBlur={() => setShowOtherInputField(false)} // Hide input when user taps outside
                  placeholder={otherPlaceholder}
                  placeholderTextColor="#999"
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
                  onSubmitEditing={handleOtherSubmit} // Just hide the input field
                />
              )}
            </View>
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
