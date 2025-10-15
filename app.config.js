import "dotenv/config";

export default {
    expo: {
        name: "FeetFirst",
        slug: "feetfirst",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/logo.png",
        scheme: "feetfirst",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.samiulbasirfahim.rxen.feetfirst",
            infoPlist: {
                ITSAppUsesNonExemptEncryption: false,
            },
            config: {
                googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
            },
        },
        android: {
            multiDexEnabled: true,
            adaptiveIcon: {
                foregroundImage: "./assets/images/logo.png",
                backgroundColor: "#ffffff",
            },
            config: {
                googleMaps: {
                    apiKey: process.env.GOOGLE_MAPS_API_KEY,
                },
            },
            edgeToEdgeEnabled: true,
            package: "com.samiulbasirfahim.rxen.feetfirst",
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/favicon.png",
        },
        extra: {
            expoPublicGoogleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
            expoPublicIosOauthToken: process.env.EXPO_PUBLIC_IOS_OAUTH_TOKEN,
            expoPublicAndroidOauthToken: process.env.EXPO_PUBLIC_ANDROID_OAUTH_TOKEN,
            expoPublicWebOauthToken: process.env.EXPO_PUBLIC_WEB_OAUTH_TOKEN,
        },
        plugins: [
            "expo-router",
            [
                "@react-native-google-signin/google-signin",
                {
                    iosUrlScheme:
                        "com.googleusercontent.apps.22272893219-bt31s28t9vee1gtg6onaemqqv7jes3vq",
                },
            ],
            [
                "expo-location",
                {
                    locationAlwaysAndWhenInUsePermission:
                        "Allow FEETFIRST to use your location.",
                },
            ],
            [
                "expo-splash-screen",
                {
                    image: "./assets/images/logo.png",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#1A1C1B",
                },
            ],
            [
                "expo-image-picker",
                {
                    photosPermission:
                        "The app accesses your photos to let you set it as your avatar.",
                },
            ],
        ],
        experiments: {
            typedRoutes: true,
        },

        extra: {
            eas: {
                projectId: "63b0c932-f478-4040-b1ea-105f483c4367",
            },
        },
    },
};
