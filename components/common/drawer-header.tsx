import Entypo from "@expo/vector-icons/Entypo";
import JAM_MENU from "@/assets/svgs/jam_menu.svg";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { Image, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../ui/button";
import { useState } from "react";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { Input } from "../ui/input";
import { TextInput } from "react-native";

export const useDrawerHeader = ({ threeshold }: { threeshold: number }) => {
    const { top } = useSafeAreaInsets();
    const [height, setHeight] = useState(0);
    const [showSearch, setShowSearch] = useState(false);
    const navigation = useNavigation();

    const scrollY = useSharedValue(0);

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

    const HeaderComponent = (
        <View
            style={{
                elevation: 10,
            }}
            className="z-[999999] w-full"
            onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
        >
            <Animated.View
                className="absolute inset-0 bg-backgroundDark/70"
                style={animatedBGStyle}
                pointerEvents={"none"}
            >
                <BlurView
                    tint="dark"
                    className="absolute inset-0"
                    pointerEvents="none"
                    intensity={80}
                // experimentalBlurMethod="dimezisBlurView"
                />
            </Animated.View>
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
                        className="py-4 px-8 m-0 bg-primary rounded-none"
                        onPress={() => {
                            navigation.dispatch(DrawerActions.openDrawer());
                        }}
                    >
                        <JAM_MENU />
                    </Button>

                    <View>
                        <Image
                            source={require("@/assets/images/logo-icon.png")}
                            style={{
                                height: 50,
                                width: 50,
                            }}
                        />
                    </View>

                    <Button
                        variant="ghost"
                        className="py-4 px-8 m-0 bg-primary rounded-none"
                        onPress={() => {
                            setShowSearch(true);
                        }}
                    >
                        <Ionicons name="search" size={24} color="white" />
                    </Button>
                </View>
                {showSearch && (
                    <View className="px-3 mt-3 flex-row items-center gap-3">
                        <TextInput className="flex-1 bg-transparent border-2 rounded-lg border-muted-background placeholder:text-muted-foreground text-foreground ps-2" />
                        <Pressable onPressIn={() => setShowSearch(false)}>
                            <Entypo name="cross" size={28} color="white" />
                        </Pressable>
                    </View>
                )}
            </View>
        </View>
    );

    return { HeaderComponent, onScroll, height };
};
