import { SubCategory } from "@/components/common/category";
import ShoeHeader from "@/components/common/category-header";
import { VersionInfo } from "@/components/common/version";
import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { NormalCategories, SportsCategories, Category } from "@/lib/categories";
import { useLanguageStore } from "@/store/language";
import { router, useLocalSearchParams } from "expo-router";
import { useWindowDimensions, View } from "react-native";

export default function Screen() {
    const { width, height } = useWindowDimensions();
    const { category } = useLocalSearchParams<{ category: string }>();
    const { isGerman } = useLanguageStore();

    const isNormal = category === "normal";
    const categories: Category[] = isNormal ? NormalCategories : SportsCategories;
    const langKey: "name_it" | "name_de" = isGerman() ? "name_de" : "name_it";

    return (
        <View className="flex-1">
            <ShoeHeader />
            <Layout className="bg-backgroundDark" scrollable edges={[]} noPadding>
                <View
                    className="flex-1 items-center justify-start p-3"
                    style={{ minHeight: height }}
                >
                    <View className="mb-6">
                        <Typography
                            className="text-white font-pathBold text-[18px]"
                            variant="title"
                        >
                            {isGerman() ? "Shoe Finder FeetF1rst" : "Trova scarpe FeetF1rst"}
                        </Typography>

                        <Typography
                            className="text-white font-pathRegular text-[12px]"
                            variant="caption"
                        >
                            {isGerman()
                                ? "Kategorie wählen wir zeigen dir deine besten Treffer"
                                : "Scegli una categoria e ti mostreremo i risultati migliori."}
                        </Typography>
                    </View>

                    {categories.map((cat) => (
                        <SubCategory
                            key={cat.slug}
                            title={cat[langKey]}
                            height={(height * 0.6) / 3}
                            image={cat.image}
                            onPress={() =>
                                router.push({
                                    pathname: "/(protected)/shoe-recommendations/shoes",
                                    params: { category: cat.slug },
                                })
                            }
                        />
                    ))}

                    <View className="w-full" style={{ marginBottom: 40 }}>
                        <VersionInfo />
                    </View>
                </View>
            </Layout>
        </View>
    );
}
