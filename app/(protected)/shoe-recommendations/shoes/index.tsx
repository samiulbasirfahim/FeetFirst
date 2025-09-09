import { ShoeHeader } from "@/components/common/shoes-header";
import { Layout } from "@/components/layout/layout";
import HERO from "@/assets/svgs/shoes_header.svg";
import shoe from "@/assets/images/imotana-shoe-new.png";
import { useState } from "react";
import { View } from "react-native";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

const products = [
    { name: "Product 1", price: "$123", image: shoe },
    { name: "Product 2", price: "$150", image: shoe },
    { name: "Product 3", price: "$200", image: shoe },
    { name: "Product 4", price: "$99", image: shoe },
    { name: "Product 1", price: "$123", image: shoe },
    { name: "Product 2", price: "$150", image: shoe },
    { name: "Product 3", price: "$200", image: shoe },
    { name: "Product 4", price: "$99", image: shoe },
];

export default function Screen() {
    const [likedItems, setLikedItems] = useState<boolean[]>(
        products.map(() => false),
    );

    const toggleLike = (index: number) => {
        const newLiked = [...likedItems];
        newLiked[index] = !newLiked[index];
        setLikedItems(newLiked);
    };

    const [hero_w, setHero_w] = useState(0);

    return (
        <View className="flex-1 bg-backgroundDark">
            <ShoeHeader />
            <Layout noPadding className="bg-backgroundDark" scrollable avoidTabbar>
                <View className="relative my-6 justify-center px-4 items-center" onLayout={(e) => {
                    setHero_w(e.nativeEvent.layout.width)
                }}>
                    <HERO
                        width={hero_w}
                        height={hero_w * 0.4}
                        style={{
                            transform: [{ scaleX: -1 }],
                        }}
                    />
                    <View className="absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center">
                        <Typography className="text-xl font-bold text-center">
                            Die weltweit fortgeschrittenste Schuhberatung
                        </Typography>
                    </View>
                    <View className="absolute p-4 bg-backgroundDark rounded-full bottom-0 translate-y-1/2 left-8">
                        <Button
                            style={{
                                shadowColor: "#62A07B",
                                elevation: 12,
                                shadowOffset: { width: 0, height: -6 },
                                shadowRadius: 14,
                            }}
                            className="bg-backgroundDark"
                            variant="outline"
                        >
                            Jetzt testen!
                        </Button>
                    </View>
                </View>
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
            </Layout>
        </View>
    );
}
