import { Image, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../ui/button";
import { router } from "expo-router";
import { SearchBar } from "./search-bar";
import { useState } from "react";

export default function ShoeHeader() {
    const { top } = useSafeAreaInsets();
    const [height, setHeight] = useState(0);

    return (
        <View className="bg-backgroundDark">
            {/* Header Row */}
            <View
                className="flex-row items-center justify-between"
                style={{
                    paddingTop: top,
                    elevation: 10,
                }}
                onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
            >
                <Button
                    variant="ghost"
                    className="py-6 px-8 m-0 rounded-none"
                    onPress={() => router.back()}
                >
                    <Ionicons name="chevron-back-outline" size={24} color="white" />
                </Button>

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

                <SearchBar top={top} height={height} />
            </View>
        </View>
    );
}
