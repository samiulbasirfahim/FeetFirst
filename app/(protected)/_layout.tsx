import { TabBar } from "@/components/layout/protected-tab-bar";
import { useLanguageStore } from "@/store/language";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

import { withLayoutContext } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { Navigator } = createMaterialTopTabNavigator();
const Tabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function ProtectedLayout() {
  const { isGerman } = useLanguageStore();
  return (
    <SafeAreaView className="flex-1 bg-backgroundDark" edges={["bottom"]}>
      <Tabs
        tabBarPosition="bottom"
        screenOptions={{
          swipeEnabled: false,
          lazy: true,
        }}
        tabBar={(options) => <TabBar {...options} />}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: "Home",
          }}
        />
        <Tabs.Screen
          name="shoe-recommendations"
          options={{
            tabBarLabel: "Shoes",
            // tabBarLabel: isGerman()
            //     ? "Schuhemfpehlungen"
            //     : "Raccomandazioni di scarpe",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Profile",
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
