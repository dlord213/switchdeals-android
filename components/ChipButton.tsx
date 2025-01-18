import useTheme from "@/stores/useTheme";
import React from "react";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const ChipButton = ({
  label,
  isActive,
  onPress,
}: {
  label: string;
  isActive: boolean;
  onPress: () => void;
}) => {
  const { theme } = useTheme();

  const darkThemeViewStyle = useAnimatedStyle(() => ({
    backgroundColor: isActive
      ? withTiming("#363636", { duration: 500 })
      : withTiming("#161616"),
    borderWidth: 1,
    borderColor: "#fafafa",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  }));

  const chipLightViewStyle = useAnimatedStyle(() => ({
    backgroundColor: isActive
      ? withTiming("#B03B48", { duration: 500 })
      : withTiming("white"),
    borderWidth: 1,
    borderColor: "#B03B48",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  }));

  const chipLightTextStyle = useAnimatedStyle(() => ({
    color: isActive ? withTiming("white") : withTiming("#B03B48"),
    fontFamily: "NunitoSans_400Regular",
  }));

  const chipDarkTextStyle = useAnimatedStyle(() => ({
    color: isActive ? withTiming("white") : withTiming("white"),
    fontFamily: "NunitoSans_400Regular",
  }));

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={[theme == "light" ? chipLightViewStyle : darkThemeViewStyle]}
      >
        <Animated.Text
          style={[theme == "light" ? chipLightTextStyle : chipDarkTextStyle]}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

export default ChipButton;
