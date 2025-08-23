import "./global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(public)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
