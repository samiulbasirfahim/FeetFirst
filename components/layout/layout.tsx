import { ReactNode } from "react";
import { View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

type Props = {
    children: ReactNode;
} & ViewProps;
export function Layout({ children, className, ...props }: Props) {
    return (
        <View
            {...props}
            style={{
                padding: 24,
            }}
            className={twMerge("flex-1 bg-background", className)}
        >
            {children}
        </View>
    );
}
