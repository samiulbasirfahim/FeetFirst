import { ReactNode } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type TProps = KeyboardAvoidingViewProps & {
  children: ReactNode;
};

export function KeyboardAvoidingLayout({ children, ...props }: TProps) {
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          className="flex-1 bg-background"
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          keyboardVerticalOffset={100}
          {...props}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              padding: 24,
              gap: 32,
              alignItems: "center",
              justifyContent: "center",
            }}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
}
