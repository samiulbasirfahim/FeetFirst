import { Category } from "@/components/common/category";
import ShoeHeader from "@/components/common/shoe-header";
import { VersionInfo } from "@/components/common/version";
import { Layout } from "@/components/layout/layout";
import { Link } from "expo-router";
import { ImageBackground, useWindowDimensions, View } from "react-native";

const categories = [
  { title: "Category 1", href: "" },
  { title: "Category 2", href: "" },
  { title: "Category 3", href: "" },
];

export default function Screen() {
  const { width, height } = useWindowDimensions();
  return (
    <Layout className="bg-backgroundDark" scrollable stickyIndex={[0]}>
      <ShoeHeader />
      <View
        className="flex-1 items-center justify-start"
        style={{
          minHeight: height,
        }}
      >
        <ImageBackground
          source={require("@/assets/images/category_background.png")}
          style={{
            width: width * 0.9,
            height: height * 0.6,
          }}
          resizeMode="cover"
        >
          {categories.map((category, i) => (
            <Link
              key={i}
              href={{
                pathname: "/(protected)/shoe-recommendations/shoes",
              }}
              asChild
            >
              <Category
                height={(height * 0.6) / categories.length}
                {...category}
                last={i === categories.length - 1}
              />
            </Link>
          ))}
        </ImageBackground>

        <View
          className="w-full "
          style={{
            marginBottom: 40,
          }}
        >
          <VersionInfo />
        </View>
      </View>
    </Layout>
  );
}
