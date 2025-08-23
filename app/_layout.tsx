import { useEffect, useState } from "react";
import "./global.css";
import { router, Stack } from "expo-router";

export default function RootLayout() {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
      if (isReady) router.replace("/");
  }, [isReady]);

  useEffect(() => {
      (async () => {
          setIsReady(true);
      })();
  }, []);

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
