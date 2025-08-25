import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  totalPages: number;
  currentPage: number;
};

export default function ProgressBar({ totalPages, currentPage }: Props) {
  const progress = useSharedValue(0);

  useEffect(() => {
    const ratio = Math.min(currentPage / totalPages, 1);
    progress.value = withTiming(ratio, { duration: 300 });
  });

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View className="h-[8px] w-full bg-muted-foreground rounded-lg overflow-hidden">
      <Animated.View style={animatedStyle} className={"h-full bg-primary"} />
    </View>
  );
}
