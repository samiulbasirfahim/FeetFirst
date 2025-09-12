import {
  View,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";
import Like from "@/assets/svgs/like_home.svg";
import Entypo from "@expo/vector-icons/Entypo";
import TouchButtonBefore from "@/assets/svgs/touch_button_before.svg";
import TouchButtonAfter from "@/assets/svgs/touch_button_after.svg";
import { Typography } from "../ui/typography";
import { useState, useRef } from "react";

type Data = {
  label: string;
  detail: string;
  position: {
    right: string;
    top: string;
    offsetClass?: string;
  };
};

const textsDE: Data[] = [
  {
    label: "Leistungssteigerung mit Einlagen",
    detail:
      "Optimiert deine Bewegungsabläufe, steigert deine sportliche Leistung und reduziert Ermüdung für mehr Ausdauer und Effizienz.",
    position: { right: "32%", top: "7%", offsetClass: "absolute -left-10" },
  },
  {
    label: "Längere Lebensdauer Ihrer Schuhe",
    detail:
      "Verteilt die Belastung gleichmäßig, reduziert die Abnutzung und verlängert so die Lebensdauer deiner Schuhe deutlich.",
    position: {
      right: "25%",
      top: "19%",
      offsetClass: "absolute -left-10 top-8",
    },
  },
  {
    label: "Schmerzreduktion & Problembehandlung",
    detail:
      "Optimiert die Unterstützung deiner Füße, lindert Schmerzen gezielt und unterstützt die Behandlung bestehender Beschwerden für mehr Wohlbefinden im Alltag und Sport.",
    position: { right: "50%", top: "40%", offsetClass: "absolute -top-12" },
  },
  {
    label: "Vorbeugung von Fehlstellungen",
    detail:
      "Fördert eine natürliche Fußstellung, verhindert Fehlbelastungen und beugt so langfristigen Problemen im Bewegungsapparat vor.",
    position: {
      right: "20%",
      top: "43%",
      offsetClass: "absolute -left-5 top-10",
    },
  },
];

export function TwoDAccordian() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleTouch = (index: number) => {
    if (index === activeIndex) return;

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setActiveIndex(index);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View className="relative isolate overflow-hidden">
      {activeIndex !== null && (
        <View className="relative flex-col w-[90%] mx-auto border border-primary/20 px-6 py-8 rounded-[30px] z-40 bg-backgroundDark">
          <Animated.View
            className="flex-row justify-between items-center mb-4 "
            style={{ opacity: fadeAnim }}
          >
            <View className="flex-row items-center gap-1">
              <View className="border border-primary bg-primary/15 p-2 rounded-2xl">
                <Like height={24} width={24} />
              </View>
              <View>
                <Typography className="font-medium text-sm">
                  {textsDE[activeIndex].label}
                </Typography>
              </View>
            </View>
            <View>
              <Entypo name="chevron-small-up" size={30} color={"#62A07B"} />
            </View>
          </Animated.View>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Typography className="text-sm">
              {textsDE[activeIndex].detail}
            </Typography>
          </Animated.View>
        </View>
      )}

      <View className="relative z-20">
        <ImageBackground
          source={require("@/assets/images/foot_sole3.png")}
          resizeMode="cover"
          style={{
            height: 400,
            width: 550,
            right: 65,
            top: 20,
            position: "relative",
          }}
        >
          {textsDE.map((item, index) => (
            <View
              key={index}
              style={{
                position: "absolute",
                right: item.position.right as any,
                top: item.position.top as any,
              }}
            >
              <TouchableOpacity
                onPressOut={() => handleTouch(index)}
                className={item.position.offsetClass}
              >
                {activeIndex === index ? (
                  <>
                    <TouchButtonAfter height={35} width={35} />
                    <Animated.View
                      style={[
                        {
                          width: 1.5,
                          height: 1000,
                          position: "absolute",
                        },
                        // fadeAnim,
                      ]}
                      className="absolute right-1/2 bottom-10 bg-primary/50"
                    />
                  </>
                ) : (
                  <TouchButtonBefore height={35} width={35} />
                )}
              </TouchableOpacity>
              <Typography className="w-[150px] font-medium text-base leading-[14px] pl-2">
                {item.label}
              </Typography>
            </View>
          ))}
        </ImageBackground>
      </View>
    </View>
  );
}
