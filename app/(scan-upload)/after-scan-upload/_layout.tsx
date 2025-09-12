import ProgressBar from "@/components/common/progress-bar";
import { HeaderBackButton } from "@/components/ui/header-back-button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { HeaderTitle } from "@react-navigation/elements";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { Navigator } = createMaterialTopTabNavigator();
const Tabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function OnBoardingLayout() {
  const { isGerman } = useLanguageStore();

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
        <Tabs.Screen
          name="index"
          options={{
            title: isGerman()
              ? "Willkommen im Einlagen-Konfigurator!"
              : "Benvenuti al configuratore delle solette!",
          }}
        />
        <Tabs.Screen
          name="second"
          options={{
            title: isGerman()
              ? "Orthopädische Maßeinlage"
              : "Plantare ortopedico personalizzato",
          }}
        />
        <Tabs.Screen
          name="third"
          options={{
            title: isGerman()
              ? "Orthopädische Maßeinlage"
              : "Plantare ortopedico personalizzato",
          }}
        />

        <Tabs.Screen
          name="fourth"
          options={{
            title: isGerman()
              ? "Orthopädische Maßeinlage"
              : "Plantare ortopedico personalizzato",
          }}
        />

        <Tabs.Screen
          name="fifth"
          options={{
            title: isGerman()
              ? "Orthopädische Maßeinlage"
              : "Plantare ortopedico personalizzato",
          }}
        />

        <Tabs.Screen
          name="prev_sixth"
          options={{
            title: isGerman()
              ? "Orthopädische Maßeinlage"
              : "Plantare ortopedico personalizzato",
          }}
        />

        <Tabs.Screen
          name="sixth"
          options={{
            title: isGerman()
              ? "Orthopädische Maßeinlage"
              : "Plantare ortopedico personalizzato",
          }}
        />

        <Tabs.Screen
          name="seventh"
          options={{
            title: isGerman()
              ? "Orthopädische Maßeinlage"
              : "Plantare ortopedico personalizzato",
          }}
        />

        <Tabs.Screen
          name="eighth"
          options={{
            title: isGerman()
              ? "Orthopädische Maßeinlage"
              : "Plantare ortopedico personalizzato",
          }}
        />

        <Tabs.Screen
          name="tenth"
          options={{
            title: isGerman()
              ? "Orthopädische Maßeinlage"
              : "Plantare ortopedico personalizzato",
          }}
        />

        <Tabs.Screen
          name="eleventh"
          options={{
            title: isGerman()
              ? "Orthopädische Maßeinlage"
              : "Plantare ortopedico personalizzato",
          }}
        />

        <Tabs.Screen
          name="twelvth"
          options={{
            title: isGerman()
              ? "Orthopädische Maßeinlage"
              : "Plantare ortopedico personalizzato",
          }}
        />


        <Tabs.Screen
          name="thirteenth"
          options={{
            title: isGerman()
              ? "Orthopädische Maßeinlage"
              : "Plantare ortopedico personalizzato",
          }}
        />


        <Tabs.Screen
          name="fourteenth"
          options={{
            title: isGerman()
              ? "Orthopädische Maßeinlage"
              : "Plantare ortopedico personalizzato",
          }}
        />

      </Tabs>
    </SafeAreaView>
  );
}

function CustomTabBar({ state, descriptors }: MaterialTopTabBarProps) {
  const total_pages = state.routes.length;
  const current_page = state.index + 1;
  const { options } = descriptors[state.routes[state.index].key];
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
      <View className="justify-center flex-row items-center relative px-4 py-2">
        <View className="absolute left-4">
          <HeaderBackButton />
        </View>
        <Typography className="text-lg font-semibold">
          {options.title}
        </Typography>
      </View>
      <View className="px-6 h-14 justify-end items-center">
        <ProgressBar totalPages={total_pages} currentPage={current_page} />
        <Typography variant="subtitle" className="mt-2">
          Question {current_page}/{total_pages}
        </Typography>
      </View>
    </View>
  );
}
