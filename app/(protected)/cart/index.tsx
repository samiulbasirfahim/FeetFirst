import Entypo from "@expo/vector-icons/Entypo";
import { useDrawerHeader } from "@/components/common/drawer-header";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { useEffect, useState } from "react";
import { FlatList, View, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import { ItemImagePlaceholder } from "@/lib/placeholder";
import { AntDesign } from "@expo/vector-icons";
import { useLanguageStore } from "@/store/language";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { useGetCart, useRemoveFromCart } from "@/lib/queries/cart";
import { initializePaymentSheet, openPaymentSheet } from "@/lib/stripe";

export default function CartScreen() {
    const { isGerman } = useLanguageStore();
    const { data: cart, isPending } = useGetCart();
    const { setCart, getCartCount } = useCartStore();
    const removeMutation = useRemoveFromCart();

    const [ordering, setOrdering] = useState(false);

    useEffect(() => {
        if (cart) {
            setCart(cart);
        }
    }, [cart]);

    const handleRemoveFromCart = (itemId: number) => {
        removeMutation.mutate(itemId);
    };

    const renderItem = ({ item }: any) => {
        const isUnavailable = item.available === 0;
        const hasLowStock = item.available > 0 && item.available < item.quantity;

        return (
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={() =>
                    router.push({
                        pathname: "/others/shoe-details",
                        params: { id: item.product_id },
                    })
                }
                className="mb-6 w-[48%]"
                style={{ opacity: isUnavailable ? 0.5 : 1 }}
            >
                <View className="bg-background rounded-3xl overflow-hidden shadow-lg">
                    <View className="relative bg-muted-background">
                        <TouchableOpacity
                            onPress={() => handleRemoveFromCart(item.id)}
                            className="absolute right-3 top-3 z-10 bg-background/70 rounded-full p-2"
                        >
                            <Entypo name="cross" size={18} color="white" />
                        </TouchableOpacity>

                        <View>
                            <Image
                                source={{
                                    uri: item.product_image || ItemImagePlaceholder,
                                }}
                                className="w-full h-44"
                                resizeMode="contain"
                            />
                        </View>
                    </View>

                    <View className="p-4 gap-2">
                        <Typography
                            numberOfLines={1}
                            className="text-white text-base font-semibold"
                        >
                            {item.product_name}
                        </Typography>

                        <View className="flex-row items-center justify-between">
                            <Typography className="text-primary text-lg font-bold">
                                € {item.price}
                            </Typography>

                            <View className="flex-row items-center gap-2">
                                <View
                                    className="w-4 h-4 rounded-full border border-white/30"
                                    style={{ backgroundColor: item.color }}
                                />
                            </View>
                        </View>

                        <View className="flex-row gap-2 justify-between">
                            <View className="px-3 py-1 rounded-lg bg-muted-background">
                                <Typography className="text-xs text-white">
                                    {isGerman() ? "Größe" : "Taglia"}: {item.size_label}
                                </Typography>
                            </View>

                            <View className="px-3 py-1 rounded-lg bg-muted-background">
                                <Typography className="text-xs text-white">
                                    {isGerman() ? "Menge" : "Qty"}: {item.quantity}
                                </Typography>
                            </View>
                        </View>

                        {isUnavailable && (
                            <View className="mt-2">
                                <Typography className="text-red-500 text-xs font-semibold">
                                    {isGerman()
                                        ? "Nicht mehr verfügbar"
                                        : "Non più disponibile"}
                                </Typography>
                            </View>
                        )}

                        {hasLowStock && (
                            <View className="mt-2">
                                <Typography className="text-red-500 text-xs font-semibold">
                                    {isGerman()
                                        ? `Nur ${item.available} verfügbar`
                                        : `Solo ${item.available} disponibili`}
                                </Typography>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const { HeaderComponent } = useDrawerHeader({
        threeshold: 100,
        shouldGoBack: true,
    });

    const renderEmptyState = () => (
        <View className="flex-1 justify-center items-center py-20">
            <AntDesign name="shoppingcart" size={64} color="#6b7280" />
            <Typography className="text-muted-foreground text-lg font-medium mt-4 text-center">
                {isGerman()
                    ? "Keine Artikel im Warenkorb"
                    : "Nessun articolo nel carrello"}
            </Typography>
            <Typography className="text-muted-foreground text-sm mt-2 text-center px-8">
                {isGerman()
                    ? "Füge Produkte zu deinem Warenkorb hinzu, um sie hier zu sehen"
                    : "Aggiungi prodotti al tuo carrello per vederli qui"}
            </Typography>
        </View>
    );

    return (
        <View className="flex-1 bg-backgroundDark">
            {HeaderComponent}
            <Layout scrollable avoidTabbar className="bg-backgroundDark">
                <View style={{ flex: 1 }}>
                    {isPending ? (
                        <LoadingSpinner />
                    ) : (
                        <View>
                            <View className="flex-row justify-between items-center mb-6">
                                <Typography className="text-white text-2xl">
                                    {isGerman()
                                        ? `Warenkorb (${getCartCount()})`
                                        : `Carrello (${getCartCount()})`}
                                </Typography>
                            </View>

                            {getCartCount() === 0 ? (
                                renderEmptyState()
                            ) : (
                                <FlatList
                                    data={cart?.items || []}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => `${item.id}`}
                                    numColumns={2}
                                    columnWrapperStyle={{
                                        justifyContent: "space-between",
                                    }}
                                />
                            )}
                        </View>
                    )}
                </View>

                {getCartCount() > 0 && (
                    <Button
                        variant="big"
                        className="border border-white/30 px-4 py-2 rounded-2xl"
                        isLoading={ordering}
                        onPress={async () => {
                            try {
                                setOrdering(true);
                                await initializePaymentSheet(isGerman());
                                await openPaymentSheet(isGerman());
                            } finally {
                                setOrdering(false);
                            }
                        }}
                    >
                        <Typography className="text-white">
                            {isGerman() ? "Zur Kasse" : "Vai al checkout"}
                        </Typography>
                    </Button>
                )}
            </Layout>
        </View>
    );
}
