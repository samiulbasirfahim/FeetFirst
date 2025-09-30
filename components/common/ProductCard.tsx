import { View, TouchableOpacity, Image, Text } from "react-native";
import BRANDLOGO from "@/assets/svgs/hoka_logo.svg";
import Love from "@/assets/svgs/love.svg";
import Love_filled from "@/assets/svgs/love-filled.svg";
import { Typography } from "../ui/typography";
import { router } from "expo-router";

interface ProductCardProps {
    image: any;
    name: string;
    price: string | number;
    liked: boolean;
    onToggleLike: () => void;
    colors?: string[];
    fitValue?: number | null;
}

export function ProductCard({
    image,
    name,
    price,
    liked,
    onToggleLike,
    colors = ["#22c55e", "#16a34a", "#86efac"],
    fitValue = null,
}: ProductCardProps) {
    return (
        <TouchableOpacity
            onPress={() => router.push("/others/shoe-details")}
            activeOpacity={0.8}
            className="py-3 mb-4 w-[48%] relative min-h-[260px] overflow-hidden"
        >
            <View className="bg-background rounded-3xl py-6 relative">
                <View className="flex-row px-4 justify-between items-center">
                    {fitValue ? (
                        <View className="px-2 py-1 border border-primary bg-primary rounded-lg">
                            <Typography
                                className="text-white text-sm"
                                style={{
                                    lineHeight: 12,
                                }}
                            >
                                {`${fitValue}%
FIT`}
                            </Typography>
                        </View>
                    ) : (
                        <View></View>
                    )}
                    <TouchableOpacity onPress={onToggleLike} className="">
                        {liked ? (
                            <Love_filled width={24} height={24} />
                        ) : (
                            <Love width={24} height={24} />
                        )}
                    </TouchableOpacity>
                </View>

                <Image
                    source={image}
                    className="w-full h-36 rounded-xl -mt-4"
                    resizeMode="contain"
                />

                <View className="absolute left-1/2 -translate-x-1/2 bottom-6">
                    <BRANDLOGO height={50} width={100} />
                </View>
            </View>

            <View className="flex-col relative px-1 flex-1">
                <Typography numberOfLines={1}>{name}</Typography>
                <View className="flex-row justify-between">
                    <Typography>{price}</Typography>
                    <View className="flex-row">
                        {colors.slice(0, 3).map((color, idx) => (
                            <View
                                key={idx}
                                className="mt-1 size-6 rounded-full z-1"
                                style={{
                                    backgroundColor: color,
                                    zIndex: 3 - idx,
                                    left: (2 - idx) * 12,
                                }}
                            />
                        ))}
                        {colors.length - 3 > 0 && (
                            <Typography>+{colors.length - 3}</Typography>
                        )}
                        <Typography variant="caption" className="ms-2">
                            +4
                        </Typography>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
