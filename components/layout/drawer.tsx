import AntDesign from "@expo/vector-icons/AntDesign";
import HOME from "@/assets/svgs/home.svg";
import SCAN from "@/assets/svgs/scan.svg";
import RUNNINGSHOE from "@/assets/svgs/running-shoe.svg";
import SUPPORT from "@/assets/svgs/support.svg";
import DOCUMENTUPLOAD from "@/assets/svgs/document-upload.svg";
import {
  DrawerContentComponentProps,
  useDrawerProgress,
} from "@react-navigation/drawer";
import { Image, View, ScrollView, Pressable, Dimensions } from "react-native";
import { Typography } from "../ui/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../ui/button";
import { DrawerButton } from "../ui/drawer-button";
import { useLanguageStore } from "@/store/language";
import { router } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { Portal } from "react-native-portalize";

import Animated, {
  useAnimatedStyle,
  interpolate,
  useDerivedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export function CustomDrawer(props: DrawerContentComponentProps) {
  const { top: top_safe_padding } = useSafeAreaInsets();
  const { isGerman } = useLanguageStore();

  const progress = useDrawerProgress();

  const pointerEvents = useDerivedValue(() => {
    return progress.value === 0 ? "none" : "auto";
  });


  const drawerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(progress.value, [0, 1], [-width, 0]) },
    ],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 0.4]),
  }));

  const closeDrawer = () => props.navigation.closeDrawer();

  return (
    <Portal>
      <Animated.View
        pointerEvents={pointerEvents as any}
        style={[
          {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "black",
          },
          backdropStyle,
        ]}
      >
        <Pressable style={{ flex: 1 }} onPress={closeDrawer} />
      </Animated.View>

      <Animated.View
        style={[
          {
            width: width * 0.85,
            height: "100%",
            backgroundColor: "#1A1C1B",
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
          },
          drawerStyle,
        ]}
      >
        {/* Drawer header */}
        <View
          className="bg-primary items-center justify-center gap-4"
          style={{ paddingTop: top_safe_padding + 20, paddingBottom: 20 }}
        >
          <Image
            source={{ uri: "https://avatar.iran.liara.run/public/34" }}
            className="w-1/3 aspect-square rounded-full"
          />
          <Typography variant="title" numberOfLines={1} className="text-white">
            John Due
          </Typography>

          <Button
            className="items-center justify-center flex-row gap-2 bg-white"
            variant="primary"
            noWrap
          >
            <DOCUMENTUPLOAD />
            <Typography className="text-lg text-background">
              Upload PDF
            </Typography>
          </Button>
        </View>

        {/* Menu */}
        <ScrollView className="p-4" contentContainerClassName="gap-4">
          <DrawerButton
            href="/(protected)/home/"
            title="Home"
            icon={HOME}
            selected={props.state.index === 0}
          />
          <DrawerButton
            href="/(protected)/home/feetfirst-points"
            title={isGerman() ? "Punkte FeetFirst" : "Punti FeetFirst"}
            icon={SCAN}
            selected={props.state.index === 1}
          />
          <Button
            noWrap
            className="flex-row items-center gap-4 p-4"
            variant={"ghost"}
            onPress={() => {
              closeDrawer();
              router.navigate("/(protected)/shoe-recommendations");
            }}
          >
            <RUNNINGSHOE />
            <Typography className="text-xl text-white">
              {isGerman() ? "Schuhemfpehlungen" : "Raccomandazioni di scarpe"}
            </Typography>
          </Button>
          <DrawerButton
            href="/(protected)/home/feetfirst-points"
            title={isGerman() ? "Masseinlagen" : "Plantari su misura"}
            icon={SUPPORT}
            selected={props.state.index === 3}
          />
          <DrawerButton
            href="/(protected)/home/feetfirst-points"
            title={isGerman() ? "Punkte FeetFirst" : "Punti FeetFirst"}
            icon={SUPPORT}
            selected={props.state.index === 4}
          />
          <DrawerButton
            href="/(protected)/home/feetfirst-points"
            title={isGerman() ? "Punkte FeetFirst" : "Punti FeetFirst"}
            icon={SCAN}
            selected={props.state.index === 5}
          />
        </ScrollView>

        {/* Close handle */}
        <Pressable
          className="top-2/3 right-0 translate-x-[100%] absolute pr-8"
          onPress={closeDrawer}
        >
          <Svg height={100} width={100}>
            <Path d="M0,0 Q50,50 0,100 Z" fill="#1A1C1B" />
          </Svg>
          <AntDesign
            name="closecircleo"
            size={24}
            color="white"
            className="absolute -translate-x-1/2 top-[38%]"
          />
        </Pressable>
      </Animated.View>
    </Portal>
  );
}
