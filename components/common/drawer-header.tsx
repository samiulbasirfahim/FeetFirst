import JAM_MENU from "@/assets/svgs/jam_menu.svg";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../ui/button";
import { useState } from "react";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { BlurView } from "expo-blur";

export const useDrawerHeader = ({ threeshold }: { threeshold: number }) => {
    const { top } = useSafeAreaInsets();
    const [height, setHeight] = useState(0);
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
            className="z-[999999] w-full"
            onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
        >
            <Animated.View className="absolute inset-0 bg-backgroundDark/30" style={animatedBGStyle}>
                <BlurView
                    tint="dark"
                    className="absolute inset-0"
                    intensity={80}
                // experimentalBlurMethod="dimezisBlurView"
                />
            </Animated.View>
            <View
                className="flex-row items-center justify-between"
                style={{
                    paddingTop: top + 12,
                    paddingBottom: 12,
                    paddingHorizontal: 24,
                }}
            >
                <Button
                    variant="ghost"
                    className="p-0 m-0"
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

                <Ionicons name="search" size={24} color="white" />
            </View>
        </View>
    );

    return { HeaderComponent, onScroll, height };
};
