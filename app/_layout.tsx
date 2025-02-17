import { useEffect } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  NunitoSans_300Light,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  NunitoSans_900Black,
} from "@expo-google-fonts/nunito-sans";

import { TabButton } from "@/components/TabButton";
import { storage } from "@/stores/storage";
import useTheme from "@/stores/useTheme";
import { Colors } from "@/types/Colors";

// queryClient instance for the entire app
const client = new QueryClient();

export default function Layout() {
  const { palette, setTheme } = useTheme();
  const colorScheme = useColorScheme();

  const [loaded, error] = useFonts({
    NunitoSans_300Light,
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
    NunitoSans_900Black,
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // this hook is for setting the device's navigation bar color
  useEffect(() => {
    if (colorScheme == "dark") {
      setTheme("dark");
      NavigationBar.setBackgroundColorAsync(palette.background);
      NavigationBar.setVisibilityAsync("hidden");
    } else {
      setTheme("light");
      NavigationBar.setBackgroundColorAsync(palette.foreground);
      NavigationBar.setVisibilityAsync("hidden");
    }
  }, [colorScheme]);

  if (!loaded && !error) {
    return null;
  }

  // this line is for setting the proper value if the app is launched the first time
  if (!storage.contains("wishlists")) {
    storage.set("wishlists", JSON.stringify({ lists: [] }));
  }

  // dynamic stylesheet/theme for the entire Tabs
  const styleTheme = styles(palette);

  return (
    <QueryClientProvider client={client}>
      <Tabs style={{ flex: 1, backgroundColor: palette.background }}>
        <TabSlot />
        <TabList style={styleTheme.tabList}>
          <TabTrigger name="index" href="/" asChild>
            <TabButton icon="shoppingcart">Deals</TabButton>
          </TabTrigger>
          <TabTrigger name="search" href="/search" asChild>
            <TabButton icon="search1">Search</TabButton>
          </TabTrigger>
          <TabTrigger name="wishlist" href="/wishlist" asChild>
            <TabButton icon="hearto">Wishlist</TabButton>
          </TabTrigger>
          <TabTrigger name="game" href="/game/[id]" asChild />
        </TabList>
      </Tabs>
      <StatusBar backgroundColor={palette.background} style="auto" />
    </QueryClientProvider>
  );
}

const styles = (palette: Colors) =>
  StyleSheet.create({
    tabList: {
      borderTopLeftRadius: palette.tabColor == "#161616" ? 0 : 16,
      borderTopRightRadius: palette.tabColor == "#161616" ? 0 : 16,
      flexDirection: "row",
      gap: 16,
      backgroundColor: palette.tabColor,
      justifyContent: "space-around",
      paddingVertical: 8,
    },
  });
