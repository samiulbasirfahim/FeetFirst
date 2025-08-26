import { ReactNode } from "react";
import { Keyboard, TouchableWithoutFeedback, View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

type Props = {
    children: ReactNode;
} & ViewProps;
export function Layout({ children, className, ...props }: Props) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
                {...props}
                style={{
                    padding: 24,
                }}
                className={twMerge("flex-1 bg-background", className)}
            >
                {children}
            </View>
        </TouchableWithoutFeedback>
    );
}
