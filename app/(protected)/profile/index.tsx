import EDIT from "@/assets/svgs/edit.svg";
import GLOBAL from "@/assets/svgs/global.svg";
import PROFILE from "@/assets/svgs/profile-circle.svg";
import TRIANGLE from "@/assets/svgs/triangle.svg";
import { VersionInfo } from "@/components/common/version";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { router } from "expo-router";
import { Image, ScrollView, View } from "react-native";

export default function Screen() {
  const { isGerman } = useLanguageStore();

  const gender: string = "male";
  const title: string = "Jone";
  const email: string = "jone32@gmail.com";

  return (
    <Layout className="bg-backgroundDark">
      <View className="flex-row justify-between items-center py-4">
        <View>
          <Typography className="text-5xl text-primary font-bold">
            Hi, {title}
          </Typography>

          <Typography className="text-primary text-xl">{email}</Typography>
        </View>

        <Image
          source={{ uri: "https://avatar.iran.liara.run/public/34" }}
          className="w-1/3 aspect-square rounded-full"
        />
      </View>

      <View className="flex-row gap-2 pb-4">
        <Button
          textClassName="font-normal"
          variant={gender === "male" ? "primary" : "secondary"}
        >
          {isGerman() ? "Mann" : "Uomo"}
        </Button>
        <Button
          textClassName="font-normal"
          variant={gender === "female" ? "primary" : "secondary"}
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

        <Button noWrap variant={"profile_menu"} onPress={() => {}}>
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

        <Button noWrap variant={"profile_menu"} onPress={() => {}}>
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
