import logo from "@/assets/images/feetfast-full-logo.png";
import { View, Pressable, TouchableOpacity, Image } from "react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cart";
import { useAddFavourite, useRemoveFavourite } from "@/lib/queries/favourite";
import { useAddToCart } from "@/lib/queries/cart";
import { AntDesign } from "@expo/vector-icons";
import { useLanguageStore } from "@/store/language";
import { notify } from "@/lib/notify";
import { FlatList } from "react-native-gesture-handler";
import { ItemImagePlaceholder } from "@/lib/placeholder";
import { AutoImage } from "../ui/auto-image";
import { ShoeSizePicker } from "./shoe-size-dropdown";

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
    selectedImage: number | null;
    setSelectedImage: (index: number) => void;
    images: { image: string; color_hex: string }[];
    setSelectedColor: (color: string) => void;
    setSizePicked: (size: string) => void;
    sizePicked: string | null;
    sizeList: any[];
    brand: { name: string; image: string };
    match_data?: Record<string, string>;
};

export function AddToCart({
    productId,
    selectedSize,
    availableQuantity,
    colors,
    isFavourite,
    selectedColor,
    onColorChange,
    selectedImage,
    setSelectedImage,
    images,
    setSelectedColor,
    setSizePicked,
    sizePicked,
    sizeList,
    brand,
    match_data,
}: AddToCartProps) {
    const { isGerman } = useLanguageStore();
    const { isInCart } = useCartStore();
    const addToCartMutation = useAddToCart();
    const [quantity, setQuantity] = useState(1);
    const [liked, setLiked] = useState(false);

    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (flatListRef.current && selectedImage !== null) {
            flatListRef.current.scrollToIndex({
                index: selectedImage,
                animated: true,
                viewPosition: 0.5,
            });
        }
    }, [selectedImage]);

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
        <View className="gap-4">
            <View className="p-2 rounded-2xl flex-row gap-4 flex-wrap">
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
                            className="w-5 h-5 rounded-full"
                            style={{ backgroundColor: color }}
                        />
                    </Pressable>
                ))}
            </View>

            {/* QUANTITY */}

            {(images.length ?? 0) > 1 && (
                <FlatList
                    ref={flatListRef}
                    data={images.sort((a, b) => a.color_hex.localeCompare(b.color_hex))}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className="w-3" />}
                    onScrollToIndexFailed={(info) => {
                        const wait = new Promise((resolve) => setTimeout(resolve, 500));
                        wait.then(() => {
                            flatListRef.current?.scrollToIndex({
                                index: info.index,
                                animated: true,
                            });
                        });
                    }}
                    renderItem={(props) => (
                        <Pressable
                            onPress={() => {
                                setSelectedImage(props.index);
                                setSelectedColor(props.item.color_hex);
                            }}
                            className="p-2 bg-muted-background rounded-2xl flex-1"
                            style={{
                                opacity: selectedImage === props.index ? 1 : 0.5,
                            }}
                            key={props.index}
                        >
                            <Image
                                className="h-[80px] w-[140px] rounded-lg"
                                resizeMode="contain"
                                source={{
                                    uri:
                                        props.item.image && typeof props.item.image === "string"
                                            ? props.item.image
                                            : ItemImagePlaceholder,
                                }}
                            />
                        </Pressable>
                    )}
                />
            )}

            {/* Brand + Size */}
            <View className="bg-muted-background p-4 rounded-2xl flex-row justify-between">
                <AutoImage height={36} source={logo} />

                <View className="h-9 justify-center flex-1 ml-6">
                    <View className="w-full">
                        <ShoeSizePicker
                            onChange={(selected) => {
                                if (selected) setSizePicked(selected as string);
                            }}
                            value={sizePicked ?? undefined}
                            list={sizeList}
                        />
                    </View>
                    <Typography
                        style={{
                            textAlign: "right",
                        }}
                    >
                        {brand?.name.toLowerCase() === "imotana"
                            ? 100 + "% FIT"
                            : ((match_data &&
                                sizePicked &&
                                (match_data?.[sizePicked] ?? "0") + "% FIT") ??
                                "N/A FIT")}
                        {}
                    </Typography>
                </View>
            </View>

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
