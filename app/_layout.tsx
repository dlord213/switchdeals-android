import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { TabButton } from "@/components/TabButton";
import { StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  NunitoSans_300Light,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  NunitoSans_900Black,
} from "@expo-google-fonts/nunito-sans";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { storage } from "@/stores/storage";

const client = new QueryClient();

export default function Layout() {
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

  if (!loaded && !error) {
    return null;
  }

  if (!storage.contains("wishlists")) {
    storage.set("wishlists", JSON.stringify({ lists: [] }));
  }

  return (
    <QueryClientProvider client={client}>
      <Tabs>
        <TabSlot />
        <TabList style={styles.tabList}>
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
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  tabList: {
    margin: 12,
    borderRadius: 16,
    flexDirection: "row",
    gap: 16,
    backgroundColor: "#B03B48",
    justifyContent: "space-around",
    paddingVertical: 8,
  },
});
