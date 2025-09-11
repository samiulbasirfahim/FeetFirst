import { Linking } from "react-native";

export async function OpenWebLink(href: string){
    const supported = await Linking.canOpenURL(href);

    if(supported){
        await Linking.openURL(href);
    } else {
        console.log("Can't open url: ", href);
    }
}