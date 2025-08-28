import { ReactNode } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  edges?: SafeAreaViewProps["edges"];
} & SafeAreaViewProps;
export function Layout({ children, edges = [], className, ...props }: Props) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        edges={edges}
        {...props}
        style={{
          padding: 24,
        }}
        className={twMerge("flex-1 bg-background", className)}
      >
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
