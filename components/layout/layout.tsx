import { ReactNode } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";
import { usePathname } from "expo-router";

type Props = {
  children: ReactNode;
  edges?: SafeAreaViewProps["edges"];
  scrollable?: boolean;
  noPadding?: boolean;
} & SafeAreaViewProps;

export function Layout({
  scrollable = false,
  children,
  edges = [],
  className,
  noPadding = false,
  ...props
}: Props) {
  const pathname = usePathname();
  const isProtectedRoute = pathname.includes("(protected)");

  return (
    <>
      {scrollable ? (
        <SafeAreaView
          edges={edges}
          className={twMerge("flex-1 bg-background", className)}
          {...props}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: isProtectedRoute ? 140 : 0,
            }}
            showsVerticalScrollIndicator={false}
            style={{
              flex: 1,
              paddingTop: edges.toString().includes("top")
                ? 0
                : noPadding
                  ? 0
                  : 24,
              paddingHorizontal: noPadding ? 0 : 12,
              paddingBottom: noPadding ? 0 : 24,
            }}
          >
            {children}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <SafeAreaView
          edges={edges}
          style={{
            paddingTop: edges.toString().includes("top")
              ? 0
              : noPadding
                ? 0
                : 12,
            paddingHorizontal: noPadding ? 0 : 12,
            paddingBottom: noPadding ? 0 : isProtectedRoute ? 24 + 140 : 24,
          }}
          className={twMerge("flex-1 bg-background", className)}
          {...props}
        >
          {children}
        </SafeAreaView>
      )}
    </>
  );
}
