import { View, TouchableOpacity, Image, Text } from "react-native";
import Love from "@/assets/svgs/love.svg";
import Love_filled from "@/assets/svgs/love-filled.svg";
import { Typography } from "../ui/typography";
import { router } from "expo-router";
import { ShoeItem } from "@/type/product";
import { BrandLogoPlaceholder, ItemImagePlaceholder } from "@/lib/placeholder";
import { useAddFavourite, useRemoveFavourite } from "@/lib/queries/favourite";
import { useState } from "react";

type ProductCardProps = ShoeItem & {
    colors?: string[];
};

export function ProductCard({
    id,
    image,
    itemName,
    brandLogo,
    price,
    favourite,
    colors = [],
    match_percentage = null,
}: ProductCardProps) {
    const [liked, setLiked] = useState(favourite);
    console.log(colors);
    const {
        mutate: add_to_favourite,
        isPending: pending_add,
        error: error_add,
    } = useAddFavourite();

    const {
        mutate: remove_from_favourite,
        isPending: pending_remove,
        error: error_remove,
    } = useRemoveFavourite();

    function handle_remove_fav() {
        remove_from_favourite(id, {
            onSuccess(res) {
                setLiked(false);
            },
            onError(err) {
                setLiked(true);
            },
        });
    }

    function handle_add_fav() {
        add_to_favourite(id, {
            onSuccess(res) {
                setLiked(true);
            },
            onError(err) {
                setLiked(false);
            },
        });
    }

    return (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: "/others/shoe-details",
                    params: {
                        id,
                    },
                })
            }
            activeOpacity={0.8}
            className="py-3 mb-4 w-[48%] relative min-h-[260px] overflow-hidden"
        >
            <View className="bg-background rounded-3xl py-6 relative">
                <View className="flex-row px-4 justify-between items-center">
                    {match_percentage ? (
                        <View className="px-2 py-1 border border-primary bg-primary rounded-lg">
                            <Typography
                                className="text-white text-sm"
                                style={{
                                    lineHeight: 12,
                                }}
                            >
                                {`${match_percentage}%
FIT`}
                            </Typography>
                        </View>
                    ) : (
                        <View></View>
                    )}
                    <TouchableOpacity
                        onPress={() => {
                            setLiked((prev) => !prev);
                            if (liked) handle_remove_fav();
                            else handle_add_fav();
                        }}
                        style={{
                            zIndex: 9999,
                        }}
                    >
                        {liked ? (
                            <Love_filled width={24} height={24} />
                        ) : (
                            <Love width={24} height={24} />
                        )}
                    </TouchableOpacity>
                </View>

                <Image
                    source={{
                        uri:
                            image && typeof image.image === "string"
                                ? image.image
                                : ItemImagePlaceholder,
                    }}
                    className="w-full h-36 rounded-xl -mt-4"
                    resizeMode="contain"
                />

                <View className="absolute left-1/2 -translate-x-1/2 bottom-6">
                    <Image
                        source={{
                            uri:
                                brandLogo && typeof brandLogo.image === "string"
                                    ? brandLogo.image
                                    : BrandLogoPlaceholder,
                        }}
                        style={{
                            height: 50,
                            width: 50,
                        }}
                    />
                </View>
            </View>

            <View className="flex-col relative px-1 flex-1">
                <Typography numberOfLines={1}>{itemName}</Typography>
                <View className="flex-row justify-between">
                    <Typography>{price}</Typography>
                    <View className="flex-row gap-1">
                        {colors.slice(0, 3).map((color, idx) => (
                            <View
                                key={idx}
                                className="mt-1 size-6 rounded-full z-1"
                                style={{
                                    backgroundColor: color,
                                    zIndex: 3 - idx,
                                    left: (colors.slice(0, 3).length - 1 - idx) * 16,
                                }}
                            />
                        ))}

                        {colors.length - 3 > 0 && (
                            <Typography>+{colors.length - 3}</Typography>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
