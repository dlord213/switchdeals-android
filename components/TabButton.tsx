import AntDesign from "@expo/vector-icons/AntDesign";
import { TabTriggerSlotProps } from "expo-router/ui";
import { ComponentProps, Ref, forwardRef, useEffect } from "react";
import { Text, Pressable, View } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
} from "react-native-reanimated";

type Icon = ComponentProps<typeof AntDesign>["name"];

export const TabButton = forwardRef(
  (
    {
      icon,
      children,
      isFocused,
      ...props
    }: TabTriggerSlotProps & { icon?: Icon },
    ref: Ref<View>
  ) => {
    const animatedView = useAnimatedStyle(() => ({
      backgroundColor: isFocused
        ? withTiming("#fafafa")
        : withTiming("#B03B48"),
      paddingHorizontal: isFocused ? withSpring(30) : withSpring(8),
      paddingVertical: 2,
    }));

    return (
      <Pressable ref={ref} {...props}>
        <Animated.View
          style={[
            {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
              borderRadius: 16,
            },
            animatedView,
          ]}
        >
          <AntDesign
            name={icon}
            size={24}
            color={isFocused ? "#B03B48" : "#fbfbfb"}
          />
          <Text
            style={[
              { fontSize: 12, fontFamily: "NunitoSans_700Bold" },
              isFocused ? { color: "#B03B48" } : { color: "#fbfbfb" },
            ]}
          >
            {children}
          </Text>
        </Animated.View>
      </Pressable>
    );
  }
);
