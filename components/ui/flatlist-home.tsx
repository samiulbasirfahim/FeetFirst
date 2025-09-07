import {
  View,
  FlatList,
  ImageSourcePropType,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import React from "react";
import { Typography } from "@/components/ui/typography";
import { Button } from "./button";
import Name1 from "@/assets/svgs/company_name1.svg";
import Name2 from "@/assets/svgs/company_name2.svg";
import { LinearGradient } from "expo-linear-gradient";
import { SvgProps } from "react-native-svg";
import { router } from "expo-router";

type BannerItem = {
  title: string;
  desc: string;
  button?: string;
  img: ImageSourcePropType;
  logo: React.FC<SvgProps>;
  href: string;
};

const banners: BannerItem[] = [
  {
    title: "Passgenau. Leistungsstark. Für dich gemacht.",
    desc: "Das ist IMOTANA. Mehr als ein Fußballschuh.",
    button: "Mehr erfahren",
    img: require("@/assets/images/Imotana.png"),
    logo: Name1,
    href: "/others/imotana-shoes",
  },
  {
    title: "Erlebe Radfahren neu! Mehr Leistung. Mehr Komfort.",
    desc: "In Kollaboration mit Winsole",
    button: "Mehr erfahren",
    img: require("@/assets/images/winsole-home.png"),
    logo: Name2,
    href: "/others/winsole",
  },
];

const HomeFlatList = () => {
  const { width } = useWindowDimensions();

  const renderItem = ({ item: value }) => {
    return (
      <View className="mx-2" style={{ width: width * 0.9 }}>
        <ImageBackground
          source={value.img}
          resizeMode="cover"
          style={{ width: "100%", height: 350 }}
        >
          <View>
            <LinearGradient
              colors={["#020202", "transparent"]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 150,
              }}
            />
            <LinearGradient
              colors={["rgba(0,0,0,1)", "transparent"]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 70,
                height: 50,
              }}
            />
            <View className="pl-3 pb-4">
              <Typography className="text-xl font-normal text-start mb-2">
                {value.title}
              </Typography>
              <Typography className="text-sm"> {value.desc}</Typography>
            </View>
            <View className="w-[40%] pl-3 ">
              <Button
                variant="outline"
                textClassName=" text-sm font-medium"
                className="border-primary rounded-[12px] bg-primary/15 py-[8px]  font-medium"
                onPress={() => router.push(value.href as any)}
              >
                {value.button}
              </Button>
            </View>
          </View>
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,1)"]}
            locations={[0.2, 0.8]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 80,
            }}
          />
          <View className="absolute bottom-0 pl-3">
            <value.logo width={width * 0.8} />
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <FlatList
      data={banners}
      renderItem={renderItem}
      style={{
        height: 350,
        width: "100%",
        marginHorizontal: 5,
      }}
      keyExtractor={(_, index) => index.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default HomeFlatList;
