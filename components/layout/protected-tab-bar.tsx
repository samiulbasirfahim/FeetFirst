import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { PlatformPressable } from "@react-navigation/elements";
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import { useLinkBuilder } from "@react-navigation/native";
import { Text, View } from "react-native";

export function TabBar({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) {
  const { buildHref } = useLinkBuilder();

  return (
    <View className="absolute bottom-8 items-center w-full justify-center">
      <View className="bg-background rounded-2xl items-center justify-center flex-row gap-4">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <PlatformPressable
              key={route.key}
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              className="py-4 flex-row items-center gap-2"
            >
              {route.name === "home" && <Feather name="home" size={24} />}
              {route.name === "shoe-recommendations" && (
                <MaterialCommunityIcons name="shoe-sneaker" size={40} />
              )}
              {route.name === "cart" && (
                <MaterialCommunityIcons name="shoe-sneaker" size={24} />
              )}
              {route.name === "profile" && (
                <MaterialCommunityIcons name="shoe-sneaker" size={24} />
              )}
            </PlatformPressable>
          );
        })}
      </View>
    </View>
  );
}
