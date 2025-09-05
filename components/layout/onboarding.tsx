import { Layout } from "./layout";
import CheckBox from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";
import { useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";

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
  const input_ref = useRef<TextInput>(null);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [customOptions, setCustomOptions] = useState<string[]>([]);
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
    const trimmed = otherValue.trim();
    if (trimmed.length > 0) {
      const newCustomOptions = [...customOptions, trimmed];
      setCustomOptions(newCustomOptions);

      if (multiple) {
        const newCheckedValues = [...checkedValues, trimmed];
        setCheckedValues(newCheckedValues);
        onSelectionChange(newCheckedValues);
      } else {
        setSelectedValue(trimmed);
        onSelectionChange([trimmed]);
      }
    }
    setShowOtherInputField(false);
    setOtherValue("");
  };

  const allOptions = [...options, ...customOptions];
  const currentSelection = multiple
    ? checkedValues
    : [selectedValue].filter(Boolean);

  return (
    <Layout scrollable avoidKeyboard edges={["bottom"]}>
      <View style={{ flex: 1, paddingBottom: 24 }}>
        {HeaderComponent && (
          <View style={{ marginBottom: 16 }}>{HeaderComponent}</View>
        )}

        <View style={{ gap: 16 }}>
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
                  <Typography className="flex-1 text-lg">
                    {otherButtonText}
                  </Typography>
                </Pressable>
              ) : (
                <TextInput
                  ref={input_ref}
                  autoFocus
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
                  onSubmitEditing={handleOtherSubmit}
                />
              )}
            </View>
          )}
        </View>

        {FooterComponent && (
          <View style={{ marginTop: 16 }}>{FooterComponent}</View>
        )}
      </View>
    </Layout>
  );
}
