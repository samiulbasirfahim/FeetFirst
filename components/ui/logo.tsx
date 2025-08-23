import { ImageProps, View } from "react-native";
import LOGO from "@/assets/images/logo.png";
import { Image } from "react-native";
import { twMerge } from "tailwind-merge";
import React from "react";
import { SvgProps } from "react-native-svg";

export function Logo({ className, ...props }: ImageProps) {
  return (
    <Image
      {...props}
      source={LOGO}
      resizeMode="contain"
      className={twMerge("h-24", className)}
    />
  );
}

type Props = {
  Logo: React.FC<SvgProps>;
};

export function LogoWrapper({ Logo }: Props) {
  return (
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
  );
}
