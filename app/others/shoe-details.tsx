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

import { ProductCard } from "@/components/common/ProductCard";
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

export default function Screen() {
    const { isGerman } = useLanguageStore();
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
    const { id } = useLocalSearchParams<{ id: string }>();

    const { isPending, error, shoeDetails } = useGetProduct(Number(id.trim()));

    const toggleAccordion = (section: string) => {
        setActiveAccordion(activeAccordion === section ? null : section);
    };
    const [liked, setLiked] = useState(false);

    const [selectedImage, setSelectedImage] = useState<number>(0);

    useEffect(() => {
        setLiked(shoeDetails?.favourite ?? false);
        console.log("Is fav : ", shoeDetails?.favourite);
    }, [shoeDetails]);

    const {
        mutate: add_to_favourite,
        isPending: pending_add,
        error: error_add,
    } = useAddFavourite();

    const {
        mutate: remove_from_favourite,
        isPending: pending_remove,
        error: error_remove,
    } = useRemoveFavourite();

    function handle_remove_fav() {
        remove_from_favourite(shoeDetails?.id ?? 0, {
            onSuccess(res) {
                setLiked(false);
            },
            onError(err) {
                setLiked(true);
            },
        });
    }

    function handle_add_fav() {
        add_to_favourite(shoeDetails?.id ?? 0, {
            onSuccess(res) {
                setLiked(true);
            },
            onError(err) {
                setLiked(false);
            },
        });
    }

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
                                {shoeDetails?.sub_category}
                            </Typography>
                            <Typography className="text-xl font-bold text-primary">
                                {shoeDetails?.price}
                            </Typography>
                        </View>

                        {(shoeDetails?.images.length ?? 0) > 1 && (
                            <FlatList
                                data={shoeDetails?.images}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                ItemSeparatorComponent={() => <View className="w-3"></View>}
                                horizontal={true}
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
                        <View className="bg-muted-background p-4 rounded-2xl flex-row justify-between">
                            <AutoImage height={36} source={logo} />
                            <View className="h-9 justify-center">
                                {
                                    <ShoeSizePicker
                                        list={(shoeDetails?.sizes ?? []).map((size) => ({
                                            label: String(size),
                                            value: String(size),
                                        }))}
                                        onChange={(sel) => {
                                            console.log(sel);
                                        }}
                                    />
                                }
                                <Typography>90% FIT</Typography>
                            </View>
                        </View>

                        {/* cart */}
                        <View className="flex-row gap-6">
                            <TouchableOpacity className="border border-white p-4 rounded-2xl flex-1 items-center">
                                <Typography className="text-white text-2xl">
                                    {isGerman()
                                        ? "In den warenkorb".toUpperCase()
                                        : "Aggiungi al carrello".toUpperCase()}
                                </Typography>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex items-center justify-center">
                                <Pressable
                                    onPress={() => {
                                        if (liked) {
                                            setLiked(false);
                                            handle_remove_fav();
                                        } else {
                                            setLiked(true);
                                            handle_add_fav();
                                        }
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

                        <View className="mb-20 mt-4 -mx-3">
                            <TwoDPreview />
                        </View>

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

                        {/* material features */}
                        <View className="flex-1 gap-4 my-4">
                            <View className="flex-row gap-4">
                                <View className="bg-white rounded-xl p-2">
                                    <Image
                                        resizeMode="contain"
                                        source={GoreTexLogo}
                                        className="w-[40px] h-[40px]"
                                    />
                                </View>
                                <Typography className="flex-1">
                                    <Text className="font-bold text-lg">Gore-Tex®</Text> –
                                    {isGerman()
                                        ? "Wasserdicht und atmungsaktiv durch eine spezielle Membran"
                                        : "Impermeabile e traspirante grazie a una speciale membrana"}
                                </Typography>
                            </View>
                            <View className="flex-row gap-4">
                                <View className="bg-white rounded-xl p-2">
                                    <Image source={ultralight} className="w-[40px] h-[40px]" />
                                </View>
                                <Typography className="flex-1">
                                    <Text className="font-bold text-lg">Ultra Light</Text> –
                                    {isGerman()
                                        ? "Besonders leicht für maximalen Komfort"
                                        : "Extra leggero per il massimo comfort"}
                                </Typography>
                            </View>
                            <View className="flex-row gap-4">
                                <View className="bg-white rounded-xl p-2">
                                    <Image source={pronation} className="w-[40px] h-[40px]" />
                                </View>
                                <Typography className="flex-1">
                                    <Text className="font-bold text-lg">Pronation</Text> –
                                    {isGerman()
                                        ? "Stabilisiert den Fuß bei Überpronation"
                                        : "Supporto per la pronazione: stabilizza il piede in caso di iperpronazione"}
                                </Typography>
                            </View>
                        </View>

                        {/* product information */}
                        <View className="flex gap-4 my-4">
                            <TouchableOpacity onPress={() => toggleAccordion("description")}>
                                <Typography className="text-white text-2xl border-b border-white pb-3">
                                    {isGerman()
                                        ? "Produktbeschreibung"
                                        : "Descrizione del prodotto"}
                                </Typography>
                                <Collapsible collapsed={activeAccordion !== "description"}>
                                    <Text className="text-gray-400 mb-3 mt-3">
                                        Hier könnten Inhalte für stehen…
                                    </Text>
                                </Collapsible>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => toggleAccordion("technical")}>
                                <Typography className="text-white text-2xl border-b border-white pb-3">
                                    {isGerman() ? "Technische Daten" : "Dati tecnici"}
                                </Typography>
                                <Collapsible collapsed={activeAccordion !== "technical"}>
                                    <Text className="text-gray-400 mb-3 mt-3">
                                        Hier könnten Inhalte für stehen…
                                    </Text>
                                </Collapsible>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => toggleAccordion("info")}>
                                <Typography className="text-white text-2xl border-b border-white pb-3">
                                    {isGerman()
                                        ? "Weitere Informationen"
                                        : "Ulteriori informazioni"}
                                </Typography>
                                <Collapsible collapsed={activeAccordion !== "info"}>
                                    <Text className="text-gray-400 mb-3 mt-3">
                                        Hier könnten Inhalte für stehen…
                                    </Text>
                                </Collapsible>
                            </TouchableOpacity>
                        </View>

                        <View className="my-4">
                            <Typography className="text-white text-xl">
                                {isGerman()
                                    ? "Diese Modelle empfehlen wir dir auch:"
                                    : "Consigliamo anche questi modelli:"}
                            </Typography>
                            <View className="flex-row flex-wrap justify-between mt-6 px-4">
                                {/*products.map((product, i) => (
                                        <ProductCard
                                            key={i}
                                            image={product.image}
                                            itemName={product.}
                                            price={product.price}
                                            liked={likedItems[i]}
                                            onToggleLike={() => toggleLike(i)}
                                        />
                                    ))*/}
                            </View>
                        </View>

                        {
                            // <View className="my-4">
                            //     <Typography className="text-white text-2xl mb-2">
                            //         Your Foot Measures
                            //     </Typography>
                            //
                            //     <View className="bg-muted-background py-4 px-6 rounded-2xl">
                            //         <Typography className="text-white text-lg border-b border-muted-foreground pb-2">
                            //             Measure
                            //         </Typography>
                            //
                            //         <View className="flex-row justify-between my-2">
                            //             <Typography>Footlength</Typography>
                            //             <Typography>25.7cm</Typography>
                            //             <Typography>24.2cm</Typography>
                            //         </View>
                            //
                            //         <View className="flex-row justify-between my-2">
                            //             <Typography>Width</Typography>
                            //             <Typography>25.7cm</Typography>
                            //             <Typography>24.2cm</Typography>
                            //         </View>
                            //
                            //         <View className="flex-row justify-between my-2">
                            //             <Typography>Hight</Typography>
                            //             <Typography>25.7cm</Typography>
                            //             <Typography>24.2cm</Typography>
                            //         </View>
                            //     </View>
                            // </View>
                        }

                        <VersionInfo />
                    </>
                )}
            </Layout>
        </View>
    );
}
