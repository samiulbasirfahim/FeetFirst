import { Stack } from "expo-router";
import { HeaderBackButton } from "@/components/ui/header-back-button";

export default function PublicLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1A1C1B",
          },
          headerShadowVisible: false,
          headerShown: true,
          headerLeft() {
            return <HeaderBackButton />;
          },
        }}
      />
    </>
  );
}
