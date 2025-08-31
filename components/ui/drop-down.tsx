import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Typography } from "./typography";

type Props = {
  list: string[];
  title?: string;
};

type Data = {
  label: string;
  value: number;
};

const MultiSelectComponent = ({ list, title }: Props) => {
  const [data, setData] = useState<Data[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    setData(list.map((l, i) => ({ label: l, value: i })));
  }, [list]);

  const renderItem = (item: Data) => (
    <View className="flex-row items-center rounded-xl justify-between px-4 py-3 bg-muted-background">
      <Typography >{item.label}</Typography>
    </View>
  );

  return (
    <View className="w-full gap-2">
      <Typography className="text-title">{title}</Typography>
      <Dropdown
        style={{
          borderRadius: 12,
          paddingVertical: 14,
          paddingHorizontal: 10,
          backgroundColor: "#303231",
        }}
        placeholderStyle={{ fontSize: 16, color: "#585C5B" }}
        selectedTextStyle={{ fontSize: 14, color: "#BAC4C6" }}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        value={selected}
        itemContainerStyle={{
            backgroundColor: "transparent",
            padding: 0,
            borderRadius: 12
        }}
        containerStyle={{
            backgroundColor: "#303231",
            padding: 4,
            gap: 4,

            borderWidth: 0,
            borderRadius: 12
        }}
        searchPlaceholder="Search..."
        onChange={(item) => setSelected(item.value)}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MultiSelectComponent;
