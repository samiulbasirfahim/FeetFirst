import { Dropdown } from "react-native-element-dropdown";
import { Typography } from "../ui/typography";
import { View } from "react-native";

type Data = {
    label: string;
    value: string;
};

type Props = {
    placeHolder?: string;
    list: Data[];
    value?: string;
    onChange: (selected: Data) => void;
};

export function ShoppingDropDown({ list, onChange, value: selectedValue }: Props) {
    return (
        <Dropdown
            labelField="label"
            valueField="value"
            data={list}
            selectedTextProps={{ numberOfLines: 1 }}
            value={selectedValue}
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
            onChange={(item: Data) => {
                onChange(item);
            }}
            style={{
                backgroundColor: "#0D0D0D",
            }}
            renderItem={(item: Data, index) => (
                <View
                    className="flex-row items-center rounded-none justify-between px-4 bg-backgroundDark py-2 border-white"
                    style={{
                        borderBottomWidth: 1,
                        marginBottom: 2,
                    }}
                >
                    <Typography>{item.label}</Typography>
                </View>
            )}
            placeholderStyle={{ fontSize: 14, color: "white" }}
            selectedTextStyle={{ fontSize: 14, color: "white" }}
        />
    );
}
