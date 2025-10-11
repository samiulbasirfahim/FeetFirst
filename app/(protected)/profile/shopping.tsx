import ShoeHeader from "@/components/common/category-header";
import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { FlatList, Image, View } from "react-native";
import { ShoppingDropDown } from "@/components/common/shopping-dropdown";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const categories = [
  { it: "SNEAKER", de: "Sneakers", slug: "casual-sneaker" },
  { it: "SCRPE ELEGANTI", de: "ELEGANTE SCHUHE", slug: "elegant-shoes" },
  { it: "SCARPE COMODE", de: "Bequeme Schuhe", slug: "comfortable-shoes" },
  { it: "SANDALI", de: "WARTEN", slug: "sandals" },
  { it: "SCARPE DA LAVORO", de: "ARBEITSSCHUHE", slug: "work-shoes" },
  { it: "VARIE", de: "VERSCHIEDENES", slug: "miscellaneous" },
  { it: "SCARPE DA RUNNING", de: "LAUFSCHUHE", slug: "running-shoes" },
  { it: "SCARPE DA CICLISMO", de: "RADSCHUHE", slug: "cycling-shoes" },
  { it: "SCARPE HOCKEY", de: "SCARPE HOCKEY", slug: "hockey-shoes" },
  { it: "SCARPONI DA SCE", de: "SKISTIEFEL", slug: "ski-boots" },
  { it: "SCARPE DA BASKET", de: "BASKETBALLSCHUHE", slug: "basketball-shoes" },
  { it: "SCARPE DA GOLF", de: "GOLFSCHUHE", slug: "golf-shoes" },
  { it: "SCARPE DA CALCIO", de: "FUSSBALLSCHUHE", slug: "football-shoes" },
  { it: "SCARPE TENNIS", de: "TENNISSCHUHE", slug: "tennis-shoes" },
  { it: "SCARPE DA ARRAMPICATA", de: "Kletterschuhe", slug: "climbing-shoes" },
];

const orders = [
  {
    id: "1",
    title: "Saucony Ride 15 TR Blue",
    category: "Laufschuhe - Herren",
    size: "Größe 42,5 / Weite Standard",
    delivered: "10.04.2025",
    fit: "90%",
    image: "https://i.ibb.co/s6FCgxw/shoe.png", // replace with your own shoe image URL
  },

  {
    id: "3",
    title: "Saucony Ride 15 TR Blue",
    category: "Laufschuhe - Herren",
    size: "Größe 42,5 / Weite Standard",
    delivered: "10.04.2025",
    fit: "90%",
    image: "https://i.ibb.co/s6FCgxw/shoe.png",
  },

  {
    id: "2",
    title: "Saucony Ride 15 TR Blue",
    category: "Laufschuhe - Herren",
    size: "Größe 42,5 / Weite Standard",
    delivered: "10.04.2025",
    fit: "90%",
    image: "https://i.ibb.co/s6FCgxw/shoe.png",
  },
];

const OrderCard = ({ item }: { item: (typeof orders)[0] }) => {
  const { isGerman } = useLanguageStore();
  return (
    <View className="flex-1 flex-row gap-2">
      <View className="flex-1">
        <Typography variant="selected" className="text-white mb-3">
          {item.title}
        </Typography>
        <Typography className="text-sm font-semibold">{item.size}</Typography>
        <Typography className="text-sm">
          Delivered on {isGerman() ? "Geliefert am" : "Consegnato il"}{" "}
          {item.delivered}
        </Typography>

        <Button
          className="bg-white rounded-none my-2"
          textClassName="text-sm text-black"
        >
          {isGerman() ? "Nochmal neu bestellen" : "Ordina di nuovo"}
        </Button>
        <Button
          className="bg-primary rounded-none"
          textClassName="text-sm text-white"
        >
          {isGerman() ? "Jetzt Kauf bewerten" : "Valuta ora il tuo acquisto"}
        </Button>
      </View>
      <View className="flex-1 justify-between items-end">
        <Image
          source={{
            uri: "https://images.pexels.com/photos/1537671/pexels-photo-1537671.jpeg",
          }}
          style={{ width: "100%", height: 80, resizeMode: "cover" }}
        />
        <View className="bg-primary absolute top-0 rounded-xl px-2 -translate-y-1/2">
          <Typography className="text-white font-semibold">
            {item.fit} Fit
          </Typography>
        </View>

        <Button
          variant="outline"
          className="border-white rounded-none"
          textClassName="text-white"
        >
          {isGerman() ? "Bestellung verfolgen" : "Traccia l'ordine"}
        </Button>
      </View>
    </View>
  );
};

export default function Screen() {
  const { isGerman } = useLanguageStore();

  const [category_list] = useState(() => {
    return categories.map((category) => ({
      label: isGerman() ? category.de : category.it,
      value: category.slug,
    }));
  });

  return (
    <Layout noPadding className="bg-backgroundDark">
      <ShoeHeader />

      <View className="p-3 gap-4">
        <Typography className="text-white" variant="title">
          {isGerman() ? "Einkäufe" : "Acquisti"}
        </Typography>

        <ShoppingDropDown
          placeHolder={
            isGerman() ? "Vom gesamten letzten Jahr" : "Dall'intero ultimo anno"
          }
          onChange={(data) => {
            console.log(data);
          }}
          list={[
            { label: "2025", value: "2025" },
            { label: "2024", value: "2024" },
            { label: "2023", value: "2023" },
            { label: "2022", value: "2022" },
            { label: "2021", value: "2021" },
            { label: "2020", value: "2020" },
          ]}
        />

        <ShoppingDropDown
          placeHolder={isGerman() ? "Alle Kategorien" : "Tutte le categorie"}
          onChange={(data) => {
            console.log(data);
          }}
          list={category_list}
        />
      </View>

      <FlatList
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 12,
          marginTop: 20,
        }}
        ItemSeparatorComponent={() => (
          <View className="h-12 flex-1 justify-center">
            <View className="h-[1px] bg-muted-foreground"></View>
          </View>
        )}
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderCard item={item} />}
      />
    </Layout>
  );
}
