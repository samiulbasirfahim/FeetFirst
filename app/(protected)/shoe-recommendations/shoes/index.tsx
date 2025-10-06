import { ShoeHeader } from "@/components/common/shoes-header";
import { Layout } from "@/components/layout/layout";
import HERO from "@/assets/svgs/shoes_header.svg";
import { useState } from "react";
import { View } from "react-native";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLocalSearchParams } from "expo-router";
import { useProducts } from "@/lib/queries/products";
import { LoadingSpinner } from "@/components/common/loading-spinner";

export default function Screen() {
    const { category } = useLocalSearchParams<{ category: string }>();

    const [hero_w, setHero_w] = useState(0);
    const [page, setPage] = useState<number>(1);
    const [selected, setSelected] = useState<string | null>(null);
    const { shoeList, isPending, error, hasNext, hasPrev } = useProducts(
        page,
        selected,
    );

    return (
        <View className="flex-1 bg-backgroundDark">
            <ShoeHeader
                setSelected={(sel) => setSelected(sel)}
                default_value={category ?? ""}
            />
            <Layout noPadding className="bg-backgroundDark" scrollable avoidTabbar>
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
                            variant="outline"
                        >
                            Jetzt testen!
                        </Button>
                    </View>
                </View>
                {!(isPending || error) ? (
                    (shoeList && shoeList.length) > 0 ? (
                        <>
                            <View className="flex-row flex-wrap justify-between mt-6 px-4">
                                {shoeList.map((shoe, i) => (
                                    <ProductCard {...shoe} key={shoe.id} />
                                ))}
                            </View>
                            <View className="flex-row items-center justify-center flex-1 gap-3">
                                {hasPrev && (
                                    <Button onPress={() => setPage((prev) => prev - 1)}>
                                        PREV
                                    </Button>
                                )}
                                {hasNext && (
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
