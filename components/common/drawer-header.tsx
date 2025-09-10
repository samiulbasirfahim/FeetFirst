import Entypo from "@expo/vector-icons/Entypo";
import JAM_MENU from "@/assets/svgs/jam_menu.svg";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing,
    runOnJS,
} from "react-native-reanimated";
import { Image, Platform, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../ui/button";
import { useState } from "react";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { TextInput } from "react-native";
import { twMerge } from "tailwind-merge";

export const useDrawerHeader = ({
    threeshold,
    shouldGoBack = false,
}: {
    threeshold: number;
    shouldGoBack?: boolean;
}) => {
    const { top } = useSafeAreaInsets();
    const [height, setHeight] = useState(0);
    const [renderSearch, setRenderSearch] = useState(false);
    const navigation = useNavigation();

    const scrollY = useSharedValue(0);
    const searchProgress = useSharedValue(0); // 0 = hidden, 1 = visible

    const onScroll = (event: any) => {
        scrollY.value = event.nativeEvent.contentOffset.y;
    };

    const animatedBGStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [threeshold / 2, threeshold],
                [0, 1],
                "clamp",
            ),
        };
    });

    // Slide from top to bottom instead of right to left
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

    const toggleSearch = (state: boolean) => {
        if (state) {
            setRenderSearch(true); // mount first
            searchProgress.value = withTiming(1, {
                duration: 350,
                easing: Easing.out(Easing.cubic),
            });
        } else {
            searchProgress.value = withTiming(
                0,
                {
                    duration: 300,
                    easing: Easing.in(Easing.cubic),
                },
                (finished) => {
                    if (finished) {
                        runOnJS(setRenderSearch)(false); // unmount after animation
                    }
                }
            );
        }
    };

    const HeaderComponent = (
        <View
            style={{ elevation: 10 }}
            className="z-[999999] w-full"
            onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
        >
            {/* Background Blur */}
            <Animated.View
                className="absolute inset-0 bg-backgroundDark/70"
                style={animatedBGStyle}
                pointerEvents="none"
            >
                <BlurView
                    tint="dark"
                    className="absolute inset-0"
                    pointerEvents="none"
                    intensity={80}
                />
            </Animated.View>

            {/* Header Row */}
            <View
                style={{
                    paddingTop: top,
                    paddingBottom: 0,
                    elevation: 10,
                }}
            >
                <View className="flex-row items-center justify-between">
                    <Button
                        variant="ghost"
                        className="py-6 px-8 m-0 rounded-none"
                        onPress={() => {
                            if (shouldGoBack) return router.back();
                            navigation.dispatch(DrawerActions.openDrawer());
                        }}
                    >
                        {shouldGoBack ? (
                            <Ionicons
                                name="chevron-back-outline"
                                size={24}
                                color="white"
                            />
                        ) : (
                            <JAM_MENU />
                        )}
                    </Button>

                    <View>
                        <Image
                            source={require("@/assets/images/logo-icon.png")}
                            style={{ height: 50, width: 50 }}
                        />
                    </View>

                    <Button
                        variant="ghost"
                        className="py-4 px-8 m-0 rounded-none"
                        onPress={() => toggleSearch(true)}
                    >
                        <Ionicons name="search" size={24} color="white" />
                    </Button>
                </View>
            </View>

            {/* Floating Search Overlay */}
            {renderSearch && (
                <Animated.View
                    className={twMerge("absolute left-0 right-0 flex-row items-center px-3 py-2", Platform.OS === "android" ? "bg-backgroundDark" : "bg-backgroundDark/20")}
                    style={[
                        {
                            paddingTop: top,
                            height: height,
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
                        placeholder="Search..."
                        placeholderTextColor={"#aaa"}
                        autoFocus
                    />
                    <Pressable
                        className="px-4 m-0 rounded-none"
                        onPressIn={() => toggleSearch(false)}
                    >
                        <Entypo name="cross" size={28} color="white" />
                    </Pressable>
                </Animated.View>
            )}
        </View>
    );

    return { HeaderComponent, onScroll, height };
};
