import { Stack } from "expo-router";

export default function RegisterLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#1A1C1B",
                },
                headerShadowVisible: false,
                headerShown: false,
            }}
        />
    );
}
