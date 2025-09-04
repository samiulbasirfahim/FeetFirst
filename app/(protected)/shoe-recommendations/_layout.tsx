import { Stack } from "expo-router";
import Drawer from "expo-router/drawer";

export default function ShoeRecommendationsLayout() {
  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: true,
        }}
      />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
