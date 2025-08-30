import Map from "@/components/common/map";
import { ScrollView, View } from "react-native";

export default function Screen() {
  return (
    <ScrollView className="flex-1 bg-backgroundDark">
      <Map />
    </ScrollView>
  );
}
