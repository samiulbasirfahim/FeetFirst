import { View, FlatList, useWindowDimensions, Image } from "react-native";
import React from "react";
import { Typography } from "@/components/ui/typography";
import { useGetNews } from "@/lib/queries/news";
import { useLanguageStore } from "@/store/language";
import { News } from "@/type/news";
import { LoadingSpinner } from "../common/loading-spinner";

const NewsFlatlist = () => {
    const { width } = useWindowDimensions();
    const { isPending: news_pending, data } = useGetNews();
    const { isGerman } = useLanguageStore();

    const renderItem = ({ item }: { item: News }) => {
        const title = isGerman() ? item.title_de : item.title_it;
        const description = isGerman() ? item.content_de : item.content_it;
        return (
            <View
                className="mr-4 border border-primary/20 rounded-2xl bg-background"
                style={{ width: width * 0.85 }}
            >
                <View className="flex-row p-3 gap-3 justify-between items-center">
                    <Image
                        source={{ uri: item.image }}
                        style={{ width: 90, height: 90 }}
                        className="border border-primary rounded-2xl"
                    />
                    <View className="flex-1">
                        <Typography
                            className="text-sm font-medium mb-1.5"
                            numberOfLines={2}
                        >
                            {title}
                        </Typography>
                        <Typography className="text-[10px]" numberOfLines={3}>
                            {description}
                        </Typography>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <>
            <View className="w-[90%] mx-auto mb-3">
                <Typography className="text-2xl font-semibold text-[#C3C3C3]">
                    FeetF1rst News
                </Typography>
            </View>
            {!news_pending ? (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    style={{
                        width: "100%",
                        paddingHorizontal: (width * 0.1) / 2,
                    }}
                    keyExtractor={(item, index) => item.created_at + index.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
};

export default NewsFlatlist;
