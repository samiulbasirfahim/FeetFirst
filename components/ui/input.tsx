import EyeSlash from "@/assets/svgs/eye-slash.svg";
import Eye from "@/assets/svgs/eye.svg";
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
  Icon?: React.FC<SvgProps>;
} & TextInputProps;

export function Input({ Icon, className, ...props }: Props) {
  const clsname = Icon ? "pr-3 border-r-2 border-muted-foreground" : "";
  return (
    <View className="bg-muted-background w-full rounded-xl flex-row px-4 items-center relative">
      <View
        className={twMerge(
          "my-0 py-0 pe-3 border-r-2 border-muted-foreground",
          clsname,
        )}
      >
        {Icon && <Icon />}
      </View>
      <TextInput
        {...props}
        className={twMerge(
          "h-full flex-1 py-4 text-foreground placeholder:text-muted-foreground text-base ps-3",
          className,
        )}
        placeholderTextColor="#585C5B"
      />
    </View>
  );
}

export function InputPassword({ Icon, className, ...props }: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <View className="bg-muted-background w-full rounded-xl flex-row px-4 items-center relative">
      <View className="my-0 py-0 pe-3 border-r-2 border-muted-foreground">
        {Icon && <Icon />}
      </View>
      <TextInput
        {...props}
        className={twMerge(
          "h-full flex-1 py-4 ps-3  text-foreground placeholder:text-muted-foreground text-base",
          className,
        )}
        placeholderTextColor="#585C5B"
        secureTextEntry={showPassword}
      />

      <TouchableOpacity onPress={() => setShowPassword((state) => !state)}>
        {!showPassword ? <Eye /> : <EyeSlash />}
      </TouchableOpacity>
    </View>
  );
}
