import React, { useState } from "react";
import { TouchableOpacity, Text, View, FlatList } from "react-native";

type Option = {
    label: string;
    value: string;
};

type MultiSelectProps = {
    list: Option[];
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
};

export default function MultiSelectComponent({
    list,
    value,
    onChange,
    placeholder = "Select a country",
}: MultiSelectProps) {
    const [open, setOpen] = useState(false);

    const selectedItem = list.find((item) => item.value === value);

    return (
        <View className="relative">
            {/* Selected value */}
            <TouchableOpacity
                onPress={() => setOpen((prev) => !prev)}
                className="border border-muted-background rounded-lg p-3 bg-background"
            >
                <Text className="text-foreground">
                    {selectedItem ? selectedItem.label : placeholder}
                </Text>
            </TouchableOpacity>

            {/* Dropdown list */}
            {open && (
                <View className="absolute z-50 bg-background border border-muted-background rounded-lg mt-1 w-full max-h-60">
                    <FlatList
                        data={list}
                        scrollEnabled={false} // ✅ Prevent nested scroll error
                        keyExtractor={(item) => item.value}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                className="p-3"
                                onPress={() => {
                                    onChange(item.value);
                                    setOpen(false);
                                }}
                            >
                                <Text
                                    className={
                                        value === item.value
                                            ? "text-primary font-bold"
                                            : "text-foreground"
                                    }
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
}
