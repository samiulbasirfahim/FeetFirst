import { Dropdown } from "react-native-element-dropdown";
import ShoeHeader from "@/components/common/category-header";
import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { View } from "react-native";

export default function Screen() {
  const { isGerman } = useLanguageStore();
  return (
    <Layout noPadding className="bg-backgroundDark">
      <ShoeHeader />

      <View className="p-3 gap-3">
        <Typography className="text-white">
          {isGerman() ? "Einkäufe" : "Acquisti"}
        </Typography>

        <Dropdown
          labelField="label"
          valueField="value"
          placeholder={
            isGerman() ? "Vom gesamten letzten Jahr" : "Dall'intero ultimo anno"
          }
          data={[
            { label: "2025", value: "2025" },
            { label: "2024", value: "2024" },
            { label: "2023", value: "2023" },
            { label: "2022", value: "2022" },
            { label: "2021", value: "2021" },
            { label: "2020", value: "2020" },
          ]}
          itemContainerStyle={{
            backgroundColor: "transparent",
            padding: 0,
            borderRadius: 12,
          }}
          containerStyle={{
            backgroundColor: "#0D0D0D",
            padding: 4,
            gap: 4,
            borderWidth: 0,
            borderRadius: 12,
          }}
          onChange={(item) => {
            console.log("Selected:", item.value);
          }}
          style={{
            backgroundColor: "#0D0D0D",
          }}
          renderItem={(item) => (
            <View className="flex-row items-center rounded-xl justify-between px-4 py-3 bg-muted-background">
              <Typography>{item.label}</Typography>
            </View>
          )}
          placeholderStyle={{ fontSize: 14, color: "white" }}
          selectedTextStyle={{ fontSize: 14, color: "white" }}
        />
      </View>
    </Layout>
  );
}
