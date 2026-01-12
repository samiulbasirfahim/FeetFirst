import { ShoeHeader } from "@/components/common/shoes-header";
import { Layout } from "@/components/layout/layout";
import HERO from "@/assets/svgs/shoes_header.svg";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { useProducts, useQNA } from "@/lib/queries/products";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { questions } from "@/lib/category-questions";
import { useQuestionStore } from "@/store/questions-answers";
import { CategorySlug } from "@/type/questions-answers";

export default function Screen() {
    const { category } = useLocalSearchParams<{ category: string }>();
    const {
        getCategoryAnswers,
        answers,
        clearCategory,
        should_reset,
        setShouldReset,
    } = useQuestionStore();
    const pathname = usePathname();

    const [hero_w, setHero_w] = useState(0);
    const [page, setPage] = useState<number>(1);
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => {
        if (pathname !== "/shoe-recommendations/shoes") {
            return;
        }

        if (should_reset) {
            clearCategory((selected ?? category) as CategorySlug);
            setShouldReset(false);
        }
    }, [pathname]);

    useEffect(() => {
        clearCategory((selected ?? category) as CategorySlug);
    }, [selected, category]);

    const {
        shoeList: shoeList_d,
        isPending,
        hasNext,
        hasPrev,
    } = useProducts(page, selected, pathname === "/shoe-recommendations/shoes");

    const {
        isPending: isPending_q,
        shoeList: shoeList_q,
        hasNext: hasNext_q,
        hasPrev: hasPrev_q,
    } = useQNA({
        sub_category: selected ?? category ?? "",
        page: page,
        questions: getCategoryAnswers((selected ?? category) as CategorySlug),
        enabled: pathname === "/shoe-recommendations/shoes",
    });

    const exist_questions = useMemo(() => {
        const answrs = getCategoryAnswers((selected ?? category) as any);
        console.log(answrs);
        return answrs.length > 0;
    }, [selected, router, answers, category]);

    const exist_question_entryh = useMemo(() => {
        return questions[(selected ?? category) as any] !== undefined;
    }, [selected, router, answers]);

    useEffect(() => {
        if (pathname !== "/shoe-recommendations/shoes") {
            return;
        }
    }, [selected, router, answers, category]);

    const isPending_active = exist_questions ? isPending_q : isPending;
    const hasNext_active = exist_questions ? hasNext_q : hasNext;
    const hasPrev_active = exist_questions ? hasPrev_q : hasPrev;
    const shoeList = exist_questions ? shoeList_q : shoeList_d;

    return (
        <View className="flex-1 bg-backgroundDark">
            <ShoeHeader
                setSelected={(sel) => setSelected(sel)}
                default_value={category ?? ""}
            />
            <Layout noPadding className="bg-backgroundDark" scrollable avoidTabbar>
                {exist_question_entryh && (
                    <View
                        className="relative my-6 justify-center px-4 items-center"
                        onLayout={(e) => {
                            setHero_w(e.nativeEvent.layout.width);
                        }}
                    >
                        <HERO
                            width={hero_w}
                            height={hero_w * 0.4}
                            style={{
                                transform: [{ scaleX: -1 }],
                            }}
                        />
                        <View className="absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center">
                            <Typography className="text-xl font-bold text-center">
                                Die weltweit fortgeschrittenste Schuhberatung
                            </Typography>
                        </View>
                        <View className="absolute p-4 bg-backgroundDark rounded-full bottom-0 translate-y-1/2 left-8">
                            <Button
                                style={{
                                    shadowColor: "#62A07B",
                                    elevation: 12,
                                    shadowOffset: { width: 0, height: -6 },
                                    shadowRadius: 14,
                                }}
                                className="bg-backgroundDark"
                                onPress={() => {
                                    setPage(1);
                                    clearCategory((selected ?? category) as CategorySlug);
                                    router.push(`/shoe-questions/${selected ?? category}` as any);
                                }}
                                variant="outline"
                            >
                                Jetzt testen!
                            </Button>
                        </View>
                    </View>
                )}
                {!isPending_active ? (
                    (shoeList && shoeList.length) > 0 ? (
                        <>
                            <View className="flex-row flex-wrap justify-between mt-6 px-4">
                                {shoeList.map((shoe, i) => (
                                    <ProductCard {...shoe} key={shoe.id} />
                                ))}
                            </View>
                            <View className="flex-row items-center justify-center flex-1 gap-3">
                                {hasPrev_active && (
                                    <Button onPress={() => setPage((prev) => prev - 1)}>
                                        PREV
                                    </Button>
                                )}
                                {hasNext_active && (
                                    <Button onPress={() => setPage((prev) => prev + 1)}>
                                        NEXT
                                    </Button>
                                )}
                            </View>
                        </>
                    ) : (
                        <View className="flex-1 items-center justify-center mt-6 px-4">
                            <Typography>No shoes found.</Typography>
                        </View>
                    )
                ) : (
                    <LoadingSpinner />
                )}
            </Layout>
        </View>
    );
}
