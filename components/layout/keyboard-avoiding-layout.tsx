import { ReactNode } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";
import { usePathname } from "expo-router";

type TProps = KeyboardAvoidingViewProps & {
  children: ReactNode;
  noPadding?: boolean;
  skipTabBar?: boolean;
  edges?: SafeAreaViewProps["edges"];
};

export function KeyboardAvoidingLayout({
  edges = [],
  className,
  children,
  noPadding = false,

  ...props
}: TProps) {
  const pathname = usePathname();
  const isProtectedRoute = pathname.includes("(protected)");

  return (
    <SafeAreaView edges={edges} className="flex-1 bg-background">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          className={twMerge("flex-1 bg-background", className)}
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          keyboardVerticalOffset={100}
          {...props}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            className="flex-1"
            keyboardDismissMode="on-drag"
            contentContainerStyle={{
              flexGrow: 1,
              padding: noPadding ? 0 : 12,
              paddingBottom: noPadding ? 0 : isProtectedRoute ? 164 : 24,
              gap: 16,
              alignItems: "center",
            }}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
