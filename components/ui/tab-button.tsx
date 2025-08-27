import {
    NavigationRoute,
    ParamListBase,
    useLinkBuilder,
} from "@react-navigation/native";
import { Link, router } from "expo-router";
import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = {
    route: NavigationRoute<ParamListBase, string>;
} & TouchableOpacityProps;

export const TabButton = ({ route, ...props }: Props) => {
    const { buildHref } = useLinkBuilder();
    if (!route.name || !route.params) return;
    return (
        <Link asChild href={buildHref(route.name, route.params) as any}>
            <TouchableOpacity
                {...props}
                onPress={() => router.push(route.path as any)}
            >
                <Text>{route.name}</Text>
            </TouchableOpacity>
        </Link>
    );
};
