import Entypo from "@expo/vector-icons/Entypo";
import { useDrawerHeader } from "@/components/common/drawer-header";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { useCallback, useEffect } from "react";
import { FlatList, View, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import { BrandLogoPlaceholder, ItemImagePlaceholder } from "@/lib/placeholder";
import { AntDesign } from "@expo/vector-icons";
import { useLanguageStore } from "@/store/language";
import { useCartStore } from "@/store/cart"; // ✅ import Zustand cart store

export default function CartScreen() {
    const { isGerman } = useLanguageStore();
    const {
        items: cartItems,
        fetchAllCartItemsSettled,
        removeItem,
        loading,
        cartIds,
    } = useCartStore();

    // ✅ Load items once and update when cartIds changes
    useEffect(() => {
        fetchAllCartItemsSettled();
    }, [cartIds.length]);

    const handleRemoveFromCart = (itemId: number) => {
        removeItem(itemId);
    };

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: "/others/shoe-details",
                    params: { id: item.id },
                })
            }
            activeOpacity={0.8}
            className="py-3 mb-4 w-[48%] relative min-h-[260px] overflow-hidden"
        >
            <View className="bg-background rounded-3xl py-6 relative">
                <View className="flex-row px-4 justify-between items-center">
                    {item.match_data ? (
                        <View className="px-2 py-1 border border-primary bg-primary rounded-lg">
                            <Typography
                                className="text-white text-sm"
                                style={{ lineHeight: 12 }}
                            >
                                {`${item.match_data.scrore}% FIT`}
                            </Typography>
                        </View>
                    ) : (
                        <View />
                    )}
                    <TouchableOpacity
                        onPress={() => handleRemoveFromCart(item.id)}
                        style={{ zIndex: 9999 }}
                        className="bg-backgroundDark rounded-full"
                    >
                        <Entypo name="cross" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <Image
                    source={{
                        uri:
                            item.image && typeof item.image.image === "string"
                                ? item.image.image
                                : ItemImagePlaceholder,
                    }}
                    className="w-full h-36 rounded-xl -mt-4"
                    resizeMode="contain"
                />

                <View className="absolute left-1/2 -translate-x-1/2 bottom-6">
                    <Image
                        source={{
                            uri:
                                item.brandLogo && typeof item.brandLogo.image === "string"
                                    ? item.brandLogo.image
                                    : BrandLogoPlaceholder,
                        }}
                        style={{ height: 50, width: 50 }}
                    />
                </View>
            </View>

            <View className="flex-col relative px-1 flex-1">
                <Typography numberOfLines={1}>{item.itemName}</Typography>
                <View className="flex-row justify-between">
                    <Typography>{item.price}</Typography>
                    <View className="flex-row gap-2">
                        {item.colors.slice(0, 3).map((color, idx) => (
                            <View
                                key={idx}
                                className="mt-1 size-6 rounded-full z-1"
                                style={{
                                    backgroundColor: color,
                                    zIndex: 3 - idx,
                                    left: (item.colors.slice(0, 3).length - 1 - idx) * 12,
                                }}
                            />
                        ))}
                        {item.colors.length - 3 > 0 && (
                            <Typography>+{item.colors.length - 3}</Typography>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

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
                                ? `Warenkorb-Artikel: ${cartItems.length}`
                                : `Articoli del carrello: ${cartItems.length}`}
                        </Typography>

                        {cartItems.length === 0 ? (
                            renderEmptyState()
                        ) : (
                            <FlatList
                                data={cartItems}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id.toString()}
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
