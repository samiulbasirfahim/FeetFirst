import { ReactNode } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  edges?: SafeAreaViewProps["edges"];
  scrollable?: boolean;
  noPadding?: boolean;
  avoidTabbar?: boolean;
  avoidKeyboard?: boolean;
} & SafeAreaViewProps;

export function Layout({
  scrollable = false,
  children,
  edges = [],
  className,
  avoidTabbar = false,
  noPadding = false,
  avoidKeyboard = false,
  ...props
}: Props) {
  return (
    <>
      {scrollable ? (
        <SafeAreaView
          edges={edges}
          className={twMerge("flex-1 bg-background", className)}
          {...props}
        >
          {avoidKeyboard ? (
            <KeyboardAwareScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 0,
              }}
              showsVerticalScrollIndicator={false}
              style={{
                flex: 1,
                paddingTop: edges.toString().includes("top")
                  ? 0
                  : noPadding
                    ? 0
                    : 24,
                paddingHorizontal: noPadding ? 0 : 12,
                paddingBottom: noPadding ? 0 : 24,
              }}
              bottomOffset={10}
            >
              {children}
              {avoidTabbar && <View style={{ height: 100 }}></View>}
            </KeyboardAwareScrollView>
          ) : (
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: avoidTabbar ? 100 : 0,
              }}
              showsVerticalScrollIndicator={false}
              style={{
                flex: 1,
                paddingTop: edges.toString().includes("top")
                  ? 0
                  : noPadding
                    ? 0
                    : 24,
                paddingHorizontal: noPadding ? 0 : 12,
                paddingBottom: noPadding ? 0 : 24,
              }}
            >
              {children}
            </ScrollView>
          )}
        </SafeAreaView>
      ) : (
        <SafeAreaView
          edges={edges}
          style={{
            paddingTop: edges.toString().includes("top")
              ? 0
              : noPadding
                ? 0
                : 12,
            paddingHorizontal: noPadding ? 0 : 12,
            paddingBottom: noPadding ? 0 : avoidTabbar ? 24 + 100 : 24,
          }}
          className={twMerge("flex-1 bg-background", className)}
          {...props}
        >
          {children}
        </SafeAreaView>
      )}
    </>
  );
}
