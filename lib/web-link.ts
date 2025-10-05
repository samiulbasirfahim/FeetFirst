import { Linking } from "react-native";

export async function OpenWebLink(href: string) {
    try {
        const supported = await Linking.canOpenURL(href);

        if (supported) {
            await Linking.openURL(href);
        } else {
            console.log("Can't open url: ", href);
        }
    } catch (error) {
        console.log("An error occurred", error);
    }
}

export async function openWebsite() {
    return await OpenWebLink("https://feetf1rst.com");
}

export async function openFacebook() {
    return await OpenWebLink("https://en-gb.facebook.com/profile.php?id=61561747787563");
}

export async function openInstagram() {
    return await OpenWebLink("https://www.instagram.com/feetf1rst_official/");
}
