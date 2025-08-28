import HOME from "@/assets/svgs/home.svg";
import SCAN from "@/assets/svgs/scan.svg";
import RUNNINGSHOE from "@/assets/svgs/running-shoe.svg";
import SUPPORT from "@/assets/svgs/support.svg";
import DOCUMENTUPLOAD from "@/assets/svgs/document-upload.svg";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Image, View, ScrollView } from "react-native";
import { Typography } from "../ui/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../ui/button";
import { DrawerButton } from "../ui/drawer-button";
import { useLanguageStore } from "@/store/language";
import { router, useNavigation } from "expo-router";

export function CustomDrawer(props: DrawerContentComponentProps) {
    const navigation = useNavigation();
    const { top: top_safe_padding } = useSafeAreaInsets();
    const { isGerman } = useLanguageStore();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#1A1C1B",
            }}
        >
            <View
                className="bg-primary items-center justify-center gap-4"
                style={{
                    paddingTop: top_safe_padding + 20,
                    paddingBottom: 20,
                }}
            >
                <Image
                    source={{ uri: "https://avatar.iran.liara.run/public/34" }}
                    className="w-1/3 aspect-square rounded-full"
                />
                <Typography variant="title" numberOfLines={1} className="text-white">
                    John Due
                </Typography>

                <Button
                    className="items-center justify-center flex-row gap-2 bg-white"
                    variant="primary"
                    noWrap
                >
                    <DOCUMENTUPLOAD />
                    <Typography className="text-lg text-background">
                        Upload PDF
                    </Typography>
                </Button>
            </View>
            <ScrollView className="p-4" contentContainerClassName="gap-4">
                <DrawerButton
                    href="/(protected)/home/"
                    title="Home"
                    icon={HOME}
                    selected={props.state.index === 0}
                />
                <DrawerButton
                    href="/(protected)/home/feetfirst-points"
                    title={isGerman() ? "Punkte FeetFirst" : "Punti FeetFirst"}
                    icon={SCAN}
                    selected={props.state.index === 1}
                />

                <Button
                    noWrap
                    className="flex-row items-center gap-4 p-4"
                    variant={"ghost"}
                    onPress={() => {
                        navigation.dispatch(props.navigation.closeDrawer() as any);
                        router.navigate("/(protected)/shoe-recommendations");
                    }}
                >
                    <RUNNINGSHOE />
                    <Typography className="text-xl text-white">
                        {isGerman() ? "Schuhemfpehlungen" : "Raccomandazioni di scarpe"}
                    </Typography>
                </Button>
                <DrawerButton
                    href="/(protected)/home/feetfirst-points"
                    title={isGerman() ? "Punkte FeetFirst" : "Punti FeetFirst"}
                    icon={SUPPORT}
                    selected={props.state.index === 3}
                />
                <DrawerButton
                    href="/(protected)/home/feetfirst-points"
                    title={isGerman() ? "Punkte FeetFirst" : "Punti FeetFirst"}
                    icon={SCAN}
                    selected={props.state.index === 4}
                />

                <DrawerButton
                    href="/(protected)/home/feetfirst-points"
                    title={isGerman() ? "Punkte FeetFirst" : "Punti FeetFirst"}
                    icon={SCAN}
                    selected={props.state.index === 5}
                />
            </ScrollView>
        </View>
    );
}
