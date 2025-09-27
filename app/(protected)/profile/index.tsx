import EDIT from "@/assets/svgs/edit.svg";
import GLOBAL from "@/assets/svgs/global.svg";
import PROFILE from "@/assets/svgs/profile-circle.svg";
import TRIANGLE from "@/assets/svgs/triangle.svg";
import { VersionInfo } from "@/components/common/version";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useAuthStore } from "@/store/auth";
import { useLanguageStore } from "@/store/language";
import { router } from "expo-router";
import { Image, ScrollView, useWindowDimensions, View } from "react-native";

export default function Screen() {
  const { isGerman } = useLanguageStore();

  const { user } = useAuthStore();
  const { width } = useWindowDimensions();

  return (
    <Layout className="bg-backgroundDark" scrollable avoidTabbar>
      <View className="flex-row justify-between items-center py-4">
        <View
          style={{
            maxWidth: (width / 3) * 2 - 10,
          }}
        >
          <Typography className="text-5xl text-primary font-bold">
            Hi, {user?.name.split(" ")[0]}
          </Typography>

          <Typography className="text-primary text-xl">
            {user?.email}
          </Typography>
        </View>

        <Image
          source={{ uri: "https://avatar.iran.liara.run/public/34" }}
          className="w-1/3 aspect-square rounded-full"
        />
      </View>

      <View className="flex-row gap-2 pb-4">
        <Button
          textClassName="font-normal"
          activeOpacity={1}
          variant={user?.gender === "man" ? "primary" : "secondary"}
        >
          {isGerman() ? "Mann" : "Uomo"}
        </Button>
        <Button
          textClassName="font-normal"
          activeOpacity={1}
          variant={user?.gender === "woman" ? "primary" : "secondary"}
        >
          {isGerman() ? "Frau" : "Donna"}
        </Button>
      </View>

      <ScrollView className="py-4" contentContainerClassName="gap-4">
        <Button
          noWrap
          variant={"profile_menu"}
          onPress={() => router.push("/(protected)/profile/settings")}
        >
          <PROFILE />
          <Typography className="text-xl text-primary">
            {isGerman() ? "Einstellungen" : "Impostazioni"}
          </Typography>
        </Button>

        <Button
          noWrap
          variant={"profile_menu"}
          onPress={() => router.push("/(protected)/profile/shopping")}
        >
          <EDIT />
          <Typography className="text-xl text-primary">
            {isGerman() ? "Acquisti" : "Einkäufe"}
          </Typography>
        </Button>
        <Button noWrap variant={"profile_menu"} onPress={() => {}}>
          <GLOBAL />
          <Typography className="text-xl text-primary">
            {isGerman() ? "Webseite" : "Website"}
          </Typography>
        </Button>

        <Button
          noWrap
          variant={"profile_menu"}
          onPress={() => router.push("/others/sustainability")}
        >
          <TRIANGLE />
          <Typography className="text-xl text-primary">
            {isGerman() ? "Nachhaltigkeit" : "Sostenibilità"}
          </Typography>
        </Button>
      </ScrollView>

      <VersionInfo />
    </Layout>
  );
}
