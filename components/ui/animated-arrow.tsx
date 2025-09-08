import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import { useEffect } from 'react';

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

function ArrowAnimatedDesign({ isActive }: { isActive: boolean }) {
  const rotation = useSharedValue(isActive ? 180 : 0);

  useEffect(() => {
    rotation.value = withTiming(isActive ? 180 : 0, { duration: 200 });
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <AnimatedAntDesign
      name="down"
      size={15}
      color="#62A07B"
      style={animatedStyle}
    />
  );
}

export default ArrowAnimatedDesign;
