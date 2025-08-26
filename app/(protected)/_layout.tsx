import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";


const { Navigator } = createMaterialTopTabNavigator();
const Tabs = withLayoutContext(Navigator);

export default function ProtectedLayout() {
    return <Tabs>
        <Tabs.Screen name="(drawer)" />
        <Tabs.Screen />
        <Tabs.Screen />
    </Tabs>
}
