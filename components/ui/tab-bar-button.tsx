import { Link } from "expo-router";
import { Pressable } from "react-native";
import { Typography } from "../ui/typography";
import Animated, { LinearTransition } from "react-native-reanimated";
import HOME from "@/assets/svgs/home-tab.svg";
import SHOE from "@/assets/svgs/shoe-tab.svg";
import PROFILE from "@/assets/svgs/profile-tab.svg";

interface TabButtonProps {
    routeName: string;
    label: string;
    isFocused: boolean;
    href: string;
    onPress: () => void;
    onLongPress: () => void;
    accessibilityLabel?: string;
    testID?: string;
}

export function TabButton({
    routeName,
    label,
    isFocused,
    href,
    onPress,
    onLongPress,
    accessibilityLabel,
    testID,
}: TabButtonProps) {
    const renderIcon = () => {
        switch (routeName) {
            case "home":
                return (
                    <HOME height={30} width={30} fill={isFocused ? "#ffffff" : "#00000000"} />
                );
            case "shoe-recommendations":
                return (
                    <SHOE height={36} width={34} fill={isFocused ? "#ffffff" : "#00000000"} />
                );
            case "profile":
                return (
                    <PROFILE height={30} width={30} fill={isFocused ? "#ffffff" : "#00000000"} />
                );
            default:
                return null;
        }
    };

    return (
        <Link href={href as any} asChild>
            <Animated.View
                layout={LinearTransition.duration(150)}
            >
                <Pressable
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={accessibilityLabel}
                    testID={testID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    className={`py-4 flex-row items-center gap-2 p-4 rounded-full justify-center ${isFocused ? 'bg-primary' : 'bg-muted-background/60'}`}
                >
                    {renderIcon()}
                    {isFocused && (
                        <Typography className="text-white">
                            {label}
                        </Typography>
                    )}
                </Pressable>
            </Animated.View>
        </Link>
    );
}
