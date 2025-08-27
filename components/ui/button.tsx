import { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { twMerge } from "tailwind-merge";

const variants = {
  primary: "bg-primary px-4 py-2 rounded-xl",
  secondary: "bg-secondary px-4 py-2 rounded-xl",
  outline: "border border-primary px-4 py-2 rounded-xl",
  ghost: "px-4 py-2 rounded-xl",
  destructive: "bg-red-500 px-4 py-2 rounded-xl",
  big: "bg-primary px-4 py-3 rounded-xl w-full",
};

const textVariants = {
  primary: "text-white font-semibold text-center",
  secondary: "text-white font-semibold text-center",
  outline: "text-primary font-semibold text-center",
  ghost: "text-foreground font-semibold text-center",
  destructive: "text-white font-semibold text-center",
  big: "text-white font-semibold text-xl font-semibold text-center",
};

type Props = TouchableOpacityProps & {
  variant?: keyof typeof variants;
  children: ReactNode;
  className?: string;
  textClassName?: string;
};

export const Button = ({
  children,
  variant = "primary",
  className,
  textClassName,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...props}
      className={twMerge(variants[variant], className)}
    >
      <Text className={twMerge(textVariants[variant], textClassName)}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

