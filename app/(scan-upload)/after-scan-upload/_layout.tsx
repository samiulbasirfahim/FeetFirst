import ProgressBar from "@/components/common/progress-bar";
import { HeaderBackButton } from "@/components/ui/header-back-button";
import { Typography } from "@/components/ui/typography";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { Navigator } = createMaterialTopTabNavigator();
const Tabs = withLayoutContext(Navigator);

export default function OnBoardingLayout() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        backBehavior="history"
        screenOptions={{
          swipeEnabled: false,
          lazy: true,
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="second" />
        <Tabs.Screen name="third" />
      </Tabs>
    </SafeAreaView>
  );
}

function CustomTabBar({ state }: MaterialTopTabBarProps) {
  const total_pages = state.routes.length;
  const current_page = state.index + 1;
  return (
    <View className="w-full bg-background gap-2 py-2">
      <View className="w-full items-center justify-center">
        <Image
          source={require("@/assets/images/logo-icon.png")}
          height={50}
          width={50}
          style={{
            height: 50,
            width: 50,
          }}
        />
      </View>
      <View className="justify-start flex-row items-center relative h-20 px-4">
        <HeaderBackButton />
        <Typography
          variant="subtitle"
          className="absolute left-1/2 -translate-x-1/2"
        >
          Step: {current_page}/{total_pages}
        </Typography>
      </View>
      <View className="px-6">
        <ProgressBar totalPages={total_pages} currentPage={current_page} />
      </View>
    </View>
  );
}
