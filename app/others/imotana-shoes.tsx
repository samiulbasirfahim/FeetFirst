import shoe1 from "@/assets/images/shoe1.png";
import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    useWindowDimensions,
} from "react-native";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import shoe from "@/assets/images/imotana-shoe-new.png";
import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import logo from "@/assets/images/logoxlogo.png";
import { useLanguageStore } from "@/store/language";
import footballBg from "@/assets/images/foot-ball-background.png";
import goalKepper from "@/assets/images/goal-keeper.png";
import { Button } from "@/components/ui/button";
import { VersionInfo } from "@/components/common/version";
import { useDrawerHeader } from "@/components/common/drawer-header";
import { router } from "expo-router";
import ShoeBg from "@/assets/svgs/imotana_ling_bg.svg";
import ImotanaBlur from "@/components/ui/blur-imotana";
import Point from "@/assets/svgs/point_imotana.svg";
import Svg, { Defs, Polygon, Stop, LinearGradient } from "react-native-svg";
import { ProductCard } from "@/components/common/ProductCard";
import { useTopShoes } from "@/lib/queries/products";

const products = [
    { name: "Product 1", price: "$123", image: shoe1 },
    { name: "Product 2", price: "$150", image: shoe1 },
];

export default function ShoeShopScreen() {
    const { width: screen_width } = useWindowDimensions();
    const { isGerman } = useLanguageStore();
    const [likedItems, setLikedItems] = useState<boolean[]>(Array(4).fill(false));

    const { shoeList, isPending, error } = useTopShoes(10);

    const { HeaderComponent, onScroll, height } = useDrawerHeader({
        threeshold: 100,
        shouldGoBack: true,
    });

    const toggleLike = (index: number) => {
        setLikedItems((prev) => {
            const newLiked = [...prev];
            newLiked[index] = !newLiked[index];
            return newLiked;
        });
    };
    return (
        <View className="flex-1">
            {HeaderComponent}

            <Layout
                avoidTabbar
                noPadding
                onScroll={onScroll}
                scrollable
                className="bg-backgroundDark"
                style={{
                    marginTop: -height,
                }}
            >
                {/* Header Section */}
                <View>
                    <View className="relative">
                        <ExpoLinearGradient
                            pointerEvents="none"
                            colors={["transparent", "rgba(98, 160, 123, 0.3)"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                zIndex: 99,
                            }}
                        />
                        <View className="mt-36 px-6">
                            <Text className="text-white text-3xl font-bold">DOMINATE</Text>
                            <Text className="text-white text-3xl font-bold">THE GAME</Text>
                        </View>
                        <Image
                            source={shoe}
                            className="w-full h-[250px]"
                            resizeMode="cover"
                        />
                    </View>

                    {/* Brand Logos */}
                    <View className="relative p-6 items-center bg-background">
                        <Text className="text-gray-400 absolute top-8">X</Text>
                        <Image
                            className=""
                            source={logo}
                            style={{ width: 420, height: 40 }}
                        />
                    </View>
                </View>

                {/* Description */}
                <View className="my-6 flex-row px-8 justify-center">
                    <Text className="text-white text-center leading-8 text-xl font-semibold">
                        {isGerman()
                            ? "Dank unserer Partnerschaft mit Imotana erhältst du Fußballschuhe, die individuell auf deinen Fuß angepasst werden."
                            : "Grazie alla nostra partnership con Imotana, riceverai delle scarpe da calcio realizzate su misura per il tuo piede."}
                    </Text>
                </View>

                {!error && !isPending && shoeList.length > 0 && (
                    <View className="flex-row flex-wrap justify-between mt-6 px-4">
                        {shoeList.map((product, i) => (
                            <ProductCard
                                key={i}
                                id={product.id}
                                image={product.image}
                                itemName={product.itemName}
                                price={product.price}
                                liked={likedItems[i]}
                                onToggleLike={() => toggleLike(i)}
                            />
                        ))}
                    </View>
                )}
                <View className="mt-10">
                    <ImotanaBlur
                        size={500}
                        radius={300}
                        color="#5c5340"
                        style={{ left: screen_width - 300, top: -20 }}
                    />
                    <ShoeBg />
                    <Image
                        source={require("@/assets/images/imotana_shoe_features.png")}
                        style={{
                            position: "absolute",
                            width: 300,
                            height: 170,
                            zIndex: 999,
                        }}
                        className="left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 "
                    />
                    <View className="absolute ">
                        <View className="flex-row relative top-[80px] left-[30px] ">
                            <View className="px-4 py-3  rounded-full bg-[#1C1C1C] absolute  border border-primary">
                                <Typography className="text-sm ">3D Technologie</Typography>
                                <View
                                    className="absolute left-1/2 top-8 z-50 "
                                    style={{
                                        transform: [{ translateX: 5 }],
                                    }}
                                >
                                    <Point />
                                    <View
                                        style={{
                                            position: "absolute",
                                            top: 10, // start right under the Point
                                            left: 1,
                                            zIndex: 0,
                                        }}
                                    >
                                        <Svg height={120} width={28} viewBox="0 0 40 340">
                                            <Defs>
                                                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                                    <Stop
                                                        offset="0%"
                                                        stopColor="#62A07B"
                                                        stopOpacity={1}
                                                    />
                                                    <Stop
                                                        offset="100%"
                                                        stopColor="#62A07B"
                                                        stopOpacity={0.2}
                                                    />
                                                </LinearGradient>
                                            </Defs>

                                            {/* Upright triangle: narrow at top, wide at bottom */}
                                            <Polygon points="2,0 20,0 8,300" fill="url(#grad)" />
                                        </Svg>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View className="flex-row relative top-[30px] left-[200px]">
                            <View className="px-4 py-3  rounded-full bg-[#1C1C1C] absolute  border border-primary">
                                <Typography className="text-sm ">Made In Italy</Typography>
                                <View
                                    className="absolute left-1/2 top-8"
                                    style={{
                                        transform: [{ translateX: 4 }],
                                    }}
                                >
                                    <Point />
                                    <View
                                        style={{
                                            position: "absolute",
                                            top: 10, // start right under the Point
                                            left: 4,
                                            zIndex: 0,
                                        }}
                                    >
                                        <Svg height={200} width={22} viewBox="0 0 40 360">
                                            <Defs>
                                                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                                    <Stop
                                                        offset="0%"
                                                        stopColor="#62A07B"
                                                        stopOpacity={1}
                                                    />
                                                    <Stop
                                                        offset="100%"
                                                        stopColor="#62A07B"
                                                        stopOpacity={0.2}
                                                    />
                                                </LinearGradient>
                                            </Defs>

                                            {/* Upright triangle: narrow at top, wide at bottom */}
                                            <Polygon points="8,0 20,0 8,300" fill="url(#grad)" />
                                        </Svg>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View className="flex-row relative top-[330px] left-[190px]">
                            <View className="px-4 py-3  rounded-full bg-[#1C1C1C] absolute  border border-primary">
                                <Typography className="text-sm ">Best Performance</Typography>
                                <View
                                    className="absolute left-1/2 -top-4"
                                    style={{
                                        transform: [{ translateX: 4 }],
                                    }}
                                >
                                    <Point />
                                    <View
                                        style={{
                                            position: "absolute",
                                            bottom: 10,
                                            left: 7,
                                            zIndex: 0,
                                        }}
                                    >
                                        <Svg height={60} width={10} viewBox="0 0 20 150">
                                            <Defs>
                                                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                                    <Stop
                                                        offset="0%"
                                                        stopColor="#62A07B"
                                                        stopOpacity={0.2}
                                                    />
                                                    <Stop
                                                        offset="100%"
                                                        stopColor="#62A07B"
                                                        stopOpacity={1}
                                                    />
                                                </LinearGradient>
                                            </Defs>

                                            {/* Triangle shape (point at top, wide at bottom) */}
                                            <Polygon
                                                points="10,0 0,200 20,200" // top point (10,0), bottom left (0,150), bottom right (20,150)
                                                fill="url(#grad)"
                                            />
                                        </Svg>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View className="flex-row relative top-[390px] left-[30px]">
                            <View className="px-4 py-3  rounded-full bg-[#1C1C1C] absolute  border border-primary">
                                <Typography className="text-sm ">No Size Needed</Typography>
                                <View
                                    className="absolute left-1/2 -top-4"
                                    style={{
                                        transform: [{ translateX: 4 }],
                                    }}
                                >
                                    <Point />
                                    <View
                                        style={{
                                            position: "absolute",
                                            bottom: 10,
                                            left: 8,
                                            zIndex: 0,
                                        }}
                                    >
                                        <Svg height={220} width={8} viewBox="0 0 20 150">
                                            <Defs>
                                                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                                    <Stop
                                                        offset="0%"
                                                        stopColor="#62A07B"
                                                        stopOpacity={0.2}
                                                    />
                                                    <Stop
                                                        offset="100%"
                                                        stopColor="#62A07B"
                                                        stopOpacity={1}
                                                    />
                                                </LinearGradient>
                                            </Defs>

                                            {/* Triangle shape (point at top, wide at bottom) */}
                                            <Polygon
                                                points="10,0 0,360 20,360" // top point (10,0), bottom left (0,150), bottom right (20,150)
                                                fill="url(#grad)"
                                            />
                                        </Svg>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
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
                                ? "NOSIZENEEDED – Durch neueste Technologie zum perfekten Schuh"
                                : "NOSIZENEEDED – L’ultima tecnologia per la scarpa perfetta"}
                        </Typography>
                    </View>
                </View>

                <View className="py-12">
                    <View className="flex-1 px-6 gap-4 mb-4 z-[999]">
                        <Typography className="text-2xl text-left font-medium">
                            {isGerman()
                                ? "Bundesliga-Profis vertrauen darauf – du auch?"
                                : "I professionisti della Bundesliga ci credono, e tu?"}
                        </Typography>
                        <Button
                            onPress={() => {
                                router.push({
                                    pathname: "/shoe-recommendations",
                                    params: {
                                        category: "football-shoes",
                                        redirect: "/shoe-recommendations/shoes",
                                        redirectId: Math.random().toString(),
                                    },
                                });
                            }}
                            variant="outline"
                            className="bg-primary/10 w-1/3 py-4 rounded-2xl"
                        >
                            {isGerman() ? "Jetzt kaufen!" : "Acquista ora!"}
                        </Button>
                    </View>
                    <ExpoLinearGradient
                        pointerEvents="none"
                        colors={["rgba(16, 16, 16, 1)", "rgba(13, 13, 13, 0)"]}
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            zIndex: 99,
                        }}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                    />
                    <ExpoLinearGradient
                        pointerEvents="none"
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
                <VersionInfo />
            </Layout>
        </View>
    );
}
