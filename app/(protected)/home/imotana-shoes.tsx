import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import shoe from "@/assets/images/imotana-shoe-new.png";
import { Layout } from "@/components/layout/layout";
import logo from "@/assets/images/logoxlogo.png";
import { useLanguageStore } from "@/store/language";

export default function ShoeShopScreen() {
  const { isGerman } = useLanguageStore();
  return (
    <Layout avoidTabbar noPadding scrollable className="bg-backgroundDark">
      {/* Header Section */}
      <View className="relative">
        <LinearGradient
          colors={["transparent", "rgba(98, 160, 123, 0.3)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute inset-0 z-[10]"
        />
        <View className="mt-36 px-6">
          <Text className="text-white text-3xl font-bold">DOMINATE</Text>
          <Text className="text-white text-3xl font-bold">THE GAME</Text>
        </View>
        <Image source={shoe} className="w-full h-[250px]" resizeMode="cover" />
      </View>

      {/* Brand Logos */}
      <View className="relative p-6 items-center bg-background">
        <Text className="text-gray-400 absolute top-8">X</Text>
        <Image className="" source={logo} style={{ width: 420, height: 40 }} />
      </View>

      {/* Description */}
      <View className="mt-6 flex-row px-8 justify-center">
        <Text className="text-white text-center leading-8 text-xl">
          {isGerman()
            ? "Dank unserer Partnerschaft mit Imotana erhältst du Fußballschuhe, die individuell auf deinen Fuß angepasst werden."
            : "Grazie alla nostra partnership con Imotana, riceverai delle scarpe da calcio realizzate su misura per il tuo piede."}
        </Text>
      </View>

      {/* Product Grid */}
      <View className="flex-row flex-wrap justify-between mt-6">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <TouchableOpacity
              key={i}
              className="bg-[#111] rounded-2xl p-3 mb-4 w-[48%]"
            >
              <Image
                source={shoe}
                className="w-full h-24 rounded-xl"
                resizeMode="contain"
              />
              <Text className="text-white mt-2">Product Name</Text>
              <Text className="text-gray-400">$123</Text>
              <View className="mt-1 bg-green-600 w-3 h-3 rounded-full" />
            </TouchableOpacity>
          ))}
      </View>

      {/* Badges */}
      <View className="flex-row flex-wrap gap-2 mt-4">
        <Text className="bg-[#222] text-white px-4 py-1 rounded-full">
          3D Technologie
        </Text>
        <Text className="bg-[#222] text-white px-4 py-1 rounded-full">
          Made in Italy
        </Text>
      </View>

      {/* Bottom Feature Section */}
      <View className="mt-8">
        <Image
          source={shoe}
          className="w-full h-40 rounded-xl"
          resizeMode="contain"
        />
        <View className="flex-row flex-wrap gap-2 mt-3">
          <Text className="bg-[#222] text-white px-4 py-1 rounded-full">
            No size needed
          </Text>
          <Text className="bg-[#222] text-white px-4 py-1 rounded-full">
            Best Performance
          </Text>
        </View>
      </View>
    </Layout>
  );
}
