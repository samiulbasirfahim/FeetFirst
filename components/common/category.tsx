import {
    Image,
    ImageSourcePropType,
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";
import { Typography } from "../ui/typography";
import { View } from "react-native";

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
            <Typography variant="title" className="text-white text-center font-semibold text-[24px] uppercase pr-1">
                {title}
            </Typography>
        </TouchableOpacity>
    );
}

type SubProps = {
    image: ImageSourcePropType;
} & Props;

export function SubCategory({
    image,
    height,
    title,
    last = false,
    ...props
}: SubProps) {
    return (
        <TouchableOpacity
            {...props}
            activeOpacity={0.7}
            className={
                last
                    ? "w-full items-center justify-end overflow-hidden"
                    : "w-full border-b-4 border-white items-center justify-end overflow-hidden"
            }
            style={{ height }}
        >
            <View
                className={
                    "bg-backgroundDark/30 absolute inset-0 z-10 items-center justify-center"
                }
            >
                <Typography
                    variant="title"
                    className=" text-white  font-semibold text-[24px] uppercase pr-1 text-center "
                >
                    {title}
                </Typography>
            </View>

            <Image
                source={image}
                resizeMode="cover"
                style={{
                    height: height * 1.3,
                    width: "100%",
                }}
            ></Image>
        </TouchableOpacity>
    );
}
