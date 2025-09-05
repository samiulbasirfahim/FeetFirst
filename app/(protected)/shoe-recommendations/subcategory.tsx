import { Category, SubCategory } from "@/components/common/category";
import ShoeHeader from "@/components/common/shoe-header";
import { VersionInfo } from "@/components/common/version";
import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { router, useLocalSearchParams } from "expo-router";
import { useWindowDimensions, View } from "react-native";

import sports1 from "@/assets/images/sports1.png";
import sports2 from "@/assets/images/sports2.png";
import sports3 from "@/assets/images/sports3.png";
import sports4 from "@/assets/images/sports4.png";
import sports5 from "@/assets/images/sports5.png";
import sports6 from "@/assets/images/sports6.png";
import sports7 from "@/assets/images/sports7.png";
import sports8 from "@/assets/images/sports8.png";
import sports9 from "@/assets/images/sports9.png";

import normal1 from "@/assets/images/normal1.png";
import normal2 from "@/assets/images/normal2.png";
import normal3 from "@/assets/images/normal3.png";
import normal4 from "@/assets/images/normal4.png";
import normal5 from "@/assets/images/normal5.png";
import normal6 from "@/assets/images/normal6.jpg";

export const sportsImages: Record<number, any> = {
    1: sports1,
    2: sports2,
    3: sports3,
    4: sports4,
    5: sports5,
    6: sports6,
    7: sports7,
    8: sports8,
    9: sports9,
};

export const normalImages: Record<number, any> = {
    1: normal1,
    2: normal2,
    3: normal3,
    4: normal4,
    5: normal5,
    6: normal6,
};

const normalIT = [
    "SCARPE CASUAL E SNEAKER",
    "SCRPE ELEGANTI",
    "SCARPE COMODE",
    "SANDALI",
    "SCARPE DA LAVORO",
    "VARIE",
];
const normalDE = [
    "Freizeitschuhe und Sneakers",
    "ELEGANTE SCHUHE",
    "Bequeme Schuhe",
    "WARTEN",
    "ARBEITSSCHUHE",
    "VERSCHIEDENES",
];

const sportsIT = [
    "SCARPE DA RUNNING",
    "SCARPE DA CICLISMO",
    "SCARPE HOCKEY",
    "SCARPONI DA SCE",
    "SCARPE DA BASKET",
    "SCARPE DA GOLF",
    "SCARPE DA CALCIO",
    "SCARPE TENNIS",
    "SCARPE DA ARRAMPICATA",
];
const sportsDE = [
    "LAUFSCHUHE",
    "RADSCHUHE",
    "SCARPE HOCKEY",
    "SKISTIEFEL",
    "BASKETBALLSCHUHE",
    "GOLFSCHUHE",
    "FUSSBALLSCHUHE",
    "TENNISSCHUHE",
];

export const slugNormal = [
    "casual-sneaker",
    "elegant-shoes",
    "comfortable-shoes",
    "sandals",
    "work-shoes",
    "miscellaneous",
];

export const slugSports = [
    "running-shoes",
    "cycling-shoes",
    "hockey-shoes",
    "ski-boots",
    "basketball-shoes",
    "golf-shoes",
    "football-shoes",
    "tennis-shoes",
    "climbing-shoes",
];

export default function Screen() {
    const { width, height } = useWindowDimensions();
    const { category } = useLocalSearchParams();
    const { isGerman } = useLanguageStore();

    const slug = category === "normal" ? slugNormal : slugSports;

    const categories =
        category === "normal"
            ? isGerman()
                ? normalDE
                : normalIT
            : isGerman()
                ? sportsDE
                : sportsIT;
    return (
        <Layout
            className="bg-backgroundDark"
            scrollable
            stickyIndex={[0]}
            edges={[]}
            noPadding
        >
            <ShoeHeader />

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

                {categories.map((cat, i) => {
                    return (
                        <SubCategory
                            onPress={() =>
                                router.push({
                                    pathname: "/(protected)/shoe-recommendations/shoes",
                                    params: {
                                        category: slug[i],
                                    },
                                })
                            }
                            key={i}
                            title={cat}
                            height={(height * 0.6) / 3}
                            image={
                                category === "normal"
                                    ? normalImages[i + 1]
                                    : sportsImages[i + 1]
                            }
                        />
                    );
                })}

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
    );
}
