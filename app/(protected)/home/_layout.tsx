import { CustomDrawer } from "@/components/layout/drawer";
import { Drawer } from "expo-router/drawer";

export default function TabLayout() {
    return (
        <Drawer
            drawerContent={(options) => <CustomDrawer {...options} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: "#ffffff00",
                }
            }}
        >
            <Drawer.Screen name="index" />
            <Drawer.Screen name="feetfirst-points" />
        </Drawer>
    );
}
