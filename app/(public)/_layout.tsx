import { StatusBar } from "expo-status-bar";
import { router, Stack } from "expo-router";
import { Button } from "@/components/ui/button";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PublicLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1A1C1B",
          },
          headerShadowVisible: false,
          headerShown: true,
          headerLeft(props) {
            if (props.canGoBack)
              return (
                <Button
                  className="bg-transparent"
                  onPress={() => router.back()}
                >
                  <Ionicons
                    name="chevron-back-outline"
                    size={24}
                    color="white"
                  />
                </Button>
              );
          },
        }}
      />
    </>
  );
}
