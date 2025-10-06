import { Layout } from "@/components/layout/layout";
import {
    useGetFavourites,
    useAddFavourite,
    useRemoveFavourite,
} from "@/lib/queries/favourite";
import { useLanguageStore } from "@/store/language";
import { AntDesign } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import { type ShoeItem } from "@/type/product";
import { ItemImagePlaceholder } from "@/lib/placeholder";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { Typography } from "@/components/ui/typography";

function ShoeCard({
    item,
    add_to_favourite,
    remove_from_favourite,
    pending_add,
    pending_remove,
}: {
    item: ShoeItem;
    add_to_favourite: (id: number, options?: any) => void;
    remove_from_favourite: (id: number, options?: any) => void;
    pending_add: boolean;
    pending_remove: boolean;
}) {
    const [liked, setLiked] = React.useState(item.favourite);
    const { width } = useWindowDimensions();

    const imageUri =
        item.image && typeof item.image.image === "string"
            ? item.image.image
            : ItemImagePlaceholder;

    const toggleFavourite = () => {
        if (liked) {
            setLiked(false);
            remove_from_favourite(item.id, {
                onSuccess() {
                    setLiked(false);
                },
                onError() {
                    setLiked(true);
                },
            });
        } else {
            setLiked(true);
            add_to_favourite(item.id, {
                onSuccess() {
                    setLiked(true);
                },
                onError() {
                    setLiked(false);
                },
            });
        }
    };

    return (
        <TouchableOpacity
            className="bg-background rounded-2xl shadow-lg flex-1 mx-1 mb-4 overflow-hidden"
            style={{
                maxWidth: width / 2,
            }}
            activeOpacity={0.8}
        >
            <View className="relative">
                <Image
                    source={{ uri: imageUri }}
                    className="w-3/4 h-36 left-6 top-6"
                    resizeMode="contain"
                />

                <TouchableOpacity
                    disabled={pending_add || pending_remove}
                    onPress={toggleFavourite}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md"
                >
                    <AntDesign
                        name={liked ? "heart" : "hearto"}
                        size={18}
                        color={liked ? "#ef4444" : "#6b7280"}
                    />
                </TouchableOpacity>
            </View>

            <View className="p-4">
                <Text className="text-white font-bold" numberOfLines={2}>
                    {item.itemName ?? ""}
                </Text>
                <Text className="text-muted-foreground text-sm mb-3" numberOfLines={1}>
                    {item.brandLogo?.name}
                </Text>
                <View className="flex-row justify-between items-center">
                    <View className="bg-primary px-3 py-1 rounded-xl">
                        <Text className="text-white text-xs font-bold">
                            {item.match_percentage
                                ? `${item.match_percentage.score} FIT`
                                : "N/A"}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default function FavoriteShoes() {
    const { isGerman } = useLanguageStore();
    const { favouriteList, error, isPending } = useGetFavourites();

    const { mutate: add_to_favourite, isPending: pending_add } =
        useAddFavourite();
    const { mutate: remove_from_favourite, isPending: pending_remove } =
        useRemoveFavourite();

    const renderEmptyState = useCallback(
        () => (
            <View className="flex-1 justify-center items-center py-20">
                <AntDesign name="hearto" size={64} color="#6b7280" />
                <Text className="text-muted-foreground text-lg font-medium mt-4 text-center">
                    {isGerman() ? "Keine Favoriten gefunden" : "Nessun preferito trovato"}
                </Text>
                <Text className="text-muted-foreground text-sm mt-2 text-center px-8">
                    {isGerman()
                        ? "Füge Schuhe zu deinen Favoriten hinzu, um sie hier zu sehen"
                        : "Aggiungi scarpe ai tuoi preferiti per vederle qui"}
                </Text>
            </View>
        ),
        [isGerman],
    );

    if (isPending) {
        return (
            <Layout className="bg-backgroundDark flex-1 justify-center items-center">
                <LoadingSpinner />
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout className="bg-background">
                <Typography variant="error">Failed to load favourites</Typography>
            </Layout>
        );
    }

    return (
        <Layout className="bg-backgroundDark">
            {favouriteList.length === 0 ? (
                renderEmptyState()
            ) : (
                <FlatList
                    data={favouriteList}
                    renderItem={({ item }) => (
                        <ShoeCard
                            item={item}
                            add_to_favourite={add_to_favourite}
                            remove_from_favourite={remove_from_favourite}
                            pending_add={pending_add}
                            pending_remove={pending_remove}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                />
            )}
        </Layout>
    );
}
