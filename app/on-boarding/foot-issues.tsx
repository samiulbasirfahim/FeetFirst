import MESSAGE from "@/assets/svgs/message.svg";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Screen() {
  const { isGerman } = useLanguageStore();
  const [text, setText] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 100}
        className="flex-1 bg-background"
      >
        <Layout>
          <View className="flex-1">
            <Typography variant="title" className="text-foreground">
              {isGerman()
                ? "Welche Produkte verwendest du am häufigsten?"
                : "Quali sono i prodotti che utilizzi di più?"}
            </Typography>

            <View className="bg-muted-background rounded-lg overflow-hidden mt-12 p-4 flex-row items-start gap-2">
              <View className="pr-2 border-r-2 border-muted-foreground py-0">
                <MESSAGE width={22} height={22} />
              </View>
              <TextInput
                multiline
                value={text}
                onChangeText={setText}
                className="text-foreground bg-muted-background flex-1 h-52"
                style={{
                  lineHeight: 22,
                  paddingTop: 0,
                  textAlignVertical: "top",
                }}
              />
            </View>
          </View>

          <Link asChild href={"/on-boarding/thanks"}>
            <Button variant="big">{isGerman() ? "nächste" : "prossima"}</Button>
          </Link>
        </Layout>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
