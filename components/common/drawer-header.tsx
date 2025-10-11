import JAM_MENU from "@/assets/svgs/jam_menu.svg";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Image ,View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../ui/button";
import { useState } from "react";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { SearchBar } from "./search-bar";

export const useDrawerHeader = ({
  threeshold,
  shouldGoBack = false,
}: {
  threeshold: number;
  shouldGoBack?: boolean;
}) => {
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
              <Ionicons name="chevron-back-outline" size={24} color="white" />
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

          <SearchBar top={top} height={height} />
        </View>
      </View>
    </View>
  );

  return { HeaderComponent, onScroll, height };
};
