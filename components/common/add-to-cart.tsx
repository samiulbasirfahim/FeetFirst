import { View, Pressable, TouchableOpacity } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cart";
import { useAddFavourite, useRemoveFavourite } from "@/lib/queries/favourite";
import { AntDesign } from "@expo/vector-icons";
import { useLanguageStore } from "@/store/language";

type SizeOption = {
    id: number;
    size: string;
};

type AddToCartProps = {
    productId: number;
    selectedSize: SizeOption | null;
    availableQuantity: number;
    colors: string[];
    isFavourite?: boolean;
};

export function AddToCart({
    productId,
    selectedSize,
    availableQuantity,
    colors,
    isFavourite,
}: AddToCartProps) {
    const { isGerman } = useLanguageStore();
    const { addItem, isInCart } = useCartStore();

    const [selectedColor, setSelectedColor] = useState<string | null>(
        colors.length > 0 ? colors[0] : null,
    );
    const [quantity, setQuantity] = useState(1);
    const [liked, setLiked] = useState(false);

    const inCart = isInCart(productId);

    /* ---------------- favourite ---------------- */
    const { mutate: addFav, isPending: pendingAdd } = useAddFavourite();
    const { mutate: removeFav, isPending: pendingRemove } = useRemoveFavourite();

    useEffect(() => {
        setLiked(isFavourite ?? false);
    }, [isFavourite]);

    useMemo(() => {
        if (quantity > availableQuantity && availableQuantity > 0) {
            setQuantity(availableQuantity);
        }
    }, [availableQuantity]);

    const canAdd = selectedSize && selectedColor;

    const handleAddToCart = () => {
        if (!canAdd) return;

        addItem({
            productId,
            sizeId: selectedSize.id,
            size: selectedSize.size,
            color: selectedColor,
            quantity,
        });
    };

    return (
        <View className="gap-5">
            {/* COLOR PICKER */}
            <View className="bg-muted-background p-4 rounded-2xl flex-row gap-4 flex-wrap">
                {colors.map((color) => (
                    <Pressable
                        key={color}
                        onPress={() => setSelectedColor(color)}
                        style={{
                            borderWidth: 2,
                            borderColor: selectedColor === color ? "white" : "transparent",
                            borderRadius: 9999,
                            padding: 2,
                        }}
                    >
                        <View
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: color }}
                        />
                    </Pressable>
                ))}
            </View>

            {/* QUANTITY */}
            <View className="flex-row items-center justify-between">
                <Typography className="text-white font-semibold">
                    {isGerman() ? "Menge" : "Quantità"}
                </Typography>

                <View className="flex-row items-center gap-3">
                    <Pressable
                        disabled={quantity <= 1}
                        onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                        className={`w-10 h-10 rounded-full items-center justify-center border ${quantity <= 1 ? "border-white/20 opacity-40" : "border-white/40"
                            }`}
                    >
                        <Typography className="text-white text-xl">−</Typography>
                    </Pressable>

                    <View className="min-w-[48px] items-center">
                        <Typography className="text-white text-lg font-bold">
                            {quantity}
                        </Typography>
                    </View>

                    <Pressable
                        disabled={quantity >= availableQuantity}
                        onPress={() =>
                            setQuantity((q) => Math.min(availableQuantity, q + 1))
                        }
                        className={`w-10 h-10 rounded-full items-center justify-center border ${quantity >= availableQuantity
                                ? "border-white/20 opacity-40"
                                : "border-white/40"
                            }`}
                    >
                        <Typography className="text-white text-xl">+</Typography>
                    </Pressable>
                </View>
            </View>

            {inCart && (
                <Typography className="text-green-400 font-semibold text-center">
                    {isGerman() ? "Bereits im Warenkorb" : "Già nel carrello"}
                </Typography>
            )}

            <View className="flex-row gap-6 items-center">
                <View className="flex-1">
                    {!inCart ? (
                        <Button
                            onPress={handleAddToCart}
                            variant="outline"
                            noWrap
                            className="border p-4 rounded-2xl items-center border-white"
                        >
                            <Typography className="text-xl text-white">
                                {isGerman() ? "IN DEN WARENKORB" : "AGGIUNGI AL CARRELLO"}
                            </Typography>
                        </Button>
                    ) : (
                        <View className="flex gap-2">
                            <Button
                                onPress={handleAddToCart}
                                variant="outline"
                                noWrap
                                className="border p-4 rounded-2xl items-center border-white"
                            >
                                <Typography className="text-xl text-white">
                                    {isGerman() ? "NOCHMAL HINZUFÜGEN" : "AGGIUNGI DI NUOVO"}
                                </Typography>
                            </Button>
                        </View>
                    )}
                </View>

                <TouchableOpacity className="items-center justify-center">
                    <Pressable
                        disabled={pendingAdd || pendingRemove}
                        onPress={() => {
                            if (liked) {
                                removeFav(productId);
                            } else {
                                addFav(productId);
                            }
                        }}
                        className="border border-white p-4 rounded-2xl"
                    >
                        <AntDesign
                            name={liked ? "heart" : "hearto"}
                            size={24}
                            color="white"
                        />
                    </Pressable>
                </TouchableOpacity>
            </View>
        </View>
    );
}
