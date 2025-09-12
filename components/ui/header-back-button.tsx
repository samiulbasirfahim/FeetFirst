import Ionicons from "@expo/vector-icons/Ionicons";
import { Button } from "./button";
import { router } from "expo-router";

export function HeaderBackButton() {
  if (router.canGoBack())
    return (
      <Button
        className="bg-transparent py-3 px-3 -mx-3 justify-start items-center"
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back-outline" size={24} color="white" />
      </Button>
    );
}
