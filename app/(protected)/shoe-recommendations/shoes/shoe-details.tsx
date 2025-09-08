import { View, Text, Image } from "react-native";
import React from "react";
import { Layout } from "@/components/layout/layout";
import { useLocalSearchParams } from "expo-router";
import shoe1 from "@/assets/images/shoe1.png";
import { Typography } from "@/components/ui/typography";

const shoe = {
  image: shoe1,
  productName: "SAUCONY RIDE 15 TR",
  category: "Scorpe da Running - Uomo",
  price: "EUR 149,99",
  colorsAvailable: ["yellow", "black", "green"],
  discount: "90%",
  sizeAvailable: ["L", "M"],
};

export default function Screen() {
  const category = useLocalSearchParams();

  return (
    <Layout scrollable noPadding className="p-6">
      <View>
        <Image
          className="w-full h-[250px]"
          resizeMode="cover"
          source={shoe.image}
        />
      </View>
      <View className="flex gap-2">
        <Typography className="text-2xl font-bold">
          {shoe.productName}
        </Typography>
        <Typography className="text-xl">{shoe.category}</Typography>
        <Typography className="text-xl font-bold">{shoe.price}</Typography>
      </View>

      <View className="flex-row h-[250px] w-full gap-3">
        <Image
          className="flex-1 rounded-lg"
          resizeMode="cover"
          source={shoe.image}
        />
        <Image
          className="flex-1 rounded-lg"
          resizeMode="cover"
          source={shoe.image}
        />
        <Image
          className="flex-1 rounded-lg"
          resizeMode="cover"
          source={shoe.image}
        />
      </View>
    </Layout>
  );
}
