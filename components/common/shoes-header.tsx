import HEADER_BG from "@/assets/svgs/shoes-header-bg.svg";
import MAGE_FILTER from "@/assets/svgs/mage_filter.svg";
import { View, FlatList, TouchableOpacity } from "react-native";
import { HeaderBackButton } from "../ui/header-back-button";
import { Typography } from "../ui/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { useLanguageStore } from "@/store/language";
import { twMerge } from "tailwind-merge";

const categories = [
    { it: "SNEAKER", de: "Sneakers", slug: "casual-sneaker" },
    { it: "SCRPE ELEGANTI", de: "ELEGANTE SCHUHE", slug: "elegant-shoes" },
    { it: "SCARPE COMODE", de: "Bequeme Schuhe", slug: "comfortable-shoes" },
    { it: "SANDALI", de: "WARTEN", slug: "sandals" },
    { it: "SCARPE DA LAVORO", de: "ARBEITSSCHUHE", slug: "work-shoes" },
    { it: "VARIE", de: "VERSCHIEDENES", slug: "miscellaneous" },
    { it: "SCARPE DA RUNNING", de: "LAUFSCHUHE", slug: "running-shoes" },
    { it: "SCARPE DA CICLISMO", de: "RADSCHUHE", slug: "cycling-shoes" },
    { it: "SCARPE HOCKEY", de: "SCARPE HOCKEY", slug: "hockey-shoes" },
    { it: "SCARPONI DA SCE", de: "SKISTIEFEL", slug: "ski-boots" },
    { it: "SCARPE DA BASKET", de: "BASKETBALLSCHUHE", slug: "basketball-shoes" },
    { it: "SCARPE DA GOLF", de: "GOLFSCHUHE", slug: "golf-shoes" },
    { it: "SCARPE DA CALCIO", de: "FUSSBALLSCHUHE", slug: "football-shoes" },
    { it: "SCARPE TENNIS", de: "TENNISSCHUHE", slug: "tennis-shoes" },
    { it: "SCARPE DA ARRAMPICATA", de: "Kletterschuhe", slug: "climbing-shoes" },
];

// Category button component
function CategoryButton({
    item,
    isSelected,
    onPress,
}: {
    item: { title: string };
    isSelected: boolean;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={{
                elevation: 10,
            }}
            className={twMerge(
                "px-4 py-2 rounded-full mr-3 border",
                isSelected
                    ? "bg-primary/20 border-primary"
                    : "border-transparent bg-muted-background/20",
            )}
        >
            <Typography
                className={twMerge(
                    "text-sm font-medium",
                    isSelected ? "text-primary" : "text-muted-foreground",
                )}
            >
                {item.title}
            </Typography>
        </TouchableOpacity>
    );
}

export function ShoeHeader() {
    const { isGerman } = useLanguageStore();
    const { top } = useSafeAreaInsets();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const displayedCategories = categories.map((c) => ({
        title: isGerman() ? c.de : c.it,
        slug: c.slug,
    }));

    return (
        <View
            className="bg-background relative overflow-hidden"
            style={{
                paddingTop: top + 12,
                paddingHorizontal: 16,
                paddingBottom: 16,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
                elevation: 10,
            }}
        >
            <View className="absolute bottom-0 right-0">
                <HEADER_BG />
            </View>

            <View className="flex-row justify-between items-center mb-4">
                <View className="flex-row items-center gap-2">
                    <HeaderBackButton />
                    <Typography
                        variant="subtitle"
                        className="font-semibold text-foreground"
                    >
                        Shoe Listing
                    </Typography>
                </View>
                <MAGE_FILTER />
            </View>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={displayedCategories}
                keyExtractor={(item) => item.slug}
                contentContainerStyle={{ paddingRight: 16 }}
                renderItem={({ item, index }) => (
                    <CategoryButton
                        item={item}
                        isSelected={selectedIndex === index}
                        onPress={() => setSelectedIndex(index)}
                    />
                )}
            />
        </View>
    );
}
