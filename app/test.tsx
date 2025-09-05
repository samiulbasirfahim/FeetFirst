import React from "react";
import { View, Text, ScrollView } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

interface AnimatedHeaderProps {
  children?: React.ReactNode;
  height?: number;
  backgroundColor?: string;
  threshold?: number;

  // Header visibility behavior
  variant?: "hidden" | "transparent" | "visible";

  // Animation customization
  animationType?: "fade" | "slide" | "fadeSlide";

  // Styling
  style?: any;
  showShadow?: boolean;
}

export function AnimatedHeader({
  children,
  height = 60,
  backgroundColor = "#2C2C2D",
  threshold = 100,
  variant = "hidden",
  animationType = "fadeSlide",
  style,
  showShadow = true,
}: AnimatedHeaderProps) {
  const scrollY = useSharedValue(0);

  // Method to update scroll position from parent
  const updateScrollPosition = (scrollPosition: number) => {
    "worklet";
    scrollY.value = scrollPosition;
  };

  const getAnimatedStyle = () => {
    "worklet";

    if (variant === "visible") {
      // Always visible with background
      return {
        opacity: 1,
        transform: [{ translateY: 0 }, { scale: 1 }],
      };
    }

    const progress = interpolate(
      scrollY.value,
      [threshold - 50, threshold],
      [0, 1],
      Extrapolate.CLAMP,
    );

    if (variant === "transparent") {
      // Transparent to opaque background
      return {
        opacity: 1, // Header is always visible
        backgroundColor: `${backgroundColor}${Math.round(progress * 255)
          .toString(16)
          .padStart(2, "0")}`,
      };
    }

    // variant === 'hidden' - Hidden until threshold
    switch (animationType) {
      case "fade":
        return {
          opacity: progress,
          transform: [{ translateY: 0 }, { scale: 1 }],
        };

      case "slide":
        return {
          opacity: 1,
          transform: [
            {
              translateY: interpolate(
                progress,
                [0, 1],
                [-height, 0],
                Extrapolate.CLAMP,
              ),
            },
            { scale: 1 },
          ],
        };

      case "fadeSlide":
      default:
        return {
          opacity: progress,
          transform: [
            {
              translateY: interpolate(
                progress,
                [0, 1],
                [-height * 0.3, 0],
                Extrapolate.CLAMP,
              ),
            },
            {
              scale: interpolate(
                progress,
                [0, 1],
                [0.95, 1],
                Extrapolate.CLAMP,
              ),
            },
          ],
        };
    }
  };

  const animatedStyle = useAnimatedStyle(getAnimatedStyle);

  // Create scroll handler function to be used by parent
  const createScrollHandler = () => {
    return (event: any) => {
      const scrollPosition = event.nativeEvent.contentOffset.y;
      updateScrollPosition(scrollPosition);
    };
  };

  const HeaderComponent = (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height,
          backgroundColor:
            variant === "transparent" ? "transparent" : backgroundColor,
          zIndex: 1000,
          justifyContent: "center",
          alignItems: "center",
        },
        showShadow && {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        animatedStyle,
        style,
      ]}
    >
      {children || (
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Animated Header
        </Text>
      )}
    </Animated.View>
  );

  return {
    HeaderComponent,
    onScroll: createScrollHandler(),
    updateScrollPosition, // For manual scroll position updates
  };
}

// Example usage components for each variant
export function HiddenHeaderExample() {
  const { HeaderComponent, onScroll } = AnimatedHeader({
    height: 70,
    backgroundColor: "#1a1a1a",
    threshold: 120,
    variant: "hidden",
    animationType: "fadeSlide",
    children: (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#62A07B",
          }}
        />
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
          Hidden Header
        </Text>
      </View>
    ),
  });

  return { HeaderComponent, onScroll };
}

export function TransparentHeaderExample() {
  const { HeaderComponent, onScroll } = AnimatedHeader({
    height: 70,
    backgroundColor: "#1a1a1a",
    threshold: 100,
    variant: "transparent",
    children: (
      <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
        Transparent Header
      </Text>
    ),
  });

  return { HeaderComponent, onScroll };
}

export function VisibleHeaderExample() {
  const { HeaderComponent, onScroll } = AnimatedHeader({
    height: 70,
    backgroundColor: "#2C2C2D",
    variant: "visible",
    children: (
      <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
        Always Visible Header
      </Text>
    ),
  });

  return { HeaderComponent, onScroll };
}

export default function HeaderUsageExample() {
  const { HeaderComponent, onScroll } = AnimatedHeader({
    height: 70,
    backgroundColor: "#1a1a1a",
    threshold: 150,
    variant: "transparent",
    animationType: "fadeSlide",
    showShadow: true,
    children: (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          My App
        </Text>
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: "#62A07B",
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 12 }}>Pro</Text>
        </View>
      </View>
    ),
  });

  return (
    <View className="bg-backgroundDark" style={{ flex: 1 }}>
      {HeaderComponent}
      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 80 }} // Add padding for header space
      >
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, marginBottom: 20, color: "#fff" }}>
            Scroll to see header animation!
          </Text>

          {Array.from({ length: 20 }, (_, i) => (
            <View
              key={i}
              style={{
                height: 100,
                backgroundColor: "#2C2C2D",
                marginBottom: 10,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Item {i + 1}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
