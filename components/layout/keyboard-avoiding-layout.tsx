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

type TProps = KeyboardAvoidingViewProps & {
    children: ReactNode;
    edges?: SafeAreaViewProps["edges"];
};

export function KeyboardAvoidingLayout({
    edges = [],
    children,
    ...props
}: TProps) {
    return (
        <SafeAreaView edges={edges} className="flex-1 bg-background">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    className="flex-1 bg-background"
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
                            padding: 24,
                            gap: 20,
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
