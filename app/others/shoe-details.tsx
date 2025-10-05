import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Pressable,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import logo from "@/assets/images/feetfast-full-logo.png";
import { useLanguageStore } from "@/store/language";
import ultralight from "@/assets/images/ultralight.png";
import pronation from "@/assets/images/pronation.png";
import Collapsible from "react-native-collapsible";
import GoreTexLogo from "@/assets/images/gore-tex.png";
import { VersionInfo } from "@/components/common/version";
import { AutoImage } from "@/components/ui/auto-image";
import ShoeHeader from "@/components/common/category-header";
import TwoDPreview from "@/components/common/2d-preview-for-details";
import { ShoeSizePicker } from "@/components/common/shoe-size-dropdown";
import { useLocalSearchParams } from "expo-router";
import { useGetProduct } from "@/lib/queries/products";
import { ItemImagePlaceholder } from "@/lib/placeholder";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { useAddFavourite, useRemoveFavourite } from "@/lib/queries/favourite";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart"; // ✅ Zustand cart store
import { useTopShoes } from "@/lib/queries/products";
import { ProductCard } from "@/components/common/ProductCard";

export default function Screen() {
    const { isPending: fetch_top, shoeList } = useTopShoes(6);
    const { isGerman } = useLanguageStore();
    const { id } = useLocalSearchParams<{ id: string }>();

    const { isPending, error, shoeDetails } = useGetProduct(Number(id.trim()));

    const { cartIds, addItem, removeItem, isInCart } = useCartStore();

    const [liked, setLiked] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<number>(0);

    const inCart = shoeDetails?.id ? isInCart(shoeDetails.id) : false;

    useEffect(() => {
        setLiked(shoeDetails?.favourite ?? false);
    }, [shoeDetails]);

    const { mutate: add_to_favourite, isPending: pending_add } =
        useAddFavourite();

    const { mutate: remove_from_favourite, isPending: pending_remove } =
        useRemoveFavourite();

    const handle_remove_fav = () => {
        remove_from_favourite(shoeDetails?.id ?? 0, {
            onSuccess() {
                setLiked(false);
            },
            onError() {
                setLiked(true);
            },
        });
    };

    const handle_add_fav = () => {
        add_to_favourite(shoeDetails?.id ?? 0, {
            onSuccess() {
                setLiked(true);
            },
            onError() {
                setLiked(false);
            },
        });
    };

    const handleCartPress = () => {
        if (!shoeDetails?.id) return;

        if (inCart) {
            removeItem(shoeDetails.id);
        } else {
            addItem(shoeDetails.id);
        }
    };

    const toggleAccordion = (section: string) => {
        setActiveAccordion(activeAccordion === section ? null : section);
    };

    return (
        <View className="flex-1">
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

                        {/* Info */}
                        <View className="flex gap-2">
                            <Typography className="text-2xl font-bold">
                                {shoeDetails?.name}
                            </Typography>
                            <Typography className="text-xl">
                                {shoeDetails?.sub_category}
                            </Typography>
                            <Typography className="text-xl font-bold text-primary">
                                {shoeDetails?.price}
                            </Typography>
                        </View>

                        {/* Thumbnails */}
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
                            <View className="h-9 justify-center">
                                <ShoeSizePicker
                                    list={(shoeDetails?.sizes ?? []).map((size) => ({
                                        label: String(size ?? 0),
                                        value: String(size),
                                    }))}
                                    onChange={(sel) => console.log(sel)}
                                />
                                <Typography>90% FIT</Typography>
                            </View>
                        </View>

                        {/* Cart + Favourite */}
                        <View className="flex-row gap-6">
                            <Button
                                onPress={handleCartPress}
                                variant="outline"
                                noWrap
                                className={`border p-4 rounded-2xl flex-1 items-center ${inCart ? "border-red-500 bg-red-500/10" : "border-white"
                                    }`}
                            >
                                <Typography
                                    className={`text-2xl ${inCart ? "text-red-500" : "text-white"
                                        }`}
                                >
                                    {inCart
                                        ? isGerman()
                                            ? "AUS WARENKORB ENTFERNEN"
                                            : "RIMUOVI DAL CARRELLO"
                                        : isGerman()
                                            ? "IN DEN WARENKORB"
                                            : "AGGIUNGI AL CARRELLO"}
                                </Typography>
                            </Button>

                            <TouchableOpacity className="flex items-center justify-center">
                                <Pressable
                                    onPress={() => {
                                        if (liked) handle_remove_fav();
                                        else handle_add_fav();
                                    }}
                                    className="border border-white p-4 rounded-2xl"
                                >
                                    <AntDesign
                                        name={liked ? "heart" : "hearto"}
                                        size={24}
                                        color="white"
                                    />
                                </Pressable>
                            </TouchableOpacity>
                        </View>

                        {/* 2D Preview */}
                        <View className="mb-20 mt-4 -mx-3">
                            <TwoDPreview />
                        </View>

                        {/* Return Policy */}
                        <View className="my-4 flex gap-4">
                            <Typography className="text-white text-2xl">
                                {isGerman()
                                    ? "Retouren ohne Probleme"
                                    : "Restituisce senza problemi"}
                            </Typography>
                            <Typography className="text-white leading-8">
                                {isGerman()
                                    ? "FeetF1rst gewährleistet eine perfekte Passform und bietet daher ein 30-tägiges Rückgaberecht, bei dem wir die Rücksendekosten übernehmen."
                                    : "FeetF1rst garantisce una vestibilità perfetta e pertanto offre una politica di reso di 30 giorni, durante la quale copriamo le spese di spedizione per il reso."}
                            </Typography>
                        </View>

                        {/* Material Features */}
                        <View className="flex-1 gap-4 my-4">
                            {[
                                {
                                    icon: GoreTexLogo,
                                    title: "Gore-Tex®",
                                    de: "Wasserdicht und atmungsaktiv durch eine spezielle Membran",
                                    it: "Impermeabile e traspirante grazie a una speciale membrana",
                                },
                                {
                                    icon: ultralight,
                                    title: "Ultra Light",
                                    de: "Besonders leicht für maximalen Komfort",
                                    it: "Extra leggero per il massimo comfort",
                                },
                                {
                                    icon: pronation,
                                    title: "Pronation",
                                    de: "Stabilisiert den Fuß bei Überpronation",
                                    it: "Supporto per la pronazione: stabilizza il piede in caso di iperpronazione",
                                },
                            ].map((feat, i) => (
                                <View className="flex-row gap-4" key={i}>
                                    <View className="bg-white rounded-xl p-2">
                                        <Image
                                            resizeMode="contain"
                                            source={feat.icon}
                                            className="w-[40px] h-[40px]"
                                        />
                                    </View>
                                    <Typography className="flex-1">
                                        <Text className="font-bold text-lg">{feat.title}</Text> –{" "}
                                        {isGerman() ? feat.de : feat.it}
                                    </Typography>
                                </View>
                            ))}
                        </View>

                        {/* Accordions */}
                        <View className="flex gap-4 my-4">
                            {[
                                {
                                    key: "description",
                                    label: isGerman()
                                        ? "Produktbeschreibung"
                                        : "Descrizione del prodotto",

                                    value: isGerman()
                                        ? "Produktbeschreibung"
                                        : "Descrizione del prodotto",
                                },
                                {
                                    key: "technical",
                                    label: isGerman() ? "Technische Daten" : "Dati tecnici",
                                    value: isGerman() ? "Technische Daten" : "Dati tecnici",
                                },
                                {
                                    key: "info",
                                    label: isGerman()
                                        ? "Weitere Informationen"
                                        : "Ulteriori informazioni",

                                    value: isGerman()
                                        ? "Weitere Informationen"
                                        : "Ulteriori informazioni",
                                },
                            ].map((section) => (
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
                            ))}
                        </View>

                        {fetch_top ? (
                            <LoadingSpinner />
                        ) : (
                            shoeList.length > 0 && (
                                <View className="flex-row flex-wrap justify-between">
                                    {shoeList.map((shoe, i) => (
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
