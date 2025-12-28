import ShoeHeader from "@/components/common/category-header";
import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { FlatList, Image, View } from "react-native";
import { ShoppingDropDown } from "@/components/common/shopping-dropdown";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NormalCategories, SportsCategories } from "@/lib/categories";

export type DeliveryInfo = {
    date: string;
    year: number;
    delivered: boolean;
};

export type ShoppingItem = {
    id: number;
    title: string;
    image: string;
    category: string;
    delivery: DeliveryInfo;
    match_data: number | null;
    size: string;
    quantity: number;
    color: string;
};

const PLACEHOLDER =
    "https://res.cloudinary.com/dmiycxciu/image/upload/v1/media/products/168_yf0z0a";

export const orders: ShoppingItem[] = Array.from({ length: 100 }, (_, i) => {
    const id = i + 1;

    const categories = [
        "running-shoes",
        "casual-sneaker",
        "football-shoes",
        "sandals",
        "tennis-shoes",
        "golf-shoes",
        "work-shoes",
        "mountain-trekking-shoes",
    ];

    const colors = [
        "#000000",
        "#FFFFFF",
        "#FF5500",
        "#3366FF",
        "#22AAFF",
        "#00CC88",
        "#A67B5B",
        "#444444",
    ];

    const sizes = ["41", "42", "42.5", "43", "44"];

    const category = categories[i % categories.length];
    const color = colors[i % colors.length];
    const size = sizes[i % sizes.length];

    return {
        id,
        title: `Product ${id}`,
        image: PLACEHOLDER,
        category,
        size,
        quantity: (i % 3) + 1, // 1–3
        color,
        match_data: i % 7 === 0 ? null : 70 + (i % 30), // null sometimes
        delivery: {
            date: `${String((i % 28) + 1).padStart(2, "0")}.${String(
                (i % 12) + 1,
            ).padStart(2, "0")}.2025`,
            year: 2025,
            delivered: i % 5 !== 0,
        },
    };
});

const OrderCard = ({ item }: { item: (typeof orders)[0] }) => {
    const { isGerman } = useLanguageStore();

    const categoryLabel = item.category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <View className="flex-1 flex-row gap-4">
            <View className="flex-1 gap-2 justify-between">
                <View style={{ flex: 1, gap: 8 }}>
                    <Typography variant="selected" className="text-white">
                        {item.title}
                    </Typography>

                    <Typography className="text-sm text-gray-400">
                        {isGerman() ? "Kategorie" : "Categoria"}: {categoryLabel}
                    </Typography>

                    <View className="flex-row gap-2 justify-between items-center px-2">
                        <View className="px-3 py-1 rounded-lg bg-muted-background">
                            <Typography className="text-xs text-white">
                                {isGerman() ? "Größe" : "Taglia"}: {item.size}
                            </Typography>
                        </View>

                        <View
                            className="w-4 h-4 rounded-full border border-white/30"
                            style={{ backgroundColor: item.color }}
                        />

                        <View className="px-3 py-1 rounded-lg bg-muted-background">
                            <Typography className="text-xs text-white">
                                {isGerman() ? "Menge" : "Qty"}: {item.quantity}
                            </Typography>
                        </View>
                    </View>

                    <Typography className="text-sm text-gray-400">
                        {isGerman() ? "Geliefert am" : "Consegnato il"} {item.delivery.date}
                    </Typography>
                </View>

                <View className="gap-2 mt-2">
                    <Button
                        className="bg-white rounded-none"
                        textClassName="text-sm text-black"
                    >
                        {isGerman() ? "Nochmal bestellen" : "Ordina di nuovo"}
                    </Button>

                    <Button
                        className="bg-primary rounded-none"
                        textClassName="text-sm text-white"
                    >
                        {isGerman() ? "Bewerten" : "Valuta"}
                    </Button>
                </View>
            </View>

            {/* RIGHT SIDE */}
            <View className="flex-1 gap-2">
                <View className="relative w-full aspect-square">
                    <Image
                        source={{ uri: PLACEHOLDER }}
                        className="w-full h-full rounded"
                        resizeMode="contain"
                    />

                    {item.match_data && (
                        <View className="absolute top-2 right-2 bg-primary rounded-lg px-2 py-1">
                            <Typography className="text-white font-semibold text-xs">
                                {item.match_data}% Fit
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
export default function Screen() {
    const { isGerman } = useLanguageStore();

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

    const [selectedYear, setSelectedYear] = useState<string>("all");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const dynamicYears = [
        {
            label: isGerman() ? "Alle Jahre" : "Tutti gli anni",
            value: "all",
        },
        ...Array.from(new Set(orders.map((o) => o.delivery.date.split(".")[2])))
            .sort((a, b) => Number(b) - Number(a))
            .map((year) => ({ label: year, value: year })),
    ];

    const purchasedCategories = Array.from(
        new Set(orders.map((o) => o.category)),
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

    // FILTER LOGIC - After state and dynamic data
    const filteredOrders = orders.filter((order) => {
        const orderYear = order.delivery.date.split(".")[2];

        const matchYear =
            selectedYear === "all" ? true : orderYear === selectedYear;

        const matchCategory =
            selectedCategory === "all" ? true : order.category === selectedCategory;

        return matchYear && matchCategory;
    });

    return (
        <Layout noPadding className="bg-backgroundDark">
            <ShoeHeader />

            <>
                <View className="p-3 gap-4">
                    <Typography className="text-white" variant="title">
                        {isGerman() ? "Einkäufe" : "Acquisti"}
                    </Typography>

                    {/* YEAR PICKER */}
                    <ShoppingDropDown
                        value={selectedYear}
                        onChange={(data) => setSelectedYear(data.value)}
                        list={dynamicYears}
                    />

                    {/* CATEGORY PICKER */}
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
