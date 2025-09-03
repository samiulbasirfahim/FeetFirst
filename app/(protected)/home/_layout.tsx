import JAM_MENU from "@/assets/svgs/jam_menu.svg";
import { CustomDrawer } from "@/components/layout/drawer";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Drawer } from "expo-router/drawer";
import { Image, View } from "react-native";

export default function TabLayout() {
    return (
        <Drawer
            drawerContent={(options) => <CustomDrawer {...options} />}
            screenOptions={({ navigation }) => ({
                drawerType: "front",
                overlayColor: "transparent",
                drawerStyle: {
                    backgroundColor: "transparent",
                },
                headerTransparent: true,
                headerLeft: (props) => {
                    return (
                        <Button
                            variant="ghost"
                            {...props}
                            onPress={() => navigation.openDrawer()}
                        >
                            <JAM_MENU />
                        </Button>
                    );
                },
                headerTitleAlign: "center",
                headerTitle() {
                    return (
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
                    );
                },
                
            })}
        >
            <Drawer.Screen name="index" />
            <Drawer.Screen name="feetfirst-points" />
        </Drawer>
    );
}
