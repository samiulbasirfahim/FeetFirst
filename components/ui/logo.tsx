import { ImageProps } from "react-native";
import LOGO from "@/assets/images/logo.png";
import { Image } from "react-native";
import { twMerge } from "tailwind-merge";

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
