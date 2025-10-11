import { useState } from "react";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Button } from "../ui/button";
import { Entypo, Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { twMerge } from "tailwind-merge";
import { Image, Platform, Pressable, TextInput, View } from "react-native";
import { BlurView } from "expo-blur";
import { Portal } from "react-native-portalize";
import { dummyShoes } from "@/lib/dummy_shoes";
import { ItemImagePlaceholder } from "@/lib/placeholder";
import { Typography } from "../ui/typography";

type Props = {
  top: number;
  height: number;
};

export function SearchBar({ top, height }: Props) {
  const [renderSearch, setRenderSearch] = useState(false);
  const [height_w, setHeight] = useState<number>(0);
  const searchProgress = useSharedValue(0);

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
        },
      );
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className="py-4 px-8 m-0 rounded-none"
        onPress={() => toggleSearch(true)}
      >
        <Ionicons name="search" size={24} color="white" />
      </Button>

      {renderSearch && (
        <Portal>
          <Animated.View
            onLayout={(event) => {
              setHeight(event.nativeEvent.layout.height);
            }}
            className={twMerge(
              "absolute left-0 right-0 flex-row items-center px-3 py-2",
              Platform.OS === "android"
                ? "bg-backgroundDark/80"
                : "bg-backgroundDark/20",
            )}
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
              className="pl-4 m-0 rounded-none"
              onPressIn={() => toggleSearch(false)}
            >
              <Entypo name="cross" size={28} color="white" />
            </Pressable>
          </Animated.View>
          <Animated.View
            className={`${
              Platform.OS === "android"
                ? "bg-backgroundDark/80"
                : "bg-backgroundDark/20"
            }
              `}
            style={[
              animatedSearchStyle,
              {
                marginTop: height_w,
                maxHeight: "50%",
              },
            ]}
          >
            <BlurView
              tint="dark"
              className="absolute inset-0"
              pointerEvents="none"
              intensity={80}
            />
            <Animated.FlatList
              style={[animatedSearchStyle, { paddingHorizontal: 12 }]}
              data={[...dummyShoes]}
              keyboardDismissMode={"on-drag"}
              ItemSeparatorComponent={() => <View style={{ padding: 4 }} />}
              renderItem={({ item }) => (
                <View className="bg-background min-h-20 rounded-lg flex-row gap-4 items-center p-2">
                  <View>
                    <Image
                      source={{
                        uri:
                          item.image && typeof item.image.image === "string"
                            ? item.image.image
                            : ItemImagePlaceholder,
                      }}
                      style={{
                        height: 80,
                        width: 80,
                      }}
                    />
                  </View>

                  <View className="flex-col flex-1 gap-1">
                    <Typography
                      className="text-primary text-xl"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ overflow: "hidden" }}
                    >
                      {item.itemName}
                    </Typography>
                    <Typography variant="caption" className="text-md">
                      {item.brandLogo?.name}
                    </Typography>
                    <Typography className="text-foreground font-semibold">
                      {item.price}
                    </Typography>
                  </View>
                  <View>
                    <AntDesign name="arrowright" size={24} color="#62A07B" />
                  </View>
                </View>
              )}
            />
          </Animated.View>
        </Portal>
      )}
    </>
  );
}
