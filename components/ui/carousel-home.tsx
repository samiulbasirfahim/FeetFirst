import * as React from "react";
import { Image, View, Dimensions, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Typography } from "./typography";
import { useSharedValue } from "react-native-reanimated";
import Arrow from "@/assets/svgs/arrow-exercise.svg";

import { ShoeItem } from "@/type/product";
import { BrandLogoPlaceholder, ItemImagePlaceholder } from "@/lib/placeholder";
import { router } from "expo-router";

const HEIGHT = 270;

function HomeCarausel({ shoes }) {
    const { width } = Dimensions.get("window");
    const progress = useSharedValue<number>(0);

    console.log(shoes);

    const renderItem = ({ item }: { item: ShoeItem }) => (
        <View
            className="relative border border-primary/20 rounded-2xl  bg-background"
            style={{
                width: width * 0.75,
                marginHorizontal: 10,
                height: HEIGHT,
            }}
        >
            <View className="absolute z-50 bottom-0">
                <Image
                    source={{
                        uri:
                            item.image && typeof item.image.image === "string"
                                ? item.image.image
                                : ItemImagePlaceholder,
                    }}
                    resizeMode="contain"
                    style={{
                        width: 230,
                        aspectRatio: 1,
                        transform: [{ rotateZ: "40deg" }],
                    }}
                />
            </View>
            <View className="absolute right-5 top-4 flex-col items-end">
                <Typography className="font-medium text-foreground text-[26px] leading-[26px]">
                    {item.brandLogo?.name && item.brandLogo?.name?.slice(0, 8)}
                </Typography>
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
                <Typography className="font-medium text-primary text-[26px]  mt-1">
                    {item.price}
                </Typography>
            </View>
            <View className="absolute left-4 bottom-4">
                <Image
                    source={{
                        uri:
                            typeof item.brandLogo === "string"
                                ? item.brandLogo
                                : BrandLogoPlaceholder,
                    }}
                    style={{
                        height: 50,
                        width: 100,
                    }}
                />
            </View>
            <TouchableOpacity
                onPress={() => {
                    router.push({
                        pathname: "/others/shoe-details",
                        params: {
                            id: item.id,
                        },
                    });
                }}
                className="absolute bottom-0 right-0 p-3 border border-primary rounded-2xl z-[100]"
            >
                <Arrow />
            </TouchableOpacity>
        </View>
    );

    return (
        <View className="pl-3">
            <Carousel
                autoPlayInterval={2000}
                data={shoes}
                onConfigurePanGesture={(panGesture) =>
                    panGesture.activeOffsetX([-5, 5]).failOffsetY([-5, 5])
                }
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
                    parallaxScrollingScale: 1,
                    parallaxScrollingOffset: 70,
                }}
                onProgressChange={progress}
                renderItem={renderItem}
            />
        </View>
    );
}

export default HomeCarausel;
