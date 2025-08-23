import Eye from "@/assets/svgs/eye.svg";
import EyeSlash from "@/assets/svgs/eye-slash.svg";
import { useState } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgProps } from "react-native-svg";
import { twMerge } from "tailwind-merge";

type Props = {
  Icon: React.FC<SvgProps>;
} & TextInputProps;

export function Input({ Icon, className, ...props }: Props) {
  return (
    <View className="bg-muted-background w-full rounded-lg flex-row px-3 py-3 items-center relative">
      <Icon />
      <TextInput
        {...props}
        className={twMerge(
          "h-full flex-1 py-[0] ms-3 ps-3 border-s-2 border-muted-foreground text-foreground placeholder:text-muted-foreground",
          className,
        )}
      />
    </View>
  );
}

export function InputPassword({ Icon, className, ...props }: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <View className="bg-muted-background w-full rounded-lg flex-row px-3 py-3 items-center relative">
      <Icon />
      <TextInput
        {...props}
        className={twMerge(
          "h-full flex-1 py-[0] ms-3 ps-3 border-s-2 border-muted-foreground text-foreground placeholder:text-muted-foreground",
          className,
        )}
        secureTextEntry={showPassword}
      />

      <TouchableOpacity onPress={() => setShowPassword((state) => !state)}>
        {!showPassword ? <Eye /> : <EyeSlash />}
      </TouchableOpacity>
    </View>
  );
}
