import { TabBar } from "@/components/layout/protected-tab-bar";
import {
    createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { Navigator } = createMaterialTopTabNavigator();
const Tabs = withLayoutContext(Navigator);

export default function ProtectedLayout() {
    return (
        <SafeAreaView className="flex-1 bg-backgroundDark" edges={["bottom"]}>
            <Tabs
                tabBarPosition="bottom"
                tabBar={(options) => <TabBar {...options} />}
            >
                <Tabs.Screen name="index" />
                <Tabs.Screen name="shoe-recommendations" />
                <Tabs.Screen name="cart" />
                <Tabs.Screen name="profile" />
            </Tabs>
        </SafeAreaView>
    );
}
