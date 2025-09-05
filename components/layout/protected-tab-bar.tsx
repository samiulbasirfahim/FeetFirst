import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { useLinkBuilder } from "@react-navigation/native";
import { View } from "react-native";
import { TabButton } from "../ui/tab-bar-button";

export function TabBar({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) {
  const { buildHref } = useLinkBuilder();

  return (
    <View className="absolute bottom-3 items-center w-full justify-center">
      <View className="bg-background rounded-full items-center justify-center flex-row gap-4 p-2 border-primary border-2 overflow-hidden">
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
            <TabButton
              key={route.key}
              routeName={route.name}
              label={label as string}
              isFocused={isFocused}
              href={buildHref(route.name, route.params) as any}
              onPress={onPress}
              onLongPress={onLongPress}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
            />
          );
        })}
      </View>
    </View>
  );
}
