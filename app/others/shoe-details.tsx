import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Pressable,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import logo from "@/assets/images/feetfast-full-logo.png";
import { useLanguageStore } from "@/store/language";
import Collapsible from "react-native-collapsible";
import { VersionInfo } from "@/components/common/version";
import { AutoImage } from "@/components/ui/auto-image";
import ShoeHeader from "@/components/common/category-header";
import TwoDPreview from "@/components/common/2d-preview-for-details";
import { ShoeSizePicker } from "@/components/common/shoe-size-dropdown";
import { useLocalSearchParams } from "expo-router";
import { useGetProduct, useSuggestedShoes } from "@/lib/queries/products";
import { ItemImagePlaceholder } from "@/lib/placeholder";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { useTopShoes } from "@/lib/queries/products";
import { ProductCard } from "@/components/common/ProductCard";
import { NormalCategories, SportsCategories } from "@/lib/categories";
import { ShoeItem } from "@/type/product";
import { AddToCartModal } from "@/components/common/add-to-cart-modal";
import { AddToCart } from "@/components/common/add-to-cart";

export default function Screen() {
    const { isGerman } = useLanguageStore();
    const { id } = useLocalSearchParams<{ id: string }>();

    const { isPending: fetch_top, shoeList } = useTopShoes(6);
    const { isPending: fetch_all, shoeList: shoeList_s } = useSuggestedShoes(
        6,
        Number(id),
    );

    const [finalShoeList, setFinalShoeList] = useState<ShoeItem[]>([]);
    const [sizePicked, setSizePicked] = useState<string | null>(null);

    useEffect(() => {
        const remainingSlots = 6 - shoeList_s.length;

        const combinedList = [...shoeList_s, ...shoeList.slice(0, remainingSlots)];

        setFinalShoeList(combinedList);
    }, [shoeList, shoeList_s]);

    const displayedCategories = [
        {
            title: "All",
            slug: "all",
        },
        ...NormalCategories.map((c) => ({
            title: isGerman() ? c.name_de : c.name_it,
            slug: c.slug,
        })),
        ...SportsCategories.map((c) => ({
            title: isGerman() ? c.name_de : c.name_it,
            slug: c.slug,
        })),
        {
            title: isGerman() ? "Berg Trekkingschuhe" : "Berg Trekkingschuhe",
            slug: "mountain-trekking-shoes",
        },
    ];

    const fingCategoryBySlug = (slug: string) => {
        console.log("Slug: ", slug);
        return displayedCategories.find((c) => c.slug === slug);
    };

    const { isPending, error, shoeDetails } = useGetProduct(Number(id.trim()));

    const [sizeList, setSizeList] = useState<any>([]);

    useEffect(() => {
        console.log("FEATURES: ", shoeDetails?.features);

        if (shoeDetails?.sizes) {
            const isImotana = shoeDetails?.brand?.name.toLowerCase() === "imotana";

            const sizes = shoeDetails?.sizes.flatMap((s) => {
                return s.size.map((size) => ({
                    label: size,
                    score: isImotana
                        ? 100
                        : shoeDetails.match_data
                            ? shoeDetails.match_data[size] || 0
                            : 0,
                    value: size,
                }));
            }) as [];
            setSizeList(sizes);

            console.log(shoeDetails.match_data);
            console.log(shoeDetails.sizes);

            type SizeGroup = {
                size: string[];
                quantity: number;
            };

            const allSizes = (sizes as SizeGroup[]).flatMap((item) => item.size);

            const numericEntries = Object.entries(shoeDetails.match_data ?? {}).map(
                ([size, val]) => [String(size), Number(val)] as [string, number],
            );

            const maxValue =
                numericEntries.length > 0
                    ? Math.max(...numericEntries.map(([, v]) => v))
                    : 0;

            // 5. best matching size
            const bestSize = numericEntries.find(([, v]) => v === maxValue)?.[0];

            // 6. set size
            if (bestSize) {
                setSizePicked(bestSize);
            } else if (allSizes.length > 0) {
                setSizePicked(allSizes[0]);
            }

            //
            // const entries = Object.entries(shoeDetails.match_data ?? {});
            //
            // const numericEntries = entries.map(([size, val]) => [size, Number(val)]);
            //
            // const maxValue = Math.max(...numericEntries.map(([, v]) => v));
            //
            // const bestSize = numericEntries.find(([, v]) => v === maxValue)?.[0];
            //
            // setSizePicked(bestSize ?? sizes[0]?.value);
        }
    }, [shoeDetails]);

    const [shoeAddCartModal, setShoeAddCartModal] = useState(false);

    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<number>(0);

    const selectedSizeObject = useMemo(() => {
        if (!shoeDetails || !sizePicked) return null;

        const sizeGroup = shoeDetails.sizes?.find((s) =>
            s.size.includes(sizePicked),
        );

        if (!sizeGroup) return null;

        return {
            id: sizeGroup.size_id ?? 0,
            size: sizePicked,
            quantity: sizeGroup.quantity,
        };
    }, [shoeDetails, sizePicked]);

    const availableQuantity = selectedSizeObject?.quantity ?? 0;

    const toggleAccordion = (section: string) => {
        setActiveAccordion(activeAccordion === section ? null : section);
    };

    return (
        <View className="flex-1">
            {shoeDetails && (
                <AddToCartModal
                    isOpen={shoeAddCartModal}
                    onClose={() => setShoeAddCartModal(false)}
                    productDetails={shoeDetails}
                />
            )}
            <ShoeHeader />
            <Layout
                scrollable
                noPadding
                avoidTabbar
                className="p-6 bg-backgroundDark"
            >
                {error || isPending ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        {/* Main Image */}
                        <View>
                            {(shoeDetails?.images.length ?? 0) > 0 && (
                                <Image
                                    className="w-full h-[250px]"
                                    resizeMode="contain"
                                    source={{
                                        uri:
                                            shoeDetails?.images[selectedImage] &&
                                                typeof shoeDetails?.images[selectedImage].image ===
                                                "string"
                                                ? shoeDetails?.images[selectedImage].image
                                                : ItemImagePlaceholder,
                                    }}
                                />
                            )}
                        </View>

                        <View className="flex gap-2">
                            <Typography className="text-2xl font-bold">
                                {shoeDetails?.name}
                            </Typography>
                            <Typography className="text-xl">
                                {fingCategoryBySlug(shoeDetails?.sub_category ?? "all")
                                    ?.title ?? ""}
                            </Typography>
                            <Typography className="text-xl font-bold text-primary">
                                € {shoeDetails?.price}
                            </Typography>
                        </View>

                        {(shoeDetails?.images.length ?? 0) > 1 && (
                            <FlatList
                                data={shoeDetails?.images}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ItemSeparatorComponent={() => <View className="w-3" />}
                                renderItem={(props) => (
                                    <Pressable
                                        onPress={() => setSelectedImage(props.index)}
                                        className="p-2 bg-muted-background rounded-2xl flex-1"
                                        style={{
                                            opacity: selectedImage === props.index ? 1 : 0.5,
                                        }}
                                        key={props.index}
                                    >
                                        <Image
                                            className="h-[80px] w-[140px] rounded-lg"
                                            resizeMode="contain"
                                            source={{
                                                uri:
                                                    props.item.image &&
                                                        typeof props.item.image === "string"
                                                        ? props.item.image
                                                        : ItemImagePlaceholder,
                                            }}
                                        />
                                    </Pressable>
                                )}
                            />
                        )}

                        {/* Brand + Size */}
                        <View className="bg-muted-background p-4 rounded-2xl flex-row justify-between">
                            <AutoImage height={36} source={logo} />

                            <View className="h-9 justify-center flex-1 ml-6">
                                <View className="w-full">
                                    <ShoeSizePicker
                                        onChange={(selected) => {
                                            if (selected) setSizePicked(selected as string);
                                        }}
                                        value={sizePicked ?? undefined}
                                        list={sizeList}
                                    />
                                </View>
                                <Typography
                                    style={{
                                        textAlign: "right",
                                    }}
                                >
                                    {shoeDetails?.brand?.name.toLowerCase() === "imotana"
                                        ? 100 + "% FIT"
                                        : ((shoeDetails?.match_data &&
                                            sizePicked &&
                                            (shoeDetails?.match_data?.[sizePicked] ?? "0") +
                                            "% FIT") ??
                                            "N/A FIT")}
                                    {}
                                </Typography>
                            </View>
                        </View>

                        {shoeDetails && selectedSizeObject && (
                            <AddToCart
                                productId={shoeDetails.id}
                                selectedSize={{
                                    id: selectedSizeObject.id,
                                    size: selectedSizeObject.size,
                                }}
                                availableQuantity={availableQuantity}
                                colors={shoeDetails.colors}
                            />
                        )}

                        <View className="mb-20 mt-4 -mx-3">
                            <TwoDPreview />
                        </View>

                        {shoeDetails && shoeDetails.features && (
                            <View className="flex-1 gap-4 my-4">
                                {shoeDetails?.features.map((feat, i) => (
                                    <View className="flex-row gap-4" key={i}>
                                        <View className="rounded-xl p-2">
                                            <Image
                                                resizeMode="contain"
                                                source={{
                                                    uri: feat.image,
                                                }}
                                                className="w-[40px] h-[40px]"
                                            />
                                        </View>
                                        <Typography className="flex-1">
                                            <Text className="font-bold text-lg">{feat.title}</Text> –{" "}
                                            {
                                                // isGerman() ? feat.de : feat.it
                                                feat.details
                                            }
                                        </Typography>
                                    </View>
                                ))}
                            </View>
                        )}

                        <View className="flex gap-3 my-4">
                            {[
                                {
                                    key: "description",
                                    label: isGerman()
                                        ? "Produktbeschreibung"
                                        : "Descrizione del prodotto",

                                    value: isGerman()
                                        ? shoeDetails?.description
                                        : shoeDetails?.description,
                                },
                                {
                                    key: "technical",
                                    label: isGerman() ? "Technische Daten" : "Dati tecnici",
                                    value: isGerman()
                                        ? shoeDetails?.technical_data
                                        : shoeDetails?.technical_data,
                                },
                                {
                                    key: "info",
                                    label: isGerman()
                                        ? "Weitere Informationen"
                                        : "Ulteriori informazioni",

                                    value: isGerman()
                                        ? shoeDetails?.further_information
                                        : shoeDetails?.further_information,
                                },
                                {
                                    key: "return",
                                    label: isGerman()
                                        ? "Retouren ohne Probleme"
                                        : "Restituisce senza problemi",
                                    value: isGerman()
                                        ? "FeetF1rst gewährleistet eine perfekte Passform und bietet daher ein 30-tägiges Rückgaberecht, bei dem wir die Rücksendekosten übernehmen."
                                        : "FeetF1rst garantisce una vestibilità perfetta e pertanto offre una politica di reso di 30 giorni, durante la quale copriamo le spese di spedizione per il reso.",
                                },
                                {
                                    key: "perfect_fit",
                                    label: isGerman()
                                        ? "Perfekte Passform"
                                        : "Vestibilità perfetta",
                                    value: isGerman()
                                        ? "Über 90 % weniger Retouren dank präzisem 3D-Scan – wenn etwas nicht passt, einfach kostenlos zurücksenden und den vollen Betrag zurückerhalten."
                                        : "Oltre il 90% in meno di resi grazie alla precisa scansione 3D: se qualcosa non ti va bene, puoi semplicemente restituirlo gratuitamente e ricevere un rimborso completo.",
                                },
                            ].map(
                                (section) =>
                                    section.value && (
                                        <TouchableOpacity
                                            key={section.key}
                                            onPress={() => toggleAccordion(section.key)}
                                        >
                                            <Typography className="text-white text-2xl border-b border-white pb-3">
                                                {section.label}
                                            </Typography>
                                            <Collapsible collapsed={activeAccordion !== section.key}>
                                                <Text className="text-gray-400 mb-3 mt-3">
                                                    {section.value}
                                                </Text>
                                            </Collapsible>
                                        </TouchableOpacity>
                                    ),
                            )}
                        </View>

                        {/* Return Policy */}
                        {
                            // <View className="my-4 flex gap-4">
                            // <Typography className="text-white text-2xl">
                            //     {isGerman()
                            //         ? "Retouren ohne Probleme"
                            //         : "Restituisce senza problemi"}
                            // </Typography>
                            // <Typography className="text-white leading-8">
                            //     {isGerman()
                            //         ? "FeetF1rst gewährleistet eine perfekte Passform und bietet daher ein 30-tägiges Rückgaberecht, bei dem wir die Rücksendekosten übernehmen."
                            //         : "FeetF1rst garantisce una vestibilità perfetta e pertanto offre una politica di reso di 30 giorni, durante la quale copriamo le spese di spedizione per il reso."}
                            // </Typography>
                            // </View>
                        }

                        {fetch_top || fetch_all ? (
                            <LoadingSpinner />
                        ) : (
                            finalShoeList.length > 0 && (
                                <View className="flex-row flex-wrap justify-between">
                                    {finalShoeList.map((shoe, i) => (
                                        <ProductCard {...shoe} key={i} />
                                    ))}
                                </View>
                            )
                        )}

                        <VersionInfo />
                    </>
                )}
            </Layout>
        </View>
    );
}
