import { View, Pressable, TouchableOpacity } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cart";
import { useAddFavourite, useRemoveFavourite } from "@/lib/queries/favourite";
import { useAddToCart } from "@/lib/queries/cart";
import { AntDesign } from "@expo/vector-icons";
import { useLanguageStore } from "@/store/language";
import { notify } from "@/lib/notify";

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
    selectedColor: string | null;
    onColorChange: (color: string) => void;
};

export function AddToCart({
    productId,
    selectedSize,
    availableQuantity,
    colors,
    isFavourite,
    selectedColor,
    onColorChange,
}: AddToCartProps) {
    const { isGerman } = useLanguageStore();
    const { isInCart } = useCartStore();
    const addToCartMutation = useAddToCart();
    const [quantity, setQuantity] = useState(1);
    const [liked, setLiked] = useState(false);

    const inCart = selectedSize ? isInCart(productId, selectedSize.id) : false;

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

    const handleAddToCart = async () => {
        if (!canAdd) {
            notify({
                type: "error",
                title: isGerman()
                    ? "Größe und Farbe auswählen"
                    : "Seleziona taglia e colore",
                message: isGerman()
                    ? "Bitte wählen Sie eine Größe und Farbe aus, bevor Sie zum Warenkorb hinzufügen."
                    : "Si prega di selezionare una taglia e un colore prima di aggiungere al carrello.",
            });
            return;
        }

        addToCartMutation.mutate(
            {
                product: productId,
                size_id: selectedSize.id,
                color: selectedColor,
                quantity,
            },
            {
                onSuccess: () => {
                    notify({
                        type: "success",
                        title: isGerman()
                            ? "Artikel zum Warenkorb hinzugefügt"
                            : "Articolo aggiunto al carrello",
                        message: isGerman()
                            ? `${quantity} x ${selectedSize.size} wurde Ihrem Warenkorb hinzugefügt.`
                            : `${quantity} x ${selectedSize.size} è stato aggiunto al tuo carrello.`,
                    });
                },
                onError: (err) => {
                    console.error("Add to cart error:", err);

                    if (
                        ((err as any).data.message as string).includes("Insufficient stock")
                    ) {
                        notify({
                            type: "error",
                            title: isGerman()
                                ? "Fehler beim Hinzufügen zum Warenkorb"
                                : "Errore durante l'aggiunta al carrello",
                            message: isGerman()
                                ? "Nicht genügend Lagerbestand für die gewünschte Menge."
                                : "Non c'è abbastanza stock per la quantità desiderata.",
                        });
                        return;
                    }

                    notify({
                        type: "error",
                        title: isGerman()
                            ? "Fehler beim Hinzufügen zum Warenkorb"
                            : "Errore durante l'aggiunta al carrello",
                        message: isGerman()
                            ? "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut."
                            : "Qualcosa è andato storto. Per favore riprova.",
                    });
                },
            },
        );
    };

    return (
        <View className="gap-5">
            <View className="bg-muted-background p-4 rounded-2xl flex-row gap-4 flex-wrap">
                {colors.map((color) => (
                    <Pressable
                        key={color}
                        onPress={() => {
                            onColorChange(color);
                        }}
                        style={{
                            borderWidth: 2,
                            borderColor: selectedColor === color ? "#62A07B" : "#ffffff22",
                            borderRadius: 9999,
                            padding: 2,
                        }}
                    >
                        <View
                            className="w-8 h-8 rounded-full"
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
                            isLoading={addToCartMutation.isPending}
                        >
                            <Typography className="text-xl text-white">
                                {isGerman() ? "IN DEN WARENKORB" : "AGGIUNGI AL CARRELLO"}
                            </Typography>
                        </Button>
                    ) : (
                        <View className="flex gap-2">
                            <Button
                                onPress={handleAddToCart}
                                isLoading={addToCartMutation.isPending}
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
                                setLiked(false);
                            } else {
                                addFav(productId);
                                setLiked(true);
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
