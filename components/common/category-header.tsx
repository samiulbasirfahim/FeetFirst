import { Image, Pressable, useWindowDimensions, View } from "react-native";
import { HeaderBackButton } from "../ui/header-back-button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Button } from "../ui/button";
import { router } from "expo-router";
import { TextInput } from "react-native";

export default function ShoeHeader() {
    const { top } = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const [showSearch, setShowSearch] = useState(false);
    return (
        <View>
            <View
                className="flex-row items-center justify-between bg-backgroundDark"
                style={{
                    paddingTop: top,
                    elevation: 10,
                }}
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

                <Button
                    variant="ghost"
                    className="py-6 px-8 m-0 rounded-none"
                    onPress={() => {
                        setShowSearch(true);
                    }}
                >
                    <Ionicons name="search" size={24} color="white" />
                </Button>
            </View>

            {showSearch && (
                <View className="ps-4 py-2 flex-row items-center gap-3">
                    <TextInput className="flex-1 bg-transparent border-2 rounded-lg border-muted-background/50 placeholder:text-muted-foreground text-foreground ps-2" />
                    <Pressable
                        className="px-4 m-0 rounded-none"
                        onPressIn={() => setShowSearch(false)}
                    >
                        <Entypo name="cross" size={28} color="white" />
                    </Pressable>
                </View>
            )}
        </View>
    );
}
