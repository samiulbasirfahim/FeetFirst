import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Typography } from "../ui/typography";

type Props = {
  title: string;
  last?: boolean;
  height: number;
} & TouchableOpacityProps;

export function Category({ height, title, last = false, ...props }: Props) {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      className={
        last
          ? "bg-backgroundDark/30 items-center justify-center"
          : "border-b-4 border-white bg-backgroundDark/30 items-center justify-center"
      }
      style={{
        height: height,
        width: "100%",
      }}
    >
      <Typography variant="title" className="text-white font-bold">
        {title}
      </Typography>
    </TouchableOpacity>
  );
}

export function SubCategory() {}
