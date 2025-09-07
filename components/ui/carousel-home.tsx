import * as React from "react";
import { Image, View, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Typography } from "./typography";
import { useSharedValue } from "react-native-reanimated";
import Arrow from "@/assets/svgs/arrow-exercise.svg";

import { SvgProps } from "react-native-svg";

export type ShoeItem = {
    itemName: string;
    brandLogo: React.FC<SvgProps>;
    price: string;
    image: string | number;
    brandName: string;
};

function HomeCarausel({ shoes }) {
    const { width } = Dimensions.get("window");
    const progress = useSharedValue<number>(0);

    const renderItem = ({ item }: { item: ShoeItem }) => (
        <View
            className="relative  border border-primary/20 rounded-2xl  bg-background"
            style={{
                width: width * 0.75,
                marginHorizontal: 10,
                height: 230,
            }}
        >
            <View className="absolute z-50">
                <Image
                    source={
                        typeof item.image === "string" ? { uri: item.image } : item.image
                    }
                    style={{ width: 240, height: 240 }}
                />
            </View>
            <View className="absolute right-5 top-4">
                <Typography className="font-medium text-foreground text-[26px] leading-[26px]">
                    {item.brandName}
                </Typography>
                <Typography className="font-medium text-foreground text-[26px] leading-[26px]">
                    {item.itemName}
                </Typography>
                <Typography className="font-medium text-primary text-[26px]  mt-1">
                    {item.price}
                </Typography>
            </View>
            <View>
                <View className="absolute top-[160px] left-1">
                    <item.brandLogo height={50} width={100} className="" />
                </View>
            </View>
            <View className="absolute bottom-0 right-0 p-3 border border-primary rounded-2xl">
                <Arrow />
            </View>
        </View>
    );

    return (
        <View className="pl-3">
            <Carousel
                autoPlayInterval={2000}
                data={shoes}
                onConfigurePanGesture={(panGesture) => panGesture.activeOffsetY([-999999, 999999]).activeOffsetX([-20, 20])}
                loop={true}
                pagingEnabled={true}
                snapEnabled={true}
                width={width}
                height={230}
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
