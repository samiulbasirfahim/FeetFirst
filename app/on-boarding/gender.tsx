import Ionicons from "@expo/vector-icons/Ionicons";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { Link } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import useOnboardingQuestionStore from "@/store/onboarding-questions";

export default function Screen() {
  const { isGerman } = useLanguageStore();
  const { setOnboardingQuestion } = useOnboardingQuestionStore();
  const [selectedGender, setSelectedGender] = useState<"male" | "female">(
    "male",
  );

  return (
    <Layout>
      <View className="flex-1">
        <Typography
          variant="onboarding-header"
          className="text-white font-pathSemiBold text-[20px]"
        >
          {isGerman()
            ? "Welche Produkte verwendest du am häufigsten?"
            : "Quali sono i prodotti che utilizzi di più?"}
        </Typography>

        <View className="gap-4 flex-row mt-16 flex-1">
          <GenderButton
            title={isGerman() ? "Mann" : "Uomo"}
            Icon={"male-sharp"}
            onPress={() => {
              setSelectedGender("male");
              setOnboardingQuestion("gender", "man");
            }}
            selected={selectedGender === "male"}
          />
          <GenderButton
            title={isGerman() ? "Frau" : "Donna"}
            Icon={"female-sharp"}
            onPress={() => {
              setSelectedGender("female");
              setOnboardingQuestion("gender", "woman");
            }}
            selected={selectedGender === "female"}
          />
        </View>
      </View>

      <Link asChild href={"/on-boarding/foot-issues"}>
        <Button
          variant="big"
          textClassName="text-white font-pathSemiBold text-[16px] py-1"
        >
          {isGerman() ? "nächste" : "prossima"}
        </Button>
      </Link>
    </Layout>
  );
}

type Props = {
  title: string;
  selected: boolean;
  Icon: string;
  onPress: () => void;
};
function GenderButton({ title, Icon, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`flex-1 rounded-lg items-center gap-4 aspect-square justify-center ${selected ? "bg-primary" : "bg-muted-background"}`}
      style={{
        aspectRatio: 1 / 1,
      }}
    >
      <Ionicons
        name={Icon as any}
        size={44}
        color={selected ? "white" : "#585C5B"}
      />
      <Typography
        className={selected ? "text-white font-bold" : "text-muted-foreground"}
        variant="selected"
      >
        {title}
      </Typography>
    </TouchableOpacity>
  );
}
