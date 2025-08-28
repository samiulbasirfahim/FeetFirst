import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ReactNode } from "react";
import { Pressable, TouchableOpacity, View, ViewProps } from "react-native";
import { Typography } from "../ui/typography";
import { Link } from 'expo-router';

type Props = {
    children: ReactNode[] | ReactNode;
} & ViewProps;
export function SettingsGroup({ children }: Props) {
    return <View className="bg-background rounded-xl mb-6">{children}</View>;
}

export function SettingsValue({
    title,
    value,
    last = false,
}: {
    title: string;
    value: string;
    last?: boolean;
}) {
    return (
        <View
            className="flex-row justify-between items-center p-4 border-b-muted-foreground"
            style={{
                borderBottomWidth: last ? 0 : 2,
            }}
        >
            <Typography variant="selected" className="text-white">
                {title}
            </Typography>
            <Typography variant="caption">{value}</Typography>
        </View>
    );
}

export function SettingsButton({
    title,
    href,
    last = false,
}: {
    title: string;
    href: string;
    last?: boolean;
}) {
    return (
        <Link href={href as any} className='w-full' asChild>
            <TouchableOpacity
                className="flex-row justify-between items-center p-4 border-b-muted-foreground w-full"
                style={{
                    borderBottomWidth: last ? 0 : 2,
                }}
            >
                <Typography variant="selected" className="text-white">
                    {title}
                </Typography>

                <MaterialIcons name="keyboard-arrow-right" size={24} color={"white"} />
            </TouchableOpacity>
        </Link>
    );
}
