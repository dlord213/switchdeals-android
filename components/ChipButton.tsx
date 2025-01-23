import useTheme from "@/stores/useTheme";
import React from "react";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// props interface for the button
interface ChipButtonInterface {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const ChipButton = ({ label, isActive, onPress }: ChipButtonInterface) => {
  const { theme } = useTheme();

  // animated view stylesheet for dark system theme
  const chipDarkViewStyle = useAnimatedStyle(() => ({
    backgroundColor: isActive
      ? withTiming("#363636", { duration: 500 })
      : withTiming("#161616"),
    borderWidth: 1,
    borderColor: "#fafafa",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  }));

  // animated view stylesheet for light system theme
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

  // animated text stylesheet for light system theme
  const chipLightTextStyle = useAnimatedStyle(() => ({
    color: isActive ? withTiming("white") : withTiming("#B03B48"),
    fontFamily: "NunitoSans_400Regular",
  }));

  // animated text stylesheet for dark system theme
  const chipDarkTextStyle = useAnimatedStyle(() => ({
    color: isActive ? withTiming("white") : withTiming("white"),
    fontFamily: "NunitoSans_400Regular",
  }));

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={[theme == "light" ? chipLightViewStyle : chipDarkViewStyle]}
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
