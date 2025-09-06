import { ReactNode } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";

type Props = {
  stickyIndex?: number[];
  children: ReactNode;
  edges?: SafeAreaViewProps["edges"];
  scrollable?: boolean;
  noPadding?: boolean;
  avoidTabbar?: boolean;
  avoidKeyboard?: boolean;
  onScroll?: (event: any) => void;
} & SafeAreaViewProps;

export function Layout({
  scrollable = false,
  stickyIndex = [],
  children,
  edges = [],
  className,
  avoidTabbar = false,
  noPadding = false,
  avoidKeyboard = false,
  onScroll,
  ...props
}: Props) {
  const padding = {
    top: edges.toString().includes("top") ? 0 : noPadding ? 0 : 24,
    horizontal: noPadding ? 0 : 12,
    bottom: noPadding ? 0 : 24,
    tabbarOffset: 100,
    keyboardBottomOffset: 20,
  };

  const getBottomPadding = (isContentContainer: boolean = false) => {
    if (avoidTabbar) {
      return isContentContainer
        ? padding.tabbarOffset
        : padding.bottom + padding.tabbarOffset;
    }

    return isContentContainer ? 0 : padding.bottom;
  };

  const scrollViewProps = {
    onScroll,
    stickyHeaderIndices: stickyIndex,
    showsVerticalScrollIndicator: false,
    keyboardDismissMode: "on-drag" as const,
    style: {
      flex: 1,
      paddingTop: padding.top,
      paddingHorizontal: padding.horizontal,
      paddingBottom: scrollable ? 0 : getBottomPadding(),
    },
  };

  const commonContentContainerStyle = {
    flexGrow: 1,
    gap: 12,
    paddingBottom: getBottomPadding(true),
  };

  const safeAreaViewProps = {
    edges,
    className: twMerge("flex-1 bg-background", className),
    ...props,
  };

  if (scrollable) {
    return (
      <SafeAreaView {...safeAreaViewProps}>
        {avoidKeyboard ? (
          <KeyboardAwareScrollView
            {...scrollViewProps}
            contentContainerStyle={commonContentContainerStyle}
            bottomOffset={padding.keyboardBottomOffset}
          >
            {children}
          </KeyboardAwareScrollView>
        ) : (
          <ScrollView
            {...scrollViewProps}
            contentContainerStyle={commonContentContainerStyle}
          >
            {children}
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      {...safeAreaViewProps}
      style={{
        gap: 12,
        paddingTop: padding.top,
        paddingHorizontal: padding.horizontal,
        paddingBottom: getBottomPadding(),
      }}
    >
      {children}
    </SafeAreaView>
  );
}
