import { Layout } from "@/components/layout/layout";
import { Logo } from "@/components/ui/logo";
import { Typography } from "@/components/ui/typography";
import { useLanguageStore } from "@/store/language";
import { View } from "react-native";

export default function Screen() {
  const { isGerman, language } = useLanguageStore();

  return (
    <Layout className="bg-backgroundDark">
      <View className="flex justify-center items-center h-full gap-8">
        <Logo  />
        <Typography variant="title" className="text-white">
          Version 2.12.2
        </Typography>
        <Typography variant="subtitle" className="text-center text-foreground w-4/5">
          {isGerman()
            ? "Copyright 2025 FeetF1rst GmbH. Alle Rechte vorbehalten."
            : "Copyright 2025 FeetF1rst GmbH. Tutti i diritti riservati."}
        </Typography>
      </View>
    </Layout>
  );
}
