import type { ShoeDetails } from "@/type/product";
import { Modal } from "./modal";
import { View, Pressable, FlatList } from "react-native";
import { Typography } from "../ui/typography";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cart";

type AddToCartProps = {
    productDetails: ShoeDetails;
    onClose: () => void;
    isOpen: boolean;
};

type SelectedProductState = {
    productId: number;
    sizeId: number | null;
    size: string | null;
    color: string | null;
    quantity: number;
};

export function AddToCartModal({
    productDetails,
    onClose,
    isOpen,
}: AddToCartProps) {
    const sizes = useMemo(() => {
        return (
            productDetails.sizes?.flatMap((s) =>
                s.size.map((sz) => ({
                    // id: s.size_id,
                    id: 10,
                    size: sz,
                    match: Number(productDetails.match_data?.[sz] ?? 0),
                })),
            ) ?? []
        );
    }, [productDetails]);

    const colors =
        productDetails.colors?.map((c) => ({
            id: c,
            value: c,
        })) ?? [];

    const [selection, setSelection] = useState<SelectedProductState>({
        productId: productDetails.id,
        sizeId: null,
        size: null,
        color: null,
        quantity: 1,
    });

    useEffect(() => {
        if (!isOpen) {
            setSelection({
                productId: productDetails.id,
                sizeId: null,
                size: null,
                color: null,
                quantity: 1,
            });
        }
    }, [isOpen]);

    const [showSizeMenu, setShowSizeMenu] = useState(false);
    const [showColorMenu, setShowColorMenu] = useState(false);
    const { addItem } = useCartStore();

    const availableQuantity = useMemo(() => {
        if (!selection.size) return 0;

        const sizeEntry = productDetails.sizes?.find((s) =>
            s.size.includes(selection.size!),
        );

        return sizeEntry?.quantity ?? 0;
    }, [selection.size, productDetails.sizes]);

    useEffect(() => {
        if (selection.quantity > availableQuantity && availableQuantity > 0) {
            setSelection((p) => ({
                ...p,
                quantity: availableQuantity,
            }));
        }
    }, [availableQuantity]);

    const handleAddToCart = () => {
        if (!selection.sizeId || !selection.color) return;

        addItem({
            productId: selection.productId,
            quantity: selection.quantity,
            sizeId: selection.sizeId,
            size: selection.size,
            color: selection.color,
        });

        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClickOutside={onClose}>
            <View className="bg-backgroundDark p-6 rounded-2xl gap-5">
                <Typography className="text-white text-2xl font-bold">
                    Optionen auswählen
                </Typography>

                {/* SIZE PICKER */}
                <View className="relative" pointerEvents="box-none">
                    <Pressable
                        onPress={() => {
                            setShowSizeMenu((p) => !p);
                            setShowColorMenu(false);
                        }}
                        className="flex-row items-center justify-between px-4 py-3 rounded-xl border border-white/30 bg-muted-background"
                    >
                        <Typography className="text-white">
                            {selection.size ?? "Größe wählen"}
                        </Typography>
                        <FontAwesome5 name="chevron-down" size={14} color="white" />
                    </Pressable>

                    {showSizeMenu && (
                        <View className="absolute top-[54px] w-full max-h-[240px] rounded-xl border border-white/20 bg-backgroundDark z-20 overflow-hidden">
                            <FlatList
                                style={{
                                    zIndex: 99,
                                }}
                                contentContainerStyle={{
                                    zIndex: 99,
                                }}
                                data={sizes}
                                pinchGestureEnabled
                                keyExtractor={(item) => String(item.id) + item.size}
                                keyboardShouldPersistTaps="handled"
                                nestedScrollEnabled
                                renderItem={({ item }) => (
                                    <Pressable
                                        onPress={() => {
                                            setSelection((p) => ({
                                                ...p,
                                                sizeId: item.id,
                                                size: item.size,
                                            }));

                                            console.log("Selected size:", item);

                                            setShowSizeMenu(false);
                                        }}
                                        style={{
                                            zIndex: 99,
                                        }}
                                        className="flex-row justify-between px-4 py-3 border-b border-white/10"
                                    >
                                        <Typography className="text-white font-semibold">
                                            {item.size}
                                        </Typography>
                                        <Typography
                                            className={
                                                item.match >= 80 ? "text-green-400" : "text-gray-400"
                                            }
                                        >
                                            {item.match}% FIT
                                        </Typography>
                                    </Pressable>
                                )}
                            />
                        </View>
                    )}
                </View>

                <View className="relative" pointerEvents="box-none">
                    <Pressable
                        onPress={() => {
                            setShowColorMenu((p) => !p);
                            setShowSizeMenu(false);
                        }}
                        className="flex-row items-center justify-between px-4 py-3 rounded-xl border border-white/30 bg-muted-background"
                    >
                        <Typography className="text-white">
                            {selection.color ?? "Farbe wählen"}
                        </Typography>
                        <FontAwesome5 name="chevron-down" size={14} color="white" />
                    </Pressable>

                    {showColorMenu && (
                        <View className="absolute top-[54px] w-full max-h-[200px] rounded-xl border border-white/20 bg-backgroundDark z-20 overflow-hidden">
                            <FlatList
                                style={{
                                    zIndex: 88,
                                }}
                                contentContainerStyle={{
                                    zIndex: 88,
                                }}
                                data={colors}
                                keyExtractor={(item) => item.id}
                                keyboardShouldPersistTaps="handled"
                                pinchGestureEnabled
                                nestedScrollEnabled
                                renderItem={({ item }) => (
                                    <Pressable
                                        onPress={() => {
                                            setSelection((p) => ({
                                                ...p,
                                                color: item.value,
                                            }));
                                            setShowColorMenu(false);
                                        }}
                                        style={{
                                            zIndex: 88,
                                        }}
                                        className="flex-row items-center justify-between px-4 py-3 border-b border-white/10"
                                    >
                                        <Typography className="text-white">{item.value}</Typography>

                                        <View
                                            className="w-5 h-5 rounded-full border border-white/30"
                                            style={{ backgroundColor: item.value }}
                                        />
                                    </Pressable>
                                )}
                            />
                        </View>
                    )}
                </View>

                <View className="flex-row items-center justify-between gap-4">
                    <Typography className="text-white font-semibold">Menge</Typography>

                    <View className="flex-row items-center gap-3">
                        {/* Decrement */}
                        <Pressable
                            disabled={selection.quantity <= 1}
                            onPress={() =>
                                setSelection((p) => ({
                                    ...p,
                                    quantity: Math.max(1, p.quantity - 1),
                                }))
                            }
                            className={`w-10 h-10 rounded-full items-center justify-center border ${selection.quantity <= 1
                                    ? "border-white/20 opacity-40"
                                    : "border-white/40"
                                }`}
                        >
                            <Typography className="text-white text-xl">−</Typography>
                        </Pressable>

                        {/* Quantity Display */}
                        <View className="min-w-[48px] items-center">
                            <Typography className="text-white text-lg font-bold">
                                {selection.quantity}
                            </Typography>
                        </View>

                        <Pressable
                            disabled={selection.quantity >= availableQuantity}
                            onPress={() =>
                                setSelection((p) => ({
                                    ...p,
                                    quantity: Math.min(availableQuantity, p.quantity + 1),
                                }))
                            }
                            className={`w-10 h-10 rounded-full items-center justify-center border ${selection.quantity >= availableQuantity
                                    ? "border-white/20 opacity-40"
                                    : "border-white/40"
                                }`}
                        >
                            <Typography className="text-white text-xl">+</Typography>
                        </Pressable>
                    </View>
                </View>

                <Button
                    disabled={!selection.sizeId || !selection.color}
                    onPress={handleAddToCart}
                    className={`mt-2 px-4 py-4 rounded-2xl items-center ${selection.sizeId && selection.color ? "bg-primary" : "bg-primary/40"}`}
                >
                    IN DEN WARENKORB
                </Button>
            </View>
        </Modal>
    );
}
