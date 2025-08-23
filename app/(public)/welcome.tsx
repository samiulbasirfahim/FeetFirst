import BG from "@/assets/images/welcome-screen.png";
import { LinearGradient } from "expo-linear-gradient";
import { useLanguageStore } from "@/store/language";
import { ImageBackground, Text, View } from "react-native";
import { router, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { isGerman } = useLanguageStore();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground source={BG} className="flex-1" resizeMode="cover">
        <LinearGradient
          colors={["rgba(0,0,0,0.65)", "rgba(0,0,0,0.8)"]}
          style={{
            position: "absolute",
            inset: 0,
          }}
        />
        <SafeAreaView className="bg-transparent items-center justify-between flex-1 p-6">
          <Text className="text-white text-2xl font-semibold">FEETF1RST</Text>
          <View>
            <Text className="text-white text-lg text-center">
              {isGerman()
                ? "FeetF1rst – Dein persönlicher Partner für die perfekte Schuhversorgung und vieles mehr."
                : "FeetF1rst – Il tuo partner personale per la fornitura perfetta di scarpe e molto altro."}
            </Text>
            <View className="flex-row w-full gap-4 mt-8">
              <Button
                variant="big"
                onPress={() => router.push("/register")}
                textClassName="text-black"
                className="w-1/2 bg-white"
              >
                {isGerman() ? "Registrieren" : "Registrati"}
              </Button>

              <Button
                variant="big"
                onPress={() => router.push("/login")}
                textClassName="text-primary"
                className="w-1/2 bg-primary/10 border-2 border-primary"
              >
                {isGerman() ? "Anmelden" : "Accedi"}
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}
