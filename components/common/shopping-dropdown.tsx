import { useLanguageStore } from "@/store/language";
import { Dropdown } from "react-native-element-dropdown";
import { Typography } from "../ui/typography";
import { View } from "react-native";

type Data = {
    label: string;
    value: string;
};

type Props = {
    placeHolder: string;
    list: Data[];
    onChange: (selected: Data) => void;
};

export function ShoppingDropDown({ list, onChange, placeHolder }: Props) {
    return (
        <Dropdown
            labelField="label"
            valueField="value"
            placeholder={placeHolder}
            data={list}
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
                onChange(item.value as Data);
            }}
            style={{
                backgroundColor: "#0D0D0D",
            }}
            renderItem={(item) => (
                <View className="flex-row items-center rounded-none justify-between px-4 bg-backgroundDark py-2 border-b-hairline border-white">
                    <Typography>{item.label}</Typography>
                </View>
            )}
            placeholderStyle={{ fontSize: 14, color: "white" }}
            selectedTextStyle={{ fontSize: 14, color: "white" }}
        />
    );
}
