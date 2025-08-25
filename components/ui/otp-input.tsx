import React from "react";
import { Dimensions, View } from "react-native";
import { OtpInput, OtpInputProps } from "react-native-otp-entry";

const { width, height } = Dimensions.get("window");

type Props = {
    numberOfDigits: number;
} & OtpInputProps;

const ResponsiveOtpInput = ({ numberOfDigits = 4, ...props }: Props) => {
    const boxWidth = Math.min(width * 0.18, 80);
    const boxHeight = Math.min(height * 0.07, 60);
    const gapSize = Math.min(width * 0.03, 12);
    const fontSize = Math.min(width * 0.05, 22);

    return (
        <View>
            <OtpInput
                numberOfDigits={numberOfDigits}
                theme={{
                    containerStyle: {
                        justifyContent: "center",
                        gap: gapSize,
                        flexDirection: "row",
                    },
                    pinCodeContainerStyle: {
                        borderRadius: 18,
                        borderWidth: 0,
                        backgroundColor: "#303231",
                        width: boxWidth,
                        height: boxHeight,
                    },
                    pinCodeTextStyle: {
                        color: "white",
                        fontSize,
                    },
                    focusedPinCodeContainerStyle: {
                        borderColor: "#62A07B",
                        borderWidth: 2,
                    },
                    focusStickStyle: {
                        backgroundColor: "#62A07B",
                        width: 2,
                    },
                }}
                {...props}
            />
        </View>
    );
};

export default ResponsiveOtpInput;
