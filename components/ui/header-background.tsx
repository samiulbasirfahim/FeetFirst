import { useHeaderHeight } from "@react-navigation/elements";
import { BlurView } from "expo-blur";
import { Portal } from "react-native-portalize";

export default function HeaderBackground() {
  const height = useHeaderHeight();
  return (
    <Portal>
      <BlurView
        style={{
          height: height,
        }}
      ></BlurView>
    </Portal>
  );
}
