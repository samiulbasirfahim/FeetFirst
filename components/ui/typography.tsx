import { ReactNode } from "react";
import { Text, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

const variants = {
    title: "text-3xl text-primary font-bold tracking-tight text-balance",
    titleSecondary: "text-2xl text-foreground font-bold tracking-tight text-balance",
    subtitle: "text-lg tracking-tight text-muted-foreground",
    body: "text-base text-foreground leading-7 text-foreground",
    caption: "text-lg text-muted-foreground text-muted-foreground",
    selected: "font-semibold text-primary text-lg",
    muted: "text-muted-foreground text-lg font-semibold",
};

type Props = TextProps & {
    variant?: keyof typeof variants;
    children: ReactNode;
};

export const Typography = ({
    children,
    variant = "body",
    className,
    ...props
}: Props) => {
    return (
        <Text {...props} className={twMerge(variants[variant], className)}>
            {children}
        </Text>
    );
};
