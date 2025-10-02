import HEADER_BG from "@/assets/svgs/shoes-header-bg.svg";
import MAGE_FILTER from "@/assets/svgs/mage_filter.svg";
import { View, FlatList, TouchableOpacity } from "react-native";
import { HeaderBackButton } from "../ui/header-back-button";
import { Typography } from "../ui/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import { useLanguageStore } from "@/store/language";
import { twMerge } from "tailwind-merge";
import { NormalCategories, SportsCategories } from "@/lib/categories";

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

export function ShoeHeader({
    setSelected,
    default_value,
}: {
    setSelected: (sel: string) => void;
    default_value: string;
}) {
    const flatListRef = useRef<FlatList>(null);
    const { isGerman } = useLanguageStore();
    const { top } = useSafeAreaInsets();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const displayedCategories = [
        ...NormalCategories.map((c) => ({
            title: isGerman() ? c.name_de : c.name_it,
            slug: c.slug,
        })),
        ...SportsCategories.map((c) => ({
            title: isGerman() ? c.name_de : c.name_it,
            slug: c.slug,
        })),
    ];

    useEffect(() => {
        const defaultIndex = displayedCategories.findIndex(
            (cat) => cat.slug === default_value,
        );

        if (defaultIndex !== -1) {
            setSelected(displayedCategories[defaultIndex].slug);
            setSelectedIndex(defaultIndex);

            // Scroll to the selected index after a short delay to ensure the list is rendered
            setTimeout(() => {
                flatListRef.current?.scrollToIndex({
                    index: defaultIndex,
                    animated: true,
                    viewPosition: 0.5, // Centers the item in the viewport
                });
            }, 100);
        }
    }, [default_value]);

    // Handle scroll failure (in case the item is out of initial render area)
    const handleScrollToIndexFailed = (info: {
        index: number;
        highestMeasuredFrameIndex: number;
        averageItemLength: number;
    }) => {
        flatListRef.current?.scrollToOffset({
            offset: info.averageItemLength * info.index,
            animated: true,
        });
        setTimeout(() => {
            flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
                viewPosition: 0.5,
            });
        }, 100);
    };

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
                ref={flatListRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={displayedCategories}
                keyExtractor={(item) => item.slug}
                contentContainerStyle={{ paddingRight: 16 }}
                onScrollToIndexFailed={handleScrollToIndexFailed}
                renderItem={({ item, index }) => (
                    <CategoryButton
                        item={item}
                        isSelected={selectedIndex === index}
                        onPress={() => {
                            setSelectedIndex(index);
                            setSelected(item.slug);
                        }}
                    />
                )}
            />
        </View>
    );
}
