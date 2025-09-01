import HOME from "@/assets/svgs/home.svg";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import Drawer from "expo-router/drawer";
import { View } from "react-native";

export default function Screen() {
    const navigation = useNavigation();
    return (
        <>
            <Drawer.Screen
                options={{
                    drawerLabel({ focused }) {
                        return (
                            <View className="flex-row gap-2 items-center">
                                <HOME />
                                <Typography className="text-2xl text-white font-semibold">
                                    Home
                                </Typography>
                            </View>
                        );
                    },
                }}
            />
            <Layout edges={["top"]} className="bg-backgroundDark">
                <Typography>HELLO</Typography>
                <Button onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Typography>Open drawer</Typography>
                </Button>
            </Layout>
        </>
    );
}
