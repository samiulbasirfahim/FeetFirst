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
        ITSAppUsesNonExemptEncryption: false
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
    plugins: [
      "expo-router",
      [
        "@react-native-google-signin/google-signin",
        {
          iosUrlScheme: `com.googleusercontent.apps.${process.env.EXPO_PUBLIC_IOS_OAUTH_TOKEN}`,
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
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: "952f0178-820c-4208-b67e-4780c50ce38d",
      },
    },
  },
};
