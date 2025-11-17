import Arrow from "@/assets/svgs/arrow-down.svg";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Typography } from "../ui/typography";

type Data = {
    label: string;
    score: number;
    value: string;
};
type Props = {
    list: Data[];
    onChange: (selected: string) => void;
    value?: string;
};

export function ShoeSizePicker({ list, onChange, value: defaultValue }: Props) {
    return (
        <Dropdown
            labelField="label"
            valueField="value"
            placeholder={list.length > 0 ? list[0].label : "N/A"}
            renderRightIcon={() => <Arrow />}
            data={list}
            value={defaultValue}
            disable={list.length === 0}
            itemContainerStyle={{
                backgroundColor: "#0D0D0D",
                padding: 0,
                borderRadius: 12,
            }}
            containerStyle={{
                backgroundColor: "#0D0D0D",
                gap: 4,
                borderWidth: 0,
                overflow: "hidden",
            }}
            onChange={(item) => {
                onChange(item.value as string);
            }}
            autoScroll={true}
            showsVerticalScrollIndicator={false}
            renderItem={(item, selected) => (
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "white",
                        backgroundColor: selected ? "#303231" : "transparent",
                    }}
                    className="flex-row items-center rounded-none justify-start px-4 bg-backgroundDark py-2 w-[140px] gap-4"
                >
                    <Typography
                        style={{
                            fontWeight: selected ? "700" : "500",
                            fontSize: 20,
                        }}
                    >
                        {item.label}
                    </Typography>
                    <Typography
                        style={{
                            fontStyle: "italic",
                            fontSize: 12,
                        }}
                    >
                        -{item.score}
                    </Typography>
                </View>
            )}
            placeholderStyle={{
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
                textAlign: "right",
            }}
            selectedTextStyle={{
                fontSize: 18,
                color: "white",
                fontWeight: "bold",
                textAlign: "right",
            }}
        />
    );
}
