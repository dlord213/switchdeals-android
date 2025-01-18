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
  const chipViewStyle = useAnimatedStyle(() => ({
    backgroundColor: isActive
      ? withTiming("#B03B48", { duration: 500 })
      : withTiming("white"),
    borderWidth: 1,
    borderColor: "#B03B48",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  }));

  const chipTextStyle = useAnimatedStyle(() => ({
    color: isActive ? withTiming("white") : withTiming("#B03B48"),
    fontFamily: "NunitoSans_400Regular",
  }));

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={chipViewStyle}>
        <Animated.Text style={chipTextStyle}>{label}</Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

export default ChipButton;
