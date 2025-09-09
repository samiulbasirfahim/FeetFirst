import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import shoe from "@/assets/images/imotana-shoe-new.png";
import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import logo from "@/assets/images/logoxlogo.png";
import { useLanguageStore } from "@/store/language";
import Love_filled from "@/assets/svgs/love-filled.svg";
import Love from "@/assets/svgs/love.svg";
import shoeDetail from "@/assets/images/shoe-feat.png";
import footballBg from "@/assets/images/foot-ball-background.png";
import goalKepper from "@/assets/images/goal-keeper.png";
import { Button } from "@/components/ui/button";
import ShoeHeader from "@/components/common/category-header";

export default function ShoeShopScreen() {
  const { isGerman } = useLanguageStore();
  const [likedItems, setLikedItems] = useState<boolean[]>(Array(4).fill(false));

  const toggleLike = (index: number) => {
    setLikedItems((prev) => {
      const newLiked = [...prev];
      newLiked[index] = !newLiked[index];
      return newLiked;
    });
  };
  return (
    <View className="flex-1">

      <ShoeHeader />

      <Layout avoidTabbar noPadding scrollable className="bg-backgroundDark">
        {/* Header Section */}
        <View>
          <View className="relative">
            <LinearGradient
              colors={["transparent", "rgba(98, 160, 123, 0.3)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: 99
              }}
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
        </View>

        {/* Description */}
        <View className="my-6 flex-row px-8 justify-center">
          <Text className="text-white text-center leading-8 text-xl">
            {isGerman()
              ? "Dank unserer Partnerschaft mit Imotana erhältst du Fußballschuhe, die individuell auf deinen Fuß angepasst werden."
              : "Grazie alla nostra partnership con Imotana, riceverai delle scarpe da calcio realizzate su misura per il tuo piede."}
          </Text>
        </View>

        {/* Product Grid */}
        <View className="flex-row flex-wrap justify-between mt-6 px-4">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <TouchableOpacity
                key={i}
                activeOpacity={0.8}
                className="p-3 mb-4 w-[48%] relative"
              >
                <View className="bg-background rounded-3xl py-6">
                  <TouchableOpacity
                    onPress={() => toggleLike(i)}
                    className="absolute top-3 left-3 z-10 p-1"
                  >
                    {likedItems[i] ? (
                      <Love_filled width={24} height={24} />
                    ) : (
                      <Love width={24} height={24} />
                    )}
                  </TouchableOpacity>
                  <Image
                    source={shoe}
                    className="w-full h-24 rounded-xl"
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-white mt-2">Product Name</Text>
                <View className="flex-row justify-between">
                  <Text className="text-primary">$123</Text>
                  <View className="flex-row relative">
                    <View className="mt-1 bg-green-600 size-4 rounded-full left-3 z-1" />
                    <View className="mt-1 bg-green-500 size-4 rounded-full left-2" />
                    <View className="mt-1 bg-green-300 size-4 rounded-full" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>

        <View>
          <Image
            source={shoeDetail}
            className="w-full h-[550px]"
            resizeMode="cover"
          />
        </View>

        <View className="relative">
          <Image
            source={footballBg}
            className="w-full h-[450px]"
            resizeMode="cover"
          />
          <View className="absolute inset-0 flex-1 justify-center items-center px-8">
            <Typography className="text-2xl text-center font-medium w-2/3">
              {isGerman()
                ? "NoSiZENEEDED – Durch neueste Technologie zum perfekten Schuh"
                : "NoSiZENEEDED – L’ultima tecnologia per la scarpa perfetta"}
            </Typography>
          </View>
        </View>

        <View className="py-12">
          <View className="flex-1 px-6 gap-4 mb-4 z-[99]">
            <Typography className="text-2xl text-left font-medium">
              {isGerman()
                ? "Bundesliga-Profis vertrauen darauf – du auch?"
                : "I professionisti della Bundesliga ci credono, e tu?"}
            </Typography>
            <Button
              variant="outline"
              className="bg-primary/10 w-1/3 py-4 rounded-2xl"
            >
              {isGerman() ? "Jetzt kaufen!" : "Acquista ora!"}
            </Button>
          </View>
          <LinearGradient
            colors={["rgba(16, 16, 16, 1)", "rgba(13, 13, 13, 0)"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              zIndex: 99
            }}

            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
          />
          <LinearGradient
            colors={["rgba(16, 16, 16, 0.8)", "rgba(13, 13, 13, 0)"]}
            className="absolute inset-0 z-[10] h-[250px]"
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: "absolute",
              zIndex: 99,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
          <Image
            source={goalKepper}
            className="w-full h-[280px]"
            resizeMode="cover"
          />
        </View>
      </Layout>
    </View>
  );
}
