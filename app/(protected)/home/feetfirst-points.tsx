import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { View } from "react-native";

export default function Screen() {
  const navigation = useNavigation();
  return (
    <Layout edges={["top"]} className="bg-backgroundDark">
      <Typography>POINTS</Typography>
      <Button onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Typography>Open drawer</Typography>
      </Button>
    </Layout>
  );
}
