import { PlatformPressable } from "@react-navigation/elements";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { useLinkBuilder } from "@react-navigation/native";
import { Text, View } from "react-native";

export function TabBar({ state, descriptors, navigation }: MaterialTopTabBarProps) {
    const { buildHref } = useLinkBuilder();

    return (
        <View className="absolute bottom-8 items-center">
            <View className="bg-primary  items-center  flex-row">
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
                            style={{ flex: 1 }}
                        >
                            <Text style={{ color: isFocused ? "red" : "green" }}>
                                {String(label)}
                            </Text>
                        </PlatformPressable>
                    );
                })}
            </View>
        </View>
    );
}
