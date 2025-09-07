import { HeaderBackButton } from "@/components/ui/header-back-button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Stack } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileLayout() {
  const { isGerman } = useLanguageStore();
  const { top } = useSafeAreaInsets();
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          header: ({ options }) => {
            return (
              <View
                style={{ paddingTop: top }}
                className="bg-backgroundDark w-full flex-row relative"
              >
                <View className="flex-row items-center justify-start flex-1">
                  <View className="ps-4">
                    <HeaderBackButton />
                  </View>
                  <Typography className="absolute left-1/2 -translate-x-1/2 font-semibold text-lg text-white">
                    {options.title}
                  </Typography>
                </View>
              </View>
            );
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: isGerman() ? "Profil" : "Profilo",
          }}
        />

        {
          //     <Stack.Screen
          //   name="sustainability"
          //   options={{
          //     headerShown: false,
          //   }}
          // />
        }

        <Stack.Screen
          name="settings"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
