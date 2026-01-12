import ShoeHeader from "@/components/common/category-header";
import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { FlatList, Image, View } from "react-native";
import { ShoppingDropDown } from "@/components/common/shopping-dropdown";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NormalCategories, SportsCategories } from "@/lib/categories";
import { useOrderList } from "@/lib/queries/order-list";
import type { OrderItem } from "@/type/order";
import { useAddToCart } from "@/lib/queries/cart";
import { RatingModal } from "@/components/common/rating";
import { notify } from "@/lib/notify";
import { AntDesign } from "@expo/vector-icons";

const formatDate = (iso: string) => new Date(iso).toLocaleDateString("de-DE");

const getYear = (iso: string) => new Date(iso).getFullYear().toString();

export default function Screen() {
    const { isGerman } = useLanguageStore();

    const { data, isLoading } = useOrderList();

    console.log("Order data:", data);

    const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

    const [selectedYear, setSelectedYear] = useState<string>("all");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const OrderCard = ({ item }: { item: OrderItem }) => {
        const { isGerman } = useLanguageStore();
        const { mutate: addToCart, isPending } = useAddToCart();

        const categoryLabel = (item.sub_category ?? "")
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

        const openModal = () => {
            setSelectedOrder(item);
        };

        const addToCartHandler = () => {
            addToCart(
                {
                    product: item.product_id,
                    size_id: item.details.size_id,
                    color: item.details.color,
                    quantity: 1,
                },
                {
                    onSuccess: () => {
                        notify({
                            type: "success",
                            title: isGerman()
                                ? "Erfolgreich hinzugefügt"
                                : "Aggiunto con successo",
                            message: isGerman()
                                ? "Artikel zum Warenkorb hinzugefügt"
                                : "Articolo aggiunto al carrello",
                        });
                    },
                    onError: () => {
                        notify({
                            type: "error",
                            title: isGerman()
                                ? "Fehler beim Hinzufügen"
                                : "Errore durante l'aggiunta",
                            message: isGerman()
                                ? "Artikel konnte nicht zum Warenkorb hinzugefügt werden"
                                : "Impossibile aggiungere l'articolo al carrello",
                        });
                    },
                },
            );
        };

        return (
            <View className="flex-1 flex-row gap-4">
                <View className="flex-1 gap-2 justify-between">
                    <View style={{ flex: 1, gap: 8 }}>
                        <Typography variant="selected" className="text-white">
                            {item.product}
                        </Typography>

                        <Typography className="text-sm text-gray-400">
                            {isGerman() ? "Kategorie" : "Categoria"}: {categoryLabel}
                        </Typography>

                        <View className="flex-row gap-2 justify-between items-center pe-2">
                            <View className="px-3 py-1 rounded-lg bg-muted-background">
                                <Typography className="text-xs text-white">
                                    {isGerman() ? "Größe" : "Taglia"}: {item.details.size}
                                </Typography>
                            </View>

                            <View
                                className="w-4 h-4 rounded-full border border-white/30"
                                style={{ backgroundColor: item.details.color }}
                            />

                            <View className="px-3 py-1 rounded-lg bg-muted-background">
                                <Typography className="text-xs text-white">
                                    {isGerman() ? "Menge" : "Qty"}: {item.details.quantity}
                                </Typography>
                            </View>
                        </View>

                        <Typography className="text-sm text-gray-400">
                            {isGerman() ? "Geliefert am" : "Consegnato il"}{" "}
                            {formatDate(item.created_at)}
                        </Typography>
                    </View>

                    <View className="gap-2 mt-2">
                        <Button
                            className="bg-white rounded-none"
                            textClassName="text-sm text-black"
                            onPress={addToCartHandler}
                            isLoading={isPending}
                        >
                            {isGerman() ? "Nochmal bestellen" : "Ordina di nuovo"}
                        </Button>

                        <Button
                            className="bg-primary rounded-none"
                            textClassName="text-sm text-white"
                            onPress={openModal}
                        >
                            {isGerman() ? "Bewerten" : "Valuta"}
                        </Button>
                    </View>
                </View>

                <View className="flex-1 gap-2">
                    <View className="relative w-full aspect-square">
                        <Image
                            source={{ uri: item.details.image }}
                            className="w-full h-full rounded"
                            resizeMode="contain"
                        />

                        {item.match_data && (
                            <View className="absolute top-2 right-2 bg-primary rounded-lg px-2 py-1">
                                <Typography className="text-white font-semibold text-xs">
                                    {item.match_data.score}% Fit
                                </Typography>
                            </View>
                        )}
                    </View>

                    <Button
                        variant="outline"
                        className="border-white rounded-none"
                        textClassName="text-white text-sm"
                    >
                        {isGerman() ? "Verfolgen" : "Traccia"}
                    </Button>
                </View>
            </View>
        );
    };

    const orders: OrderItem[] = data || [];

    const displayedCategories = [
        {
            title: "All",
            slug: "all",
        },
        ...NormalCategories.map((c) => ({
            title: isGerman() ? c.name_de : c.name_it,
            slug: c.slug,
        })),
        ...SportsCategories.map((c) => ({
            title: isGerman() ? c.name_de : c.name_it,
            slug: c.slug,
        })),
        {
            title: isGerman() ? "Berg Trekkingschuhe" : "Montagna & Trekking",
            slug: "mountain-trekking-shoes",
        },
    ];

    const years = [
        { label: isGerman() ? "Alle Jahre" : "Tutti gli anni", value: "all" },
        ...Array.from(new Set(orders.map((o) => getYear(o.created_at))))
            .sort((a, b) => Number(b) - Number(a))
            .map((y) => ({ label: y, value: y })),
    ];

    const purchasedCategories = Array.from(
        new Set(orders.map((o) => o.sub_category ?? "")),
    );

    const dynamicCategories = [
        {
            label: isGerman() ? "Alle Kategorien" : "Tutte le categorie",
            value: "all",
        },

        ...displayedCategories
            .filter((c) => purchasedCategories.includes(c.slug))
            .map((c) => ({
                label: c.title,
                value: c.slug,
            })),
    ];

    const filteredOrders = orders.filter((order) => {
        const orderYear = new Date(order.created_at).getFullYear().toString();

        const matchYear = selectedYear === "all" || orderYear === selectedYear;

        const matchCategory =
            selectedCategory === "all"
                ? true
                : (order.sub_category ?? "") === selectedCategory;

        return matchYear && matchCategory;
    });

    if (isLoading) {
        return (
            <Layout noPadding className="bg-backgroundDark">
                <View className="flex-1 justify-center items-center py-20">
                    <AntDesign name="shoppingcart" size={64} color="#6b7280" />
                    <Typography className="text-white">
                        {isGerman() ? "Laden..." : "Caricamento..."}
                    </Typography>
                </View>
            </Layout>
        );
    }

    if (orders.length === 0) {
        return (
            <View className="flex-1 justify-center items-center py-20">
                <AntDesign name="shoppingcart" size={64} color="#6b7280" />
                <Typography className="text-muted-foreground text-lg font-medium mt-4 text-center">
                    {isGerman()
                        ? "Füge Produkte zu deinem Warenkorb hinzu, um sie hier zu sehen"
                        : "Nessun articolo nel carrello"}
                </Typography>
                <Typography className="text-muted-foreground text-sm mt-2 text-center px-8">
                    {isGerman()
                        ? "Keine Artikel im Warenkorb"
                        : "Aggiungi prodotti al carrello per vederli qui"}
                </Typography>
            </View>
        );
    }

    return (
        <Layout noPadding className="bg-backgroundDark">
            <ShoeHeader />

            <RatingModal
                orderDetails={selectedOrder!}
                isOpen={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
            />

            <>
                <View className="p-3 gap-4">
                    <Typography className="text-white" variant="title">
                        {isGerman() ? "Einkäufe" : "Acquisti"}
                    </Typography>

                    <ShoppingDropDown
                        value={selectedYear}
                        onChange={(data) => setSelectedYear(data.value)}
                        list={years}
                    />

                    <ShoppingDropDown
                        value={selectedCategory}
                        onChange={(data) => setSelectedCategory(data.value)}
                        list={dynamicCategories}
                    />
                </View>

                <FlatList
                    contentContainerStyle={{
                        paddingBottom: 100,
                        paddingHorizontal: 12,
                        marginTop: 20,
                    }}
                    ItemSeparatorComponent={() => (
                        <View className="h-12 flex-1 justify-center">
                            <View className="h-[1px] bg-muted-foreground"></View>
                        </View>
                    )}
                    data={filteredOrders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <OrderCard item={item} />}
                />
            </>
        </Layout>
    );
}
