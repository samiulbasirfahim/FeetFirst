import { View, FlatList, useWindowDimensions, Image } from "react-native";
import React from "react";
import { Typography } from "@/components/ui/typography";
import { useGetNews } from "@/lib/queries/news";
import { useLanguageStore } from "@/store/language";
import { News } from "@/type/news";
import { LoadingSpinner } from "../common/loading-spinner";
import { NewsCard } from "../common/newsCard";

const NewsFlatlist = () => {
    const { width } = useWindowDimensions();
    const { isPending: news_pending, data } = useGetNews();
    const { isGerman } = useLanguageStore();

    const renderItem = ({ item }: { item: News }) => {
        return <NewsCard item={item} />;
    };

    return (
        <>
            {!news_pending && (data?.length ?? 0) > 0 && (
                <View className="w-[90%] mx-auto mb-3">
                    <Typography className="text-2xl font-semibold text-[#C3C3C3]">
                        FeetF1rst News
                    </Typography>
                </View>
            )}
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
