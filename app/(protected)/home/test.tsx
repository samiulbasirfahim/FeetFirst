import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { View } from "react-native";

export default function SCreen() {
  return (
    <Layout avoidTabbar>
      <View className="flex-1 bg-primary h-400">
        <Typography>HELLO</Typography>
      </View>
    </Layout>
  );
}
