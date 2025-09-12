import Arrow from "@/assets/svgs/arrow-down.svg";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Typography } from "../ui/typography";

type Data = {
    label: string;
    value: string;
};
type Props = {
    list: Data[];
    onChange: (selected: Data) => void;
};

export function ShoeSizePicker({ list, onChange }: Props) {
    return (
        <Dropdown
            labelField="label"
            valueField="value"
            placeholder={list[0].label}
            renderRightIcon={() => <Arrow />}
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
            renderItem={(item) => (
                <View className="flex-row items-center rounded-none justify-between px-4 bg-backgroundDark py-2 border-b-hairline border-white w-[140px]">
                    <Typography>{item.label}</Typography>
                </View>
            )}
            placeholderStyle={{ fontSize: 18, fontWeight: "bold", color: "white" }}
            selectedTextStyle={{ fontSize: 18, color: "white", fontWeight: "bold" }}
        />
    );
}
