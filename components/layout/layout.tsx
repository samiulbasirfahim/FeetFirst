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
  stickyIndex?: number[];
  children: ReactNode;
  edges?: SafeAreaViewProps["edges"];
  scrollable?: boolean;
  noPadding?: boolean;
  avoidTabbar?: boolean;
  avoidKeyboard?: boolean;
} & SafeAreaViewProps;

export function Layout({
  scrollable = false,
  stickyIndex = [],
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
                gap: 12,
              }}
              stickyHeaderIndices={stickyIndex}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="on-drag"
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
              bottomOffset={20}
            >
              {children}
              {avoidTabbar && <View style={{ height: 100 }}></View>}
            </KeyboardAwareScrollView>
          ) : (
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: avoidTabbar ? 100 : 0,
                gap: 12,
              }}
              stickyHeaderIndices={stickyIndex}
              keyboardDismissMode="on-drag"
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
            gap: 12,
            paddingTop: edges.toString().includes("top")
              ? 0
              : noPadding
                ? 0
                : 12,
            paddingHorizontal: noPadding ? 0 : 12,
            paddingBottom: avoidTabbar
              ? noPadding
                ? 0
                : 24 + 100
              : noPadding
                ? 0
                : 24,
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
