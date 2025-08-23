import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

export default function PublicLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />;
    </>
  );
}
