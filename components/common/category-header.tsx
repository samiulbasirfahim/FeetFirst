import { Image, useWindowDimensions, View } from "react-native";
import { HeaderBackButton } from "../ui/header-back-button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function ShoeHeader() {
  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [showSearch, setShowSearch] = useState();
  return (
    <View
      className="flex-row items-center justify-between bg-backgroundDark"
      style={{
        paddingTop: top + 20,
        paddingBottom: 24,
        paddingHorizontal: 14,
        elevation: 10,
      }}
    >
      <HeaderBackButton />

      <View>
        <Image
          source={require("@/assets/images/logo-icon.png")}
          height={80}
          width={80}
          style={{
            height: 50,
            width: 50,
          }}
        />
      </View>

      <Ionicons name="search" size={24} color="white" />
    </View>
  );
}
