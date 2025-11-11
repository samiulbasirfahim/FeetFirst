import * as React from "react";
import { Image, View, Dimensions, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Typography } from "./typography";
import { useSharedValue } from "react-native-reanimated";
import Arrow from "@/assets/svgs/arrow-exercise.svg";

import { ShoeItem } from "@/type/product";
import { brandPlaceholder, ItemImagePlaceholder } from "@/lib/placeholder";
import { router } from "expo-router";

const HEIGHT = 350;

function HomeCarauselSecond({ shoes, setCurrentIndex }: { shoes: ShoeItem[]; setCurrentIndex: (index: number) => void }) {
    const { width } = Dimensions.get("window");
    const progress = useSharedValue<number>(0);

    const renderItem = ({ item }: { item: ShoeItem }) => (
        <View
            className="relative  border border-primary/20 rounded-2xl  bg-background py-10"
            style={{
                width: width * 0.75,
                marginHorizontal: 10,
                height: HEIGHT,
            }}
        >
            <View className="absolute z-50 bottom-10">
                <Image
                    source={{
                        uri:
                            item.image && typeof item.image.image === "string"
                                ? item.image.image
                                : ItemImagePlaceholder,
                    }}
                    resizeMode="contain"
                    style={{
                        width: width * 0.85,
                        height: HEIGHT / 2,
                        transform: [{ rotateZ: "-25deg" }],
                    }}
                />
            </View>
            <View className="pl-2">
                <View className="flex-col gap-3 pb-2">
                    {item.brand?.name && (
                        <Typography className="font-medium text-foreground text-[26px] leading-[26px]">
                            {item.brand?.name && item.brand?.name?.slice(0, 8)}
                        </Typography>
                    )}
                    <View>
                        <Typography className="font-medium text-[26px] leading-[26px] absolute z-[100] text-foreground/60">
                            {item.itemName.length > 18
                                ? item.itemName.slice(0, 16) + "..."
                                : item.itemName}
                        </Typography>
                        <Typography className="font-medium text-foreground text-[26px] leading-[26px]">
                            {item.itemName.length > 18
                                ? item.itemName.slice(0, 16) + "..."
                                : item.itemName}
                        </Typography>
                    </View>
                </View>
                <Typography className="font-medium text-primary text-[26px]  mt-1 z-[100]">
                    {item.price}
                </Typography>
            </View>
            {item.brand && (
                <View className="absolute bottom-2 left-2">
                    <Image
                        source={{
                            uri:
                                item.brand && typeof item.brand.image === "string"
                                    ? item.brand.image
                                    : brandPlaceholder,
                        }}
                        resizeMode="contain"
                        style={{
                            height: 50,
                            width: 100,
                            borderRadius: 20,
                            overflow: "hidden",
                        }}
                    />
                </View>
            )}
            <TouchableOpacity
                onPress={() => {
                    router.push({
                        pathname: "/others/shoe-details",
                        params: {
                            id: item.id,
                        },
                    });
                }}
                className="absolute bottom-0 right-0 p-3  border border-primary rounded-2xl"
            >
                <Arrow />
            </TouchableOpacity>
        </View>
    );

    return (
        <View id="carousel-component" className="pl-1">
            <Carousel
                onConfigurePanGesture={(panGesture) =>
                    panGesture.activeOffsetX([-5, 5]).failOffsetY([-5, 5])
                }
                autoPlayInterval={2000}
                data={shoes}
                onScrollEnd={setCurrentIndex}
                loop={true}
                pagingEnabled={true}
                snapEnabled={true}
                width={width}
                height={HEIGHT}
                style={{
                    width: width,
                    borderColor: "#ffffff",
                }}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: width / 5,
                }}
                onProgressChange={progress}
                renderItem={renderItem}
            />
        </View>
    );
}

export default HomeCarauselSecond;
