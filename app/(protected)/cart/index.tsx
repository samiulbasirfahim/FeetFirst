import Entypo from "@expo/vector-icons/Entypo";
import { useDrawerHeader } from "@/components/common/drawer-header";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { useCallback, useEffect } from "react";
import { FlatList, View, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import { brandPlaceholder, ItemImagePlaceholder } from "@/lib/placeholder";
import { AntDesign } from "@expo/vector-icons";
import { useLanguageStore } from "@/store/language";
import { useCartStore } from "@/store/cart";

export default function CartScreen() {
    const { isGerman } = useLanguageStore();
    const {
        cartItems,
        items: products,
        fetchAllCartItemsSettled,
        removeItem,
        loading,
        getCartCount,
    } = useCartStore();

    useEffect(() => {
        fetchAllCartItemsSettled();
    }, [cartItems.length]);

    const handleRemoveFromCart = (cartItem: any) => {
        removeItem(cartItem);
    };

    console.log("It's the cart Item", cartItems);

    const renderItem = ({ item: cartItem }: any) => {
        const product = products.find((p) => p.id === cartItem.productId);

        if (!product) return null;

        return (
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={() =>
                    router.push({
                        pathname: "/others/shoe-details",
                        params: { id: product.id },
                    })
                }
                className="mb-6 w-[48%]"
            >
                <View className="bg-background rounded-3xl overflow-hidden shadow-lg">
                    <View className="relative bg-muted-background">
                        <TouchableOpacity
                            onPress={() => handleRemoveFromCart(cartItem)}
                            className="absolute right-3 top-3 z-10 bg-background/70 rounded-full p-2"
                        >
                            <Entypo name="cross" size={18} color="white" />
                        </TouchableOpacity>

                        <View>
                            <Image
                                source={{
                                    uri:
                                        product.image && typeof product.image.image === "string"
                                            ? product.image.image
                                            : ItemImagePlaceholder,
                                }}
                                className="w-full h-44"
                                resizeMode="contain"
                            />
                        </View>

                        {/* Brand badge */}
                        {product.brand && (
                            <View className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-background px-3 py-1 rounded-full">
                                <Image
                                    resizeMode="contain"
                                    source={{
                                        uri: product.brand.image ?? brandPlaceholder,
                                    }}
                                    style={{ height: 24, width: 64 }}
                                />
                            </View>
                        )}
                    </View>

                    <View className="p-4 gap-2">
                        <Typography
                            numberOfLines={1}
                            className="text-white text-base font-semibold"
                        >
                            {product.itemName}
                        </Typography>

                        <View className="flex-row items-center justify-between">
                            <Typography className="text-primary text-lg font-bold">
                                € {product.price}
                            </Typography>

                            <View className="flex-row items-center gap-2">
                                <View
                                    className="w-4 h-4 rounded-full border border-white/30"
                                    style={{ backgroundColor: cartItem.color }}
                                />
                            </View>
                        </View>

                        <View className="flex-row gap-2 justify-between">
                            <View className="px-3 py-1 rounded-lg bg-muted-background">
                                <Typography className="text-xs text-white">
                                    {isGerman() ? "Größe" : "Taglia"}: {cartItem.size}
                                </Typography>
                            </View>

                            <View className="px-3 py-1 rounded-lg bg-muted-background">
                                <Typography className="text-xs text-white">
                                    {isGerman() ? "Menge" : "Qty"}: {cartItem.quantity}
                                </Typography>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const { HeaderComponent } = useDrawerHeader({
        threeshold: 100,
        shouldGoBack: true,
    });

    const renderEmptyState = useCallback(
        () => (
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
        ),
        [isGerman],
    );

    return (
        <View className="flex-1 bg-backgroundDark">
            {HeaderComponent}
            <Layout scrollable avoidTabbar className="bg-backgroundDark">
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <View>
                        <Typography className="text-white text-2xl mb-4">
                            {isGerman()
                                ? `Warenkorb (${getCartCount()})`
                                : `Carrello (${getCartCount()})`}
                        </Typography>

                        {getCartCount() === 0 ? (
                            renderEmptyState()
                        ) : (
                            <FlatList
                                data={cartItems.filter((x) => x.productId && x.sizeId)}
                                renderItem={renderItem}
                                keyExtractor={(item, idx) =>
                                    `${item.productId}-${item.sizeId}-${item.color}-${idx}`
                                }
                                numColumns={2}
                                columnWrapperStyle={{
                                    justifyContent: "space-between",
                                }}
                            />
                        )}
                    </View>
                )}
            </Layout>
        </View>
    );
}
