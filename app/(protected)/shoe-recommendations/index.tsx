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
  { title: "ALLTAGSSCHUHE", id: "normal" },
  { title: "SPORTSCHUHE", id: "sports" },
];

const categoriesIT = [
  { title: "SCARPE DA TUTTI I GIORNI", id: "normal" },
  { title: "SCARPE SPORTIVE", id: "sports" },
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

      if (router.canDismiss()) router.dismissAll();

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
            <Typography className="text-foreground" variant="title">
              {isGerman() ? "Shoe Finder FeetFirst" : "Trova scarpe FeetFirst"}
            </Typography>

            <Typography className="text-foreground" variant="caption">
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
              title={isGerman() ? "BERG-TREKKINGSCHUHE" : "BERG-TREKKINGSCHUHE"}
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
