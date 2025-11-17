import LineBg from "@/assets/svgs/flexible_bg.svg";
import Leg from "@/assets/svgs/flexible_leg1.svg";
import React, { useState, useEffect, useRef } from "react";
import {
    View,
    TouchableWithoutFeedback,
    Image,
    TouchableOpacity,
} from "react-native";
import { Portal } from "react-native-portalize";
import Accordion from "react-native-collapsible/Accordion";
import Animated, {
    FadeInDown,
    FadeOutUp,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    useAnimatedGestureHandler,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { Typography } from "./typography";
import ArrowAnimatedDesign from "./animated-arrow";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ----------- Types -----------
export interface ExerciseLink {
    text: string;
    imageUrl?: string | number; // local image or require()
}

export interface ExerciseSection {
    title: string;
    content: string;
    links: ExerciseLink[];
}

interface ExerciseAccordionProps {
    sections: ExerciseSection[];
}

interface ZoomableImageModalProps {
    visible: boolean;
    imageUrl?: string | number;
    onClose: () => void;
}

// ----------- Zoomable Image Modal Component -----------
const ZoomableImageModal: React.FC<ZoomableImageModalProps> = ({
    visible,
    imageUrl,
    onClose,
}) => {
    const scale = useSharedValue(1);
    const baseScale = useSharedValue(1);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);

    const { bottom } = useSafeAreaInsets();

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if (scale.value > 1) {
                // Zoom OUT on double tap
                scale.value = withSpring(1);
                offsetX.value = withSpring(0);
                offsetY.value = withSpring(0);
            } else {
                // Zoom IN on double tap (centered)
                scale.value = withSpring(2); // Adjust zoom level if needed
            }
        });

    const pinch = Gesture.Pinch()
        .onStart(() => {
            baseScale.value = scale.value;
        })
        .onUpdate((event) => {
            scale.value = baseScale.value * event.scale;
        })
        .onEnd(() => {
            if (scale.value < 1) {
                scale.value = withSpring(1);
                offsetX.value = withSpring(0);
                offsetY.value = withSpring(0);
            }
        });

    const pan = Gesture.Pan()
        .onStart((event) => {
            startX.value = event.x;
            startY.value = event.y;
        })
        .onUpdate((event) => {
            if (scale.value > 1) {
                offsetX.value = offsetX.value + (event.x - startX.value);
                offsetY.value = offsetY.value + (event.y - startY.value);
            }
        })
        .onEnd(() => {
            if (scale.value > 1) {
                offsetX.value = withSpring(offsetX.value);
                offsetY.value = withSpring(offsetY.value);
            }
        });

    const combined = Gesture.Simultaneous(pinch, pan, doubleTap);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: offsetX.value },
            { translateY: offsetY.value },
            { scale: scale.value },
        ],
    }));

    if (!visible || !imageUrl) return null;

    return (
        <Portal>
            <Animated.View
                entering={FadeInDown.duration(300)}
                exiting={FadeOutUp.duration(300)}
                className="absolute inset-0 flex items-center justify-center z-50 bg-black/80"
            >
                <TouchableWithoutFeedback onPress={onClose}>
                    <View className="absolute inset-0" />
                </TouchableWithoutFeedback>

                <GestureDetector gesture={combined}>
                    <Animated.View
                        style={[
                            {
                                width: "85%",
                                height: "70%",
                                justifyContent: "center",
                                alignItems: "center",
                            },
                            animatedStyle,
                        ]}
                    >
                        <Image
                            source={
                                typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl
                            }
                            style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "contain",
                            }}
                        />
                    </Animated.View>
                </GestureDetector>

                <TouchableWithoutFeedback onPress={onClose} style={{}}>
                    <View
                        className="absolute px-6 py-3 rounded-full bg-primary/50 bottom-0"
                        style={{
                            marginBottom: bottom + 20,
                            zIndex: 0,
                        }}
                    >
                        <Typography
                            className="text-white font-semibold text-xl"
                        >
                            Tap here to close
                        </Typography>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </Portal>
    );
};
// ----------- Interactive Points Overlay Component -----------
interface InteractivePointsProps {
    touch: Record<string, boolean>;
    handleTouch: (key: string) => void;
}

const InteractivePointsOverlay: React.FC<InteractivePointsProps> = ({
    touch,
    handleTouch,
}) => {
    const points = [
        { key: "first", label: "1", bottom: "123px", left: "180px" },
        { key: "second", label: "2", bottom: "58px", left: "160px" },
        { key: "third", label: "3", bottom: "5px", left: "245px" },
        { key: "fourth", label: "4", bottom: "-13px", left: "67px" },
    ];

    return (
        <View>
            {points.map((point) => (
                <TouchableOpacity
                    key={point.key}
                    onPressOut={() => handleTouch(point.key)}
                    className="z-10"
                >
                    {touch[point.key] === false ? (
                        <BlurView intensity={400} experimentalBlurMethod="dimezisBlurView">
                            <View
                                className="absolute border border-white/20 py-1 px-3 rounded-full z-10 bg-[#040705]/20"
                                style={{
                                    bottom: point.bottom as any,
                                    left: point.left as any,
                                }}
                            >
                                <Typography className="font-bold text-base">
                                    {point.label}
                                </Typography>
                            </View>
                        </BlurView>
                    ) : (
                        <View
                            className="absolute border border-white py-1 px-3 rounded-full z-10 bg-[#ffffff]"
                            style={{
                                bottom: point.bottom as any,
                                left: point.left as any,
                            }}
                        >
                            <Typography className="font-bold text-base text-primary">
                                {point.label}
                            </Typography>
                        </View>
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
};

export const ExerciseAccordion: React.FC<ExerciseAccordionProps> = ({
    sections,
}) => {
    const [activeSections, setActiveSections] = useState<number[]>([]);
    const [touch, setTouch] = useState<Record<string, boolean>>({
        first: false,
        second: false,
        third: false,
        fourth: false,
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<
        string | number | undefined
    >(undefined);

    const handleTouch = (key: string) => {
        setTouch((prev) => ({
            first: false,
            second: false,
            third: false,
            fourth: false,
            [key]: !prev[key],
        }));
    };

    const handleLinkPress = (imageUrl?: string | number) => {
        if (imageUrl) {
            setSelectedImage(imageUrl);
            setModalVisible(true);
        }
    };

    useEffect(() => {
        const active: number[] = [];
        sections.forEach((_, i) => {
            if (touch[Object.keys(touch)[i]]) active.push(i);
        });
        setActiveSections(active);
    }, [touch]);

    return (
        <>
            <View className="isolate">
                <LinearGradient
                    pointerEvents="none"
                    colors={["rgba(0,0,0,1)", "transparent"]}
                    style={{
                        position: "absolute",
                        left: 0,
                        right: -20,
                        top: 0,
                        height: 250,
                        zIndex: 99,
                    }}
                    className="z-10"
                />
                <View className="-right-[90px] top-[20px]">
                    <LineBg />
                </View>
                <View className="absolute  left-10">
                    <Leg />
                </View>

                <View>
                    <TouchableOpacity
                        onPressOut={() => {
                            handleTouch("first");
                        }}
                        className="z-10"
                    >
                        {touch.first === false ? (
                            <BlurView
                                intensity={400}
                                experimentalBlurMethod="dimezisBlurView"
                            >
                                <View className=" absolute bottom-[123px] left-[180px] border border-white/20 py-1 px-3 rounded-full z-10 bg-[#040705]/20">
                                    <Typography className="font-bold text-base">1</Typography>
                                </View>
                            </BlurView>
                        ) : (
                            <View className=" absolute bottom-[123px] left-[180px] border border-white py-1 px-3 rounded-full z-10 bg-[#ffffff]">
                                <Typography className="font-bold text-base text-primary">
                                    1
                                </Typography>
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPressOut={() => {
                            handleTouch("second");
                        }}
                        className="z-10"
                    >
                        {touch.second === false ? (
                            <BlurView
                                intensity={400}
                                experimentalBlurMethod="dimezisBlurView"
                            >
                                <View className=" absolute bottom-[58px] left-[160px] border border-white/20 py-1 px-3 rounded-full z-10 bg-[#040705]/20">
                                    <Typography className="font-bold text-base">2</Typography>
                                </View>
                            </BlurView>
                        ) : (
                            <View className=" absolute bottom-[58px] left-[160px] border border-white py-1 px-3 rounded-full z-10 bg-[#ffffff]">
                                <Typography className="font-bold text-base text-primary">
                                    2
                                </Typography>
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPressOut={() => {
                            handleTouch("third");
                        }}
                        className="z-10"
                    >
                        {touch.third === false ? (
                            <BlurView
                                intensity={400}
                                experimentalBlurMethod="dimezisBlurView"
                            >
                                <View className=" absolute bottom-[5px] left-[245px] border border-white/20 py-1 px-3 rounded-full z-10 bg-[#040705]/20">
                                    <Typography className="font-bold text-base">3</Typography>
                                </View>
                            </BlurView>
                        ) : (
                            <View className=" absolute bottom-[5px] left-[245px] border border-white py-1 px-3 rounded-full z-10 bg-[#ffffff]">
                                <Typography className="font-bold text-base text-primary">
                                    3
                                </Typography>
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPressOut={() => {
                            handleTouch("fourth");
                        }}
                        className="z-10   "
                    >
                        {touch.fourth === false ? (
                            <BlurView
                                intensity={400}
                                experimentalBlurMethod="dimezisBlurView"
                            >
                                <View className=" absolute -bottom-[13px] left-[67px] border border-white/20 py-1 px-3 rounded-full z-10 bg-[#040705]/20">
                                    <Typography className="font-bold text-base">4</Typography>
                                </View>
                            </BlurView>
                        ) : (
                            <View className=" absolute -bottom-[13px] left-[67px] border border-white py-1 px-3 rounded-full z-10 bg-[#ffffff]">
                                <Typography className="font-bold text-base text-primary">
                                    4
                                </Typography>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <View className="mt-10 w-[90%] mx-auto isolate">
                <Accordion
                    sections={sections}
                    activeSections={activeSections}
                    touchableComponent={TouchableWithoutFeedback}
                    renderAsFlatList={false}
                    duration={400}
                    onChange={(indexes) => {
                        setActiveSections(indexes);
                        const updated: Record<string, boolean> = {
                            first: false,
                            second: false,
                            third: false,
                            fourth: false,
                        };
                        sections.forEach((_, i) => {
                            const keys = Object.keys(updated);
                            if (indexes.includes(i) && keys[i]) {
                                updated[keys[i]] = true;
                            }
                        });
                        setTouch(updated);
                    }}
                    renderHeader={(section, index, isActive) => (
                        <View>
                            <View
                                className={`mt-3 bg-background flex-row items-center justify-between p-4 ${isActive ? "rounded-t-3xl" : "rounded-3xl"
                                    } transition-all`}
                            >
                                <View className="flex-row items-center gap-4">
                                    <View className="px-2 py-[2px] rounded-lg border border-primary bg-primary/15">
                                        <Typography>{index + 1}</Typography>
                                    </View>
                                    <Typography
                                        className={`text-sm text-boldText ${isActive ? "font-bold" : "font-normal"
                                            } transition-all`}
                                    >
                                        {section.title}
                                    </Typography>
                                </View>
                                <ArrowAnimatedDesign isActive={isActive} />
                            </View>

                            {isActive && (
                                <View className="h-[0.7px] bg-white/30 w-[90%] mx-auto" />
                            )}
                        </View>
                    )}
                    renderContent={(section, index, isActive) => (
                        <Animated.View
                            entering={FadeInDown.duration(220)}
                            exiting={FadeOutUp.duration(200)}
                            className={`p-5 bg-background overflow-hidden flex-col gap-3 ${isActive ? "rounded-b-3xl" : "rounded-3xl"
                                }`}
                        >
                            <Typography className="text-white text-sm font-normal">
                                {section.content}
                            </Typography>

                            {section.links.map((link, i) => (
                                <TouchableWithoutFeedback
                                    key={i}
                                    onPress={() => handleLinkPress(link.imageUrl)}
                                >
                                    <View className="py-2">
                                        <Typography className="text-sm font-medium text-primary">
                                            {link.text}
                                        </Typography>
                                    </View>
                                </TouchableWithoutFeedback>
                            ))}
                        </Animated.View>
                    )}
                />
            </View>

            <ZoomableImageModal
                visible={modalVisible}
                imageUrl={selectedImage}
                onClose={() => setModalVisible(false)}
            />
        </>
    );
};
