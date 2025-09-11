import { View, ImageBackground, TouchableOpacity } from "react-native"
import Like from "@/assets/svgs/like_home.svg";
import Entypo from "@expo/vector-icons/Entypo";
import TouchButtonBefore from "@/assets/svgs/touch_button_before.svg";
import TouchButtonAfter from "@/assets/svgs/touch_button_after.svg";
import { Typography } from "../ui/typography";
import { useState } from "react";

export function TwoDAccordian() {

    const [touch, setTouch] = useState({
        first: true,
        second: false,
        third: false,
        fourth: false,
    });

    const handleTouch = (position) => {
        setTouch((prev) => {
            const reset = {
                first: false,
                second: false,
                third: false,
                fourth: false,
            };

            return { ...reset, [position]: !prev[position] };
        });
    };
    return (
        <View className="relative isolate overflow-hidden" >
            <View className="relative flex-col w-[90%] mx-auto border border-primary/20 px-6 py-8 rounded-[30px] z-40 bg-backgroundDark">
                <View className="flex-row justify-between items-center mb-4 ">
                    <View className="border border-primary bg-primary/15 p-2.5 rounded-2xl">
                        <Like height={24} width={24} />
                    </View>
                    <View>
                        <Typography className="font-medium text-sm">
                            Leistungssteigerung mit Einlagen
                        </Typography>
                    </View>
                    <View>
                        <Entypo name="chevron-small-up" size={30} color={"#62A07B"} />
                    </View>
                </View>
                <View>
                    <Typography className="text-sm">
                        Optimiert deine Bewegungsabläufe, steigert deine sportliche
                        Leistung und reduziert Ermüdung für mehr Ausdauer und Effizienz.
                    </Typography>
                </View>
            </View>
            <View className="relative z-20">
                <ImageBackground
                    source={require("@/assets/images/foot_sole3.png")}
                    resizeMode="cover"
                    style={{ height: 400, width: 550, right: 65, top: 20, position: 'relative' }}
                >
                    <View style={{ position: 'absolute', right: '32%', top: '7%' }}>
                        <TouchableOpacity
                            onPressOut={() => handleTouch("first")}
                            className="absolute -left-10"
                        >

                            {touch.first === false ? (
                                <TouchButtonBefore height={35} width={35} />
                            ) : (
                                <>
                                    <TouchButtonAfter height={35} width={35} />
                                    <View
                                        style={{
                                            width: 1.5, // thickness of the bar
                                            height: 50, // how long it should be
                                            position: "absolute",
                                        }}
                                        className="absolute right-1/2 bottom-10 bg-primary/50"
                                    />
                                </>
                            )}
                        </TouchableOpacity>
                        <Typography className="w-[150px] font-medium text-base leading-[14px] pl-2">
                            Leistungssteigerung mit Einlagen
                        </Typography>
                    </View>
                    <View style={{
                        position: 'absolute',
                        right: '25%',
                        top: '19%'
                    }}>
                        <TouchableOpacity
                            onPressOut={() => handleTouch("second")}
                            className="absolute -left-10 top-8"
                        >
                            {touch.second === false ? (
                                <TouchButtonBefore height={35} width={35} />
                            ) : (
                                <>
                                    <TouchButtonAfter height={35} width={35} />
                                    <View
                                        style={{
                                            width: 1.5,
                                            height: 140,

                                            position: "absolute",
                                        }}
                                        className="absolute right-1/2 bottom-10 bg-primary/50"
                                    />
                                </>
                            )}
                        </TouchableOpacity>
                        <Typography className="w-[150px] font-medium text-base leading-[14px] pl-2">
                            Längere Lebensdauer Ihrer Schuhe
                        </Typography>
                    </View>
                    <View style={{
                        position: 'absolute',
                        right: '50%',
                        top: '40%'
                    }}>
                        <TouchableOpacity
                            onPressOut={() => handleTouch("third")}
                            className="absolute -top-12"
                        >
                            {touch.third === false ? (
                                <TouchButtonBefore height={35} width={35} />
                            ) : (
                                <>
                                    <TouchButtonAfter height={35} width={35} />
                                    <View
                                        style={{
                                            width: 1.5, // thickness of the bar
                                            height: 140, // how long it should be

                                            position: "absolute",
                                        }}
                                        className="absolute right-1/2 bottom-10 bg-primary/50"
                                    />
                                </>
                            )}
                        </TouchableOpacity>
                        <Typography className=" w-[150px] font-medium text-base leading-[14px]">
                            Schmerzreduktion & Problembehandlung
                        </Typography>
                    </View>
                    <View style={{
                        position: 'absolute',
                        right: '20%',
                        top: '43%'
                    }}>
                        <TouchableOpacity
                            onPressOut={() => handleTouch("fourth")}
                            className="absolute -left-5 top-10"
                        >
                            {touch.fourth === false ? (
                                <TouchButtonBefore height={35} width={35} />
                            ) : (
                                <>
                                    <TouchButtonAfter height={35} width={35} />
                                    <View
                                        style={{
                                            width: 1.5,
                                            height: 240,

                                            position: "absolute",
                                        }}
                                        className="absolute right-1/2 bottom-10 bg-primary/50"
                                    />
                                </>
                            )}
                        </TouchableOpacity>
                        <Typography className="w-[150px] font-medium text-base leading-[14px] ">
                            Vorbeugung von Fehlstellungen
                        </Typography>
                    </View>
                </ImageBackground>
                {/* <View className="absolute right-[50px] top-[45px] ">
                            <TouchableOpacity
                                onPressOut={() => handleTouch("first")}
                                className="absolute -left-10"
                            >
                                {touch.first === false ? (
                                    <TouchButtonBefore height={35} width={35} />
                                ) : (
                                    <>
                                        <TouchButtonAfter height={35} width={35} />
                                        <View
                                            style={{
                                                width: 1.5, // thickness of the bar
                                                height: 50, // how long it should be
                                                position: "absolute",
                                            }}
                                            className="absolute right-1/2 bottom-10 bg-primary/50"
                                        />
                                    </>
                                )}
                            </TouchableOpacity>
                            <Typography className="w-[150px] font-medium text-base leading-[14px] pl-2">
                                Leistungssteigerung mit Einlagen
                            </Typography>
                        </View> */}
                {/* <View className="absolute  right-[10px] top-[98px]">
                            <TouchableOpacity
                                onPressOut={() => handleTouch("second")}
                                className="absolute -left-10 top-8"
                            >
                                {touch.second === false ? (
                                    <TouchButtonBefore height={35} width={35} />
                                ) : (
                                    <>
                                        <TouchButtonAfter height={35} width={35} />
                                        <View
                                            style={{
                                                width: 1.5,
                                                height: 140,

                                                position: "absolute",
                                            }}
                                            className="absolute right-1/2 bottom-10 bg-primary/50"
                                        />
                                    </>
                                )}
                            </TouchableOpacity>
                            <Typography className="w-[150px] font-medium text-base leading-[14px] pl-2">
                                Längere Lebensdauer Ihrer Schuhe
                            </Typography>
                        </View> */}


            </View>
        </View >
    )
}