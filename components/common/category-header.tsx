import { Image, Pressable, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Button } from "../ui/button";
import { router } from "expo-router";
import { TextInput } from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing,
    runOnJS,
} from "react-native-reanimated";

export default function ShoeHeader() {
    const { top } = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const [renderSearch, setRenderSearch] = useState(false);

    // shared value for animation
    const searchProgress = useSharedValue(0);

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
                        runOnJS(setRenderSearch)(false); // unmount after anim
                    }
                }
            );
        }
    };

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

    return (
        <View className="bg-backgroundDark">
            {/* Header Row */}
            <View
                className="flex-row items-center justify-between"
                style={{
                    paddingTop: top,
                    elevation: 10,
                }}
            >
                <Button
                    variant="ghost"
                    className="py-6 px-8 m-0 rounded-none"
                    onPress={() => router.back()}
                >
                    <Ionicons
                        name="chevron-back-outline"
                        size={24}
                        color="white"
                    />
                </Button>

                <View>
                    <Image
                        source={require("@/assets/images/logo-icon.png")}
                        height={80}
                        width={80}
                        style={{
                            height: 50,
                            width: 50,
                        }}
                    />
                </View>

                <Button
                    variant="ghost"
                    className="py-6 px-8 m-0 rounded-none"
                    onPress={() => toggleSearch(true)}
                >
                    <Ionicons name="search" size={24} color="white" />
                </Button>
            </View>

            {renderSearch && (
                <Animated.View
                    className="absolute left-0 right-0 bottom-0 flex-row items-center gap-3 px-4 py-2 bg-backgroundDark"
                    style={[{ paddingTop: top }, animatedSearchStyle]}
                >
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
}
