import { Layout } from "@/components/layout/layout";
import { useLanguageStore } from "@/store/language";
import { AntDesign } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type LocalizedText = {
  de: string;
  it: string;
};

type Shoe = {
  id: string;
  name: LocalizedText;
  type: LocalizedText;
  fit_score: string;
  image: number; // require() returns a number for local assets
  favorite: boolean;
};

const initialShoes: Shoe[] = [
  {
    id: "1",
    name: {
      de: "Saucony Ride 15 TR",
      it: "Saucony Ride 15 TR",
    },
    type: {
      de: "Laufschuhe – Herren",
      it: "Scarpe da Running – Uomo",
    },
    fit_score: "90%",
    image: require("@/assets/images/shoe1.png"),
    favorite: true,
  },
  {
    id: "2",
    name: {
      de: "Asics Gel Nimbus 26",
      it: "Asics Gel Nimbus 26",
    },
    type: {
      de: "Laufschuhe – Herren",
      it: "Scarpe da Running – Uomo",
    },
    fit_score: "80%",
    image: require("@/assets/images/shoe2.png"),
    favorite: true,
  },
  {
    id: "3",
    name: {
      de: "Asics Gel Nimbus 26",
      it: "Asics Gel Nimbus 26",
    },
    type: {
      de: "Laufschuhe – Herren",
      it: "Scarpe da Running – Uomo",
    },
    fit_score: "80%",
    image: require("@/assets/images/shoe2.png"),
    favorite: true,
  },
  {
    id: "4",
    name: {
      de: "Asics Gel Nimbus 26",
      it: "Asics Gel Nimbus 26",
    },
    type: {
      de: "Laufschuhe – Herren",
      it: "Scarpe da Running – Uomo",
    },
    fit_score: "80%",
    image: require("@/assets/images/shoe2.png"),
    favorite: true,
  }
];

export default function FavoriteShoes() {
  const { isGerman } = useLanguageStore();
  const [shoes, setShoes] = useState<Shoe[]>(initialShoes);

  const favoriteShoes = useMemo(
    () => shoes.filter((shoe: Shoe) => shoe.favorite),
    [shoes]
  );

  const getLocalizedText = useCallback(
    (text: LocalizedText): string => {
      return isGerman() ? text.de : text.it;
    },
    [isGerman]
  );

  const renderShoeItem = useCallback(
    ({ item }: { item: Shoe }) => (
      <TouchableOpacity
        className="bg-background rounded-2xl shadow-lg flex-1 mx-1 mb-4 overflow-hidden"
        activeOpacity={0.8}
      >
        {/* Image Container */}
        <View className="relative">
          <Image
            source={item.image}
            className="w-3/4 h-36 left-6 top-6"
            resizeMode="contain"
          />

          {/* Favorite Heart */}
          <TouchableOpacity
            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md"
          >
            <AntDesign name="heart" size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="p-4">
          {/* Shoe Name */}
          <Text
            className="text-white font-bold"
            numberOfLines={2}
          >
            {getLocalizedText(item.name)}
          </Text>

          {/* Shoe Type */}
          <Text
            className="text-muted-foreground text-sm mb-3"
            numberOfLines={1}
          >
            {getLocalizedText(item.type)}
          </Text>

          {/* Bottom Row */}
          <View className="flex-row justify-between items-center">
            {/* Fit Score */}
            <View
              className={`bg-primary px-3 py-1 rounded-xl`}
            >
              <Text className="text-white text-xs font-bold">
                {item.fit_score} FIT
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [getLocalizedText]
  );

  const renderEmptyState = useCallback(
    () => (
      <View className="flex-1 justify-center items-center py-20">
        <AntDesign name="hearto" size={64} color="#6b7280" />
        <Text className="text-muted-foreground text-lg font-medium mt-4 text-center">
          {isGerman() ? "Keine Favoriten gefunden" : "Nessun preferito trovato"}
        </Text>
        <Text className="text-muted-foreground text-sm mt-2 text-center px-8">
          {isGerman()
            ? "Füge Schuhe zu deinen Favoriten hinzu, um sie hier zu sehen"
            : "Aggiungi scarpe ai tuoi preferiti per vederle qui"}
        </Text>
      </View>
    ),
    [isGerman]
  );

  return (
    <Layout className="bg-backgroundDark">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1
        }}
      >

        {favoriteShoes.length === 0 ? (
          renderEmptyState()
        ) : (
          <FlatList
            data={favoriteShoes}
            renderItem={renderShoeItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
          />
        )}
      </ScrollView>
    </Layout>
  );
}
