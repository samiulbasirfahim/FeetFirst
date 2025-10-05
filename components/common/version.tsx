import FB from "@/assets/svgs/fb.svg";
import INSTA from "@/assets/svgs/insta.svg";
import WEB from "@/assets/svgs/web.svg";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";
import { openFacebook, openInstagram, openWebsite } from "@/lib/web-link";

export function VersionInfo() {
    const version: string = "10.12.0";
    return (
        <View className="flex-row items-center justify-between my-8 mx-6 flex-1">
            <Typography variant="caption">FEETFIRST {version}</Typography>

            <View className="flex-row items-center gap-2">
                <Button
                    variant="outline"
                    onPress={openFacebook}
                    className="rounded-full bg-muted-background/50 border-2 border-muted-background h-10 w-10 p-0 justify-center items-center"
                >
                    <FB />
                </Button>
                <Button
                    variant="outline"
                    onPress={openInstagram}
                    className="rounded-full bg-muted-background/50 border-2 border-muted-background h-10 w-10 p-0 justify-center items-center"
                >
                    <INSTA />
                </Button>
                <Button
                    variant="outline"
                    onPress={openWebsite}
                    className="rounded-full bg-muted-background/50 border-2 border-muted-background h-10 w-10 p-0 justify-center items-center"
                >
                    <WEB />
                </Button>
            </View>
        </View>
    );
}
