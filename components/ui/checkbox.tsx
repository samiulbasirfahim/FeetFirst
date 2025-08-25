import { View } from "react-native";
import BouncyCheckbox, {
    BouncyCheckboxProps,
} from "react-native-bouncy-checkbox";

export default function CheckBox(props: BouncyCheckboxProps) {
    return (
        <View className="flex-shrink-0">
            <BouncyCheckbox
                bounceEffect={0}
                useBuiltInState={false}
                unFillColor="#303231"
                innerIconStyle={{
                    borderWidth: 0,
                }}
                fillColor="#303231"
                iconStyle={{
                    borderRadius: 8,
                }}
                {...props}
            />
        </View>
    );
}
