import { Category } from "@/components/common/category";
import ShoeHeader from "@/components/common/category-header";
import { VersionInfo } from "@/components/common/version";
import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { router } from "expo-router";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { useEffect, useRef } from "react";
import { ImageBackground, useWindowDimensions, View } from "react-native";

const categoriesDE = [
    { title: "Alltagsschuhe", id: "normal" },
    { title: "Sportschuhe", id: "sports" },
];

const categoriesIT = [
    { title: "Scarpe da tutti i giorni", id: "normal" },
    { title: "Scarpe sportive", id: "sports" },
];

export default function Screen() {
    const { isGerman } = useLanguageStore();
    const { width, height } = useWindowDimensions();
    const categories = isGerman() ? categoriesDE : categoriesIT;

    const { redirect, redirectId, ...args } = useLocalSearchParams();
    const processedRedirects = useRef(new Set());

    useEffect(() => {
        if (redirect && redirectId && !processedRedirects.current.has(redirectId)) {
            processedRedirects.current.add(redirectId);

            // if (router.canDismiss()) router.dismiss();

            router.push({
                pathname: redirect as any,
                params: {
                    ...args,
                },
            });
        }
    }, [redirect, redirectId]);

    return (
        <View className="flex-1">
            <ShoeHeader />
            <Layout className="bg-backgroundDark" scrollable edges={[]} noPadding>
                <View
                    className="flex-1 items-center justify-start p-3"
                    style={{
                        minHeight: height,
                    }}
                >
                    <View className="mb-6">
                        <Typography variant="title" className="text-white font-pathBold text-[18px]">
                            {isGerman() ? "Shoe Finder FeetF1rst" : "Trova scarpe FeetF1rst"}
                        </Typography>

                        <Typography className="text-white font-pathRegular text-[12px]" variant="selected">
                            {isGerman()
                                ? "Kategorie wählen wir zeigen dir deine besten Treffer"
                                : "Scegli una categoria e ti mostreremo i risultati migliori."}
                        </Typography>
                    </View>
                    <ImageBackground
                        source={require("@/assets/images/category_background.png")}
                        style={{
                            width: width * 0.9,
                            height: height * 0.6,
                        }}
                        resizeMode="cover"
                    >
                        {categories.map((category, i) => (
                            <Category
                                key={i}
                                onPress={() => {
                                    router.push({
                                        pathname: "/(protected)/shoe-recommendations/subcategory",
                                        params: {
                                            category: category.id,
                                        },
                                    });
                                }}
                                height={(height * 0.6) / (categories.length + 1)}
                                {...category}
                            />
                        ))}

                        <Category
                            onPress={() => {
                                router.push({
                                    pathname: "/(protected)/shoe-recommendations/shoes",
                                    params: {
                                        Category: "mountain",
                                    },
                                });
                            }}
                            title={isGerman() ? "Berg Trekkingschuhe" : "Berg Trekkingschuhe"}
                            height={(height * 0.6) / (categories.length + 1)}
                            last
                        />
                    </ImageBackground>

                    <View
                        className="w-full"
                        style={{
                            marginBottom: 40,
                        }}
                    >
                        <VersionInfo />
                    </View>
                </View>
            </Layout>
        </View>
    );
}
