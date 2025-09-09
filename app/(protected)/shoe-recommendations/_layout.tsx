import { Stack, Tabs } from "expo-router";

export default function ShoeRecommendationsLayout() {
    return (
        <>
            <Tabs.Screen
                options={{
                    headerShown: true,
                    popToTopOnBlur: true,
                }}
            />
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
        </>
    );
}
