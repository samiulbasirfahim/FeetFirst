import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Layout } from "@/components/layout/layout";
import shoe1 from "@/assets/images/shoe1.png";
import { Typography } from "@/components/ui/typography";
import logo from "@/assets/images/feetfast-full-logo.png";
import Arrow from "@/assets/svgs/arrow-down.svg";
import { useLanguageStore } from "@/store/language";
import goreTex from "@/assets/images/gore-tex.png";
import ultralight from "@/assets/images/ultralight.png";
import pronation from "@/assets/images/pronation.png";
import Love from "@/assets/svgs/love.svg";
import Collapsible from "react-native-collapsible";

import HERO from "@/assets/svgs/shoes_header.svg";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { VersionInfo } from "@/components/common/version";
import { AutoImage } from "@/components/ui/auto-image";

const shoe = {
    image: shoe1,
    productName: "SAUCONY RIDE 15 TR",
    category: "Scorpe da Running - Uomo",
    price: "EUR 149,99",
    colorsAvailable: ["yellow", "black", "green"],
    discount: "90%",
    sizeAvailable: ["L", "M"],
};

const products = [
    { name: "Product 1", price: "$123", image: shoe1 },
    { name: "Product 2", price: "$150", image: shoe1 },
];

export default function Screen() {
    const { isGerman } = useLanguageStore();
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

    const toggleAccordion = (section: string) => {
        setActiveAccordion(activeAccordion === section ? null : section);
    };

    const [likedItems, setLikedItems] = useState<boolean[]>(
        products.map(() => false),
    );

    const toggleLike = (index: number) => {
        const newLiked = [...likedItems];
        newLiked[index] = !newLiked[index];
        setLikedItems(newLiked);
    };

    return (
        <Layout scrollable noPadding avoidTabbar className="p-6 bg-backgroundDark">
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
                <Typography className="text-xl font-bold text-primary">
                    {shoe.price}
                </Typography>
            </View>

            {/* variants */}
            <View className="flex-row w-full gap-3">
                {Array(3)
                    .fill(null)
                    .map((_) => (
                        <View className="p-2 h-[80px] bg-muted-background rounded-2xl flex-1">
                            <Image
                                className="h-[80px] w-full rounded-lg"
                                resizeMode="cover"
                                source={shoe.image}
                            />
                        </View>
                    ))}
            </View>

            <View className="bg-muted-background p-4 rounded-2xl flex-row justify-between">
                <AutoImage height={36} source={logo} />
                <View className="h-9 justify-center">
                    <View className="flex-row items-center gap-2">
                        <Typography className="text-2xl text-white font-bold">
                            36
                        </Typography>
                        <Arrow />
                    </View>
                    <Typography>90% FIT</Typography>
                </View>
            </View>

            {/* cart */}
            <View className="flex-row gap-6">
                <TouchableOpacity className="border border-white p-4 rounded-2xl flex-1 items-center">
                    <Typography className="text-white text-2xl">
                        {isGerman()
                            ? "In den warenkorb".toUpperCase()
                            : "Aggiungi al carrello".toUpperCase()}
                    </Typography>
                </TouchableOpacity>
                <TouchableOpacity className="flex items-center justify-center">
                    <View className="border border-white p-4 rounded-2xl">
                        <Love width={24} height={24} />
                    </View>
                </TouchableOpacity>
            </View>

            {/* 2D */}

            <View className="my-4 flex gap-4">
                <Typography className="text-white text-2xl">
                    {isGerman() ? "Retouren ohne Probleme" : "Restituisce senza problemi"}
                </Typography>
                <Typography className="text-white leading-8">
                    {isGerman()
                        ? "FeetF1rst gewährleistet eine perfekte Passform und bietet daher ein 30-tägiges Rückgaberecht, bei dem wir die Rücksendekosten übernehmen."
                        : "FeetF1rst garantisce una vestibilità perfetta e pertanto offre una politica di reso di 30 giorni, durante la quale copriamo le spese di spedizione per il reso."}
                </Typography>
            </View>

            {/* material features */}
            <View className="flex-1 gap-4 my-4">
                <View className="flex-row gap-4">
                    <View className="bg-white rounded-xl p-2">
                        <Image source={ultralight} className="w-[40px] h-[40px]" />
                    </View>
                    <Typography className="flex-1">
                        <Text className="font-bold text-lg">Gore-Tex®</Text> –
                        {isGerman()
                            ? "Wasserdicht und atmungsaktiv durch eine spezielle Membran"
                            : "Impermeabile e traspirante grazie a una speciale membrana"}
                    </Typography>
                </View>
                <View className="flex-row gap-4">
                    <View className="bg-white rounded-xl p-2">
                        <Image source={ultralight} className="w-[40px] h-[40px]" />
                    </View>
                    <Typography className="flex-1">
                        <Text className="font-bold text-lg">Ultra Light</Text> –
                        {isGerman()
                            ? "Besonders leicht für maximalen Komfort"
                            : "Extra leggero per il massimo comfort"}
                    </Typography>
                </View>
                <View className="flex-row gap-4">
                    <View className="bg-white rounded-xl p-2">
                        <Image source={pronation} className="w-[40px] h-[40px]" />
                    </View>
                    <Typography className="flex-1">
                        <Text className="font-bold text-lg">Pronation</Text> –
                        {isGerman()
                            ? "Stabilisiert den Fuß bei Überpronation"
                            : "Supporto per la pronazione: stabilizza il piede in caso di iperpronazione"}
                    </Typography>
                </View>
            </View>

            {/* product information */}
            <View className="flex gap-4 my-4">
                <TouchableOpacity onPress={() => toggleAccordion("description")}>
                    <Typography className="text-white text-2xl border-b border-white pb-3">
                        {isGerman() ? "Produktbeschreibung" : "Descrizione del prodotto"}
                    </Typography>
                    <Collapsible collapsed={activeAccordion !== "description"}>
                        <Text className="text-gray-400 mb-3 mt-3">
                            Hier könnten Inhalte für stehen…
                        </Text>
                    </Collapsible>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleAccordion("technical")}>
                    <Typography className="text-white text-2xl border-b border-white pb-3">
                        {isGerman() ? "Technische Daten" : "Dati tecnici"}
                    </Typography>
                    <Collapsible collapsed={activeAccordion !== "technical"}>
                        <Text className="text-gray-400 mb-3 mt-3">
                            Hier könnten Inhalte für stehen…
                        </Text>
                    </Collapsible>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleAccordion("info")}>
                    <Typography className="text-white text-2xl border-b border-white pb-3">
                        {isGerman() ? "Weitere Informationen" : "Ulteriori informazioni"}
                    </Typography>
                    <Collapsible collapsed={activeAccordion !== "info"}>
                        <Text className="text-gray-400 mb-3 mt-3">
                            Hier könnten Inhalte für stehen…
                        </Text>
                    </Collapsible>
                </TouchableOpacity>
            </View>

            {/* Recommendation */}
            <View className="my-4">
                <Typography className="text-white text-xl">
                    {isGerman()
                        ? "Diese Modelle empfehlen wir dir auch:"
                        : "Consigliamo anche questi modelli:"}
                </Typography>
                <View className="flex-row flex-wrap justify-between mt-6 px-4">
                    {products.map((product, i) => (
                        <ProductCard
                            key={i}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            liked={likedItems[i]}
                            onToggleLike={() => toggleLike(i)}
                        />
                    ))}
                </View>
            </View>

            <View className="my-4">
                <Typography className="text-white text-2xl mb-2">
                    Your Foot Measures
                </Typography>

                <View className="bg-muted-background py-4 px-6 rounded-2xl">
                    <Typography className="text-white text-lg border-b border-muted-foreground pb-2">
                        Measure
                    </Typography>

                    <View className="flex-row justify-between my-2">
                        <Typography>Footlength</Typography>
                        <Typography>25.7cm</Typography>
                        <Typography>24.2cm</Typography>
                    </View>

                    <View className="flex-row justify-between my-2">
                        <Typography>Width</Typography>
                        <Typography>25.7cm</Typography>
                        <Typography>24.2cm</Typography>
                    </View>

                    <View className="flex-row justify-between my-2">
                        <Typography>Hight</Typography>
                        <Typography>25.7cm</Typography>
                        <Typography>24.2cm</Typography>
                    </View>
                </View>
            </View>

            <VersionInfo />
        </Layout>
    );
}
