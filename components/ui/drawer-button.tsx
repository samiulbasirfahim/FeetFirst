import React from "react";
import { SvgProps } from "react-native-svg";
import { Button } from "./button";
import { Typography } from "./typography";
import { router } from "expo-router";

type Props = {
  icon: React.FC<SvgProps>;
  title: string;
  href: string;
  selected?: boolean;
};

export function DrawerButton({
  selected = false,
  icon: Icon,
  title,
  href,
}: Props) {
  return (
    <Button
      noWrap
      className="flex-row items-center gap-4 p-4"
      variant={selected ? "outline" : "ghost"}
      onPress={() => {
        router.replace(href as any);
      }}
    >
      <Icon className="w-4 h-4"/>
      <Typography className="text-xl text-white">{title}</Typography>
    </Button>
  );
}
