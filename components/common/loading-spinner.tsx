import { ActivityIndicator, View } from "react-native";
import { Typography } from "../ui/typography";

export const LoadingSpinner = () => {
    return (
        <View className="flex-1 justify-center flex-row items-center gap-2">
            <ActivityIndicator color={"#62A07B"} size={22} />
            <Typography className="font-normal text-lg">Loading...</Typography>
        </View>
    );
};
