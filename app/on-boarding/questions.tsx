import { Link, Stack } from "expo-router";
import { View } from "react-native";

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
        }}
      />
      <View>
        <Link href={"/on-boarding/gender"}>Question</Link>
      </View>
    </>
  );
}
