import useTheme from "@/stores/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TabTriggerSlotProps } from "expo-router/ui";
import { ComponentProps, Ref, forwardRef } from "react";
import { Text, Pressable, View } from "react-native";
import Animated, {
  withTiming,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

// component props for the Icon used in the TabButton
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
    const { theme } = useTheme();

    // animated view stylesheet for light theme
    const lightAnimatedView = useAnimatedStyle(() => ({
      backgroundColor: isFocused
        ? withTiming("#fafafa")
        : withTiming("#B03B48"),
      paddingHorizontal: isFocused ? withSpring(30) : withSpring(8),
      paddingVertical: 2,
    }));

    // animated view stylesheet for dark theme
    const darkAnimatedView = useAnimatedStyle(() => ({
      backgroundColor: isFocused
        ? withTiming("#242424")
        : withTiming("#161616"),
      paddingHorizontal: isFocused ? withSpring(30) : withSpring(8),
      paddingVertical: 2,
    }));

    // dynamic text colors for the component
    const textTheme =
      theme == "light"
        ? isFocused
          ? { color: "#B03B48" }
          : { color: "#fbfbfb" }
        : isFocused
        ? { color: "#fafafa" }
        : { color: "#484848" };

    // dynamic icon colors for the component
    const iconTheme =
      theme == "light"
        ? isFocused
          ? "#B03B48"
          : "#fbfbfb"
        : isFocused
        ? "#fafafa"
        : "#484848";

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
            theme == "light" ? lightAnimatedView : darkAnimatedView,
          ]}
        >
          <AntDesign name={icon} size={24} color={iconTheme} />
          <Text
            style={[
              { fontSize: 12, fontFamily: "NunitoSans_700Bold" },
              textTheme,
            ]}
          >
            {children}
          </Text>
        </Animated.View>
      </Pressable>
    );
  }
);
