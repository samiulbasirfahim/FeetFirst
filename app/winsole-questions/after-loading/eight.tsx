// import { OnBoardingLayout } from "@/components/layout/onboarding";
// import { Button } from "@/components/ui/button";
// import { Typography } from "@/components/ui/typography";
// import { useLanguageStore } from "@/store/language";
// import { useParamStore } from "@/store/paramStore"; // ✅ import global param store
// import { Link, router } from "expo-router";
// import { useState } from "react";
// import { View, TextInput } from "react-native";
//
// export default function Screen() {
//     const { isGerman } = useLanguageStore();
//     const { getParam } = useParamStore();
//
//     const [isFocused, setIsFocused] = useState(false);
//
//     const handleFinish = () => {
//         const cameFromScanUpload = getParam("came_from_scan_upload") === "true";
//
//         if (cameFromScanUpload) {
//             router.push("/(scan-upload)/after-scan-upload/fourth");
//         } else {
//             router.dismissAll();
//             router.back();
//         }
//     };
//
//     return (
//         <OnBoardingLayout
//             multiple={false}
//             onSelectionChange={(selected) => {
//                 console.log(selected);
//             }}
//             options={
//                 []
//                 // isGerman()
//                 //     ? ["Modell suchen", "Käufe durchsuchen"]
//                 //     : ["Cerca modello", "Sfoglia gli acquisti"]
//             }
//             HeaderComponent={
//                 <>
//                     <Typography
//                         variant="onboarding-header"
//                         className="text-white font-pathSemiBold text-[20px] mb-3"
//                     >
//                         {isGerman()
//                             ? "Glückwunsch, Sie Haben Ihre Einlage Erfolgreich Konfiguriert!"
//                             : "Congratulazioni, hai configurato correttamente il tuo deposito!"}
//                     </Typography>
//
//                     <Typography
//                         variant="subtitle"
//                         className="text-white font-pathRegular text-[14px]"
//                     >
//                         {isGerman()
//                             ? "Stellen Sie Jetzt Sicher, Dass Sie Perfekt In Ihre Schuhe Passt, Indem Sie Ihr Modell Angeben Oder Mit Dem FeetF1rst-System Nach Ihrem Schuh Suchen."
//                             : "Assicurati subito che si adatti perfettamente alle tue scarpe specificando il tuo modello o cercando la tua scarpa tramite il sistema FeetF1rst."}
//                     </Typography>
//
//                     <View className="mt-8 flex-row items-center gap-2">
//                         <Typography className="text-foreground" variant="subtitle">
//                             {isGerman() ? "Modell angeben" : "Specificare il modello"}
//                         </Typography>
//                         <View className="flex-1 border-foreground border-solid border-b-2">
//                             <TextInput
//                                 onFocus={() => setIsFocused(true)}
//                                 onBlur={() => setIsFocused(false)}
//                                 className="flex-1 py-2 border-dotted border-foreground text-foreground"
//                             />
//                         </View>
//                     </View>
//                 </>
//             }
//             FooterComponent={
//                 <Button
//                     variant="big"
//                     onPress={handleFinish}
//                     textClassName="text-white font-pathSemiBold text-[16px] py-1"
//                 >
//                     {isGerman()
//                         ? "Abschliessen und Einlage in den Warenkorb legen"
//                         : "Completa e aggiungi il deposito al carrello"}
//                 </Button>
//             }
//         />
//     );
// }
//
//

import { OnBoardingLayout } from "@/components/layout/onboarding";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { useParamStore } from "@/store/paramStore";
import { router } from "expo-router";
import { useState } from "react";
import {
    View,
    TextInput,
    Image,
    Pressable,
    Platform,
    Keyboard,
} from "react-native";
import { useSearchProducts } from "@/lib/queries/products";
import { BlurView } from "expo-blur";
import { Portal } from "react-native-portalize";
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    runOnJS,
} from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { twMerge } from "tailwind-merge";
import { ItemImagePlaceholder } from "@/lib/placeholder";
import CheckBox from "@/components/ui/checkbox";

export default function Screen() {
    const { isGerman } = useLanguageStore();
    const { getParam } = useParamStore();

    const [otherShoeModel, setOtherShoeModel] = useState("");

    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedShoe, setSelectedShoe] = useState<any>(null);
    const { shoeList } = useSearchProducts(searchText);
    const searchProgress = useSharedValue(0);
    const [searchBarHeight, setSearchBarHeight] = useState(0);

    const animatedSearchStyle = useAnimatedStyle(() => {
        return {
            opacity: searchProgress.value,
            transform: [
                {
                    translateY: interpolate(searchProgress.value, [0, 1], [-60, 0]),
                },
            ],
        };
    });

    const openSearch = () => {
        setShowSearch(true);
        searchProgress.value = withTiming(1, {
            duration: 350,
            easing: Easing.out(Easing.cubic),
        });
    };

    const closeSearch = () => {
        searchProgress.value = withTiming(
            0,
            {
                duration: 300,
                easing: Easing.in(Easing.cubic),
            },
            (finished) => {
                if (finished) {
                    runOnJS(setShowSearch)(false);
                    runOnJS(setSearchText)("");
                }
            },
        );
    };

    const handleSelectShoe = (shoe: any) => {
        setSelectedShoe(shoe);
        closeSearch();
    };

    const handleFinish = () => {
        const cameFromScanUpload = getParam("came_from_scan_upload") === "true";
        if (cameFromScanUpload) {
            router.push("/(scan-upload)/after-scan-upload/fourth");
        } else {
            router.dismissAll();
            router.back();
        }
    };

    return (
        <>
            <OnBoardingLayout
                multiple={false}
                onSelectionChange={(selected) => {
                    console.log(selected);
                }}
                options={[]}
                HeaderComponent={
                    <>
                        <Typography
                            variant="onboarding-header"
                            className="text-white font-pathSemiBold text-[20px] mb-3"
                        >
                            {isGerman()
                                ? "Glückwunsch, Sie Haben Ihre Einlage Erfolgreich Konfiguriert!"
                                : "Congratulazioni, hai configurato correttamente il tuo deposito!"}
                        </Typography>
                        <Typography
                            variant="subtitle"
                            className="text-white font-pathRegular text-[14px]"
                        >
                            {isGerman()
                                ? "Stellen Sie Jetzt Sicher, Dass Sie Perfekt In Ihre Schuhe Passt, Indem Sie Ihr Modell Angeben Oder Mit Dem FeetF1rst-System Nach Ihrem Schuh Suchen."
                                : "Assicurati subito che si adatti perfettamente alle tue scarpe specificando il tuo modello o cercando la tua scarpa tramite il sistema FeetF1rst."}
                        </Typography>

                        {/* Search Input Field - Toggle Only */}
                        {
                            // <Pressable onPress={openSearch} className="mt-8">
                            //     <View className="flex-row items-center gap-2">
                            //         <Typography className="text-foreground" variant="subtitle">
                            //             {isGerman() ? "Modell angeben" : "Specificare il modello"}
                            //         </Typography>
                            //         <View className="flex-1 border-foreground border-solid border-b-2 py-2">
                            //             <Typography className="text-muted-foreground">
                            //                 {isGerman() ? "Suchen..." : "Cerca..."}
                            //             </Typography>
                            //         </View>
                            //     </View>
                            // </Pressable>
                        }

                        {otherShoeModel.length <= 0 && (
                            <Pressable
                                onPress={openSearch}
                                style={{
                                    backgroundColor: "#2C2C2D",
                                    paddingVertical: 14,
                                    paddingHorizontal: 16,
                                    borderRadius: 8,
                                    marginTop: 20,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: 4,
                                    }}
                                >
                                    <Typography
                                        className="flex-1 text-lg text-foreground font-pathMedium text-[16px]"
                                        variant="selected"
                                    >
                                        {isGerman() ? "Produkt suchen" : "Schuhname eingeben"}
                                    </Typography>
                                </View>
                            </Pressable>
                        )}

                        <TextInput
                            placeholder={
                                isGerman()
                                    ? "Schuhname eingeben…"
                                    : "Inserisci il nome della scarpa…"
                            }
                            placeholderTextColor="#999"
                            className="placeholder:font-semibold"
                            style={{
                                backgroundColor: "#2C2C2D",
                                paddingVertical: 16,
                                paddingHorizontal: 16,
                                borderRadius: 8,
                                fontSize: 16,
                                color: "#FFFFFF",
                                marginTop: 12,
                            }}
                            value={otherShoeModel}
                            onChangeText={setOtherShoeModel}
                            onSubmitEditing={Keyboard.dismiss}
                        />

                        {/* Selected Shoe Display */}
                        {selectedShoe && otherShoeModel.length <= 0 && (
                            <View className="mt-4 bg-boldText/20 rounded-lg p-3 flex-row items-center gap-3">
                                <Image
                                    source={{
                                        uri:
                                            selectedShoe.image &&
                                                typeof selectedShoe.image.image === "string"
                                                ? selectedShoe.image.image
                                                : ItemImagePlaceholder,
                                    }}
                                    style={{
                                        height: 40,
                                        width: 40,
                                    }}
                                    resizeMode="contain"
                                />
                                <View className="flex-1">
                                    <Typography
                                        className="text-primary text-base font-semibold"
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {selectedShoe.itemName}
                                    </Typography>
                                </View>
                                <Pressable
                                    onPress={() => setSelectedShoe(null)}
                                    className="p-2"
                                >
                                    <Entypo name="cross" size={20} color="#aaa" />
                                </Pressable>
                            </View>
                        )}
                    </>
                }
                FooterComponent={
                    <Button
                        variant="big"
                        onPress={handleFinish}
                        textClassName="text-white font-pathSemiBold text-[16px] py-1"
                    >
                        {isGerman()
                            ? "Abschliessen und Einlage in den Warenkorb legen"
                            : "Completa e aggiungi il deposito al carrello"}
                    </Button>
                }
            />

            {/* Search Modal - Styled like SearchBar */}
            {showSearch && (
                <Portal>
                    <Pressable
                        onPress={closeSearch}
                        className={twMerge([
                            "absolute inset-0",
                            Platform.OS === "android"
                                ? "bg-backgroundDark/90"
                                : "bg-backgroundDark/20",
                        ])}
                    >
                        <BlurView
                            tint="dark"
                            className="absolute inset-0"
                            pointerEvents="none"
                            intensity={80}
                        />
                    </Pressable>

                    {/* Search Bar at Top */}
                    <Animated.View
                        onLayout={(event) => {
                            setSearchBarHeight(event.nativeEvent.layout.height);
                        }}
                        className={twMerge(
                            "absolute left-0 right-0 flex-row items-center px-3 py-2",
                            Platform.OS === "android"
                                ? "bg-backgroundDark/90"
                                : "bg-backgroundDark/20",
                        )}
                        style={[
                            {
                                paddingTop: 60,
                                height: "auto",
                            },
                            animatedSearchStyle,
                        ]}
                    >
                        <BlurView
                            tint="dark"
                            className="absolute inset-0"
                            pointerEvents="none"
                            intensity={80}
                        />
                        <TextInput
                            className="flex-1 py-3 bg-transparent border-2 rounded-lg border-muted-background/50 placeholder:text-muted-foreground text-foreground ps-2"
                            placeholder={isGerman() ? "Suchen..." : "Cerca..."}
                            placeholderTextColor={"#aaa"}
                            value={searchText}
                            onChangeText={setSearchText}
                            autoFocus
                        />
                        <Pressable className="pl-4 m-0 rounded-none" onPress={closeSearch}>
                            <Entypo name="cross" size={28} color="white" />
                        </Pressable>
                    </Animated.View>

                    {/* Search Results List */}
                    <Animated.View
                        style={[
                            animatedSearchStyle,
                            {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                maxHeight: "70%",
                                zIndex: 40,
                                marginTop: searchBarHeight + 60,
                            },
                        ]}
                    >
                        <Animated.FlatList
                            style={[animatedSearchStyle, { paddingHorizontal: 12 }]}
                            data={shoeList}
                            keyboardDismissMode="on-drag"
                            ItemSeparatorComponent={() => <View style={{ padding: 4 }} />}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => handleSelectShoe(item)}
                                    className="bg-background min-h-10 rounded-lg flex-row gap-3 items-center p-2 mb-2"
                                >
                                    <View>
                                        <Image
                                            source={{
                                                uri:
                                                    item.image && typeof item.image.image === "string"
                                                        ? item.image.image
                                                        : ItemImagePlaceholder,
                                            }}
                                            style={{
                                                height: 40,
                                                width: 40,
                                            }}
                                            resizeMode="contain"
                                        />
                                    </View>

                                    <View className="flex-col flex-1 gap-1">
                                        <Typography
                                            className="text-primary text-base font-semibold"
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {item.itemName}
                                        </Typography>
                                        <Typography className="text-foreground text-sm">
                                            {item.price}
                                        </Typography>
                                    </View>
                                    <View>
                                        <AntDesign name="arrowright" size={20} color="#62A07B" />
                                    </View>
                                </Pressable>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </Animated.View>
                </Portal>
            )}
        </>
    );
}
