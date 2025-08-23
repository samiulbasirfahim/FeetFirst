import { useEffect, useState } from "react";
import "./global.css";
import { router, Stack } from "expo-router";
import { Host } from "react-native-portalize";

export default function RootLayout() {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (isReady) router.replace("/forgot-password");
  }, [isReady]);

  useEffect(() => {
    (async () => {
      setIsReady(true);
    })();
  }, []);

  return (
    <Host>
      <Stack>
        <Stack.Screen
          name="(public)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Host>
  );
}
