import { ImageProps, View } from "react-native";
import LOGO from "@/assets/images/logo-icon.png";
import { Image } from "react-native";
import { twMerge } from "tailwind-merge";
import React from "react";
import { SvgProps } from "react-native-svg";

export function Logo({ className, ...props }: ImageProps) {
  return (
    <View className="items-center justify-center">
      <Image
        {...props}
        source={LOGO}
        resizeMode="contain"
        className={twMerge("h-24", className)}
      />
    </View>
  );
}

type Props = {
  Logo: React.FC<SvgProps>;
};

export function LogoWrapper({ Logo }: Props) {
  return (
    <View className="items-center justify-center">
      <View
        style={{
          backgroundColor: "rgba(rgba(98, 160, 123, 0.12))",
          padding: 30,
          borderRadius: "100%",
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(rgba(98, 160, 123, 0.12))",
            padding: 50,
            borderRadius: "100%",
          }}
        >
          <Logo />
        </View>
      </View>
    </View>
  );
}

export function LogoWrapperSub({ Logo }: Props) {
  return (
    <View
      style={{
        backgroundColor: "#555857",
        padding: 30,
        borderRadius: "100%",
      }}
    >
      <Logo />
    </View>
  );
}
