import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import "./global.css";
import { router, Stack } from "expo-router";
import { Host } from "react-native-portalize";

export default function RootLayout() {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (isReady) router.replace("/on-boarding");
  }, [isReady]);

  useEffect(() => {
    (async () => {
      setIsReady(true);
    })();
  }, []);

  return (
    <Host>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen
          name="(public)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="on-boarding"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Host>
  );
}
