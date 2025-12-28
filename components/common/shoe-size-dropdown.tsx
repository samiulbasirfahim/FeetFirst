import { View, Pressable, FlatList } from "react-native";
import { Typography } from "../ui/typography";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";

type Data = {
    label: string;
    score: number;
    value: string;
};

type Props = {
    list: Data[];
    onChange: (selected: string) => void;
    value?: string | null;
};

export function ShoeSizePicker({ list, onChange, value }: Props) {
    const [open, setOpen] = useState(false);

    const selectedItem = list.find((i) => i.value === value);

    return (
        <View className="relative" pointerEvents="box-none">
            <Pressable
                disabled={list.length === 0}
                onPress={() => setOpen((p) => !p)}
                className="flex-row items-center gap-2 justify-end"
            >
                <Typography className="text-white" variant="titleSecondary">
                    {selectedItem?.label ?? "Größe wählen"}
                </Typography>
                <FontAwesome5 name="chevron-down" size={16} color="white" />
            </Pressable>

            {open && (
                <View
                    className="absolute top-[54px] w-full max-h-[240px] rounded-xl border border-white/20 bg-backgroundDark z-20 overflow-hidden right-0"
                    style={{
                        minWidth: 220,
                        maxWidth: 280,
                        zIndex: 99,
                    }}
                >
                    <FlatList
                        data={list}
                        keyExtractor={(item) => item.value}
                        keyboardShouldPersistTaps="handled"
                        nestedScrollEnabled
                        renderItem={({ item }) => {
                            const selected = item.value === value;

                            return (
                                <Pressable
                                    onPress={() => {
                                        onChange(item.value);
                                        setOpen(false);
                                    }}
                                    className={`flex-row justify-between px-4 py-3 border-b border-white/10 ${selected ? "bg-muted-background" : ""}`}
                                >
                                    <Typography
                                        className={`font-semibold ${selected ? "text-white" : "text-white/80"
                                            }`}
                                    >
                                        {item.label}
                                    </Typography>

                                    <Typography
                                        className={
                                            item.score >= 80 ? "text-green-400" : "text-gray-400"
                                        }
                                    >
                                        {item.score}%
                                    </Typography>
                                </Pressable>
                            );
                        }}
                    />
                </View>
            )}
        </View>
    );
}
