import React, { useState } from "react";
import { TouchableOpacity, Text, View, FlatList } from "react-native";

type MultiSelectProps = {
    list: string[];
    value: string;
    onChange: (val: string) => void;
};

export default function MultiSelectComponent({
    list,
    value,
    onChange,
}: MultiSelectProps) {
    const [open, setOpen] = useState(false);

    return (
        <View className="relative">
            {/* Selected value */}
            <TouchableOpacity
                onPress={() => setOpen((prev) => !prev)}
                className="border border-muted-background rounded-lg p-3 bg-background"
            >
                <Text className="text-foreground">
                    {value || "Select a country"}
                </Text>
            </TouchableOpacity>

            {/* Dropdown list */}
            {open && (
                <View className="absolute z-10 bg-background border border-muted-background rounded-lg mt-1 w-full">
                    <FlatList
                        data={list}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                className="p-3"
                                onPress={() => {
                                    onChange(item);
                                    setOpen(false);
                                }}
                            >
                                <Text
                                    className={`${value === item ? "text-primary font-bold" : "text-foreground"
                                        }`}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
}
