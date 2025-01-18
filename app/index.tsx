import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import ChipButton from "@/components/ChipButton";
import useTheme from "@/stores/useTheme";

export default function Index() {
  const { width, height } = useWindowDimensions();
  const { theme, palette, setTheme } = useTheme();

  const [type, setType] = useState("");

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["games", type],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `https://switchdeals.vercel.app/api/games?page=${pageParam}&type=${type}`
      );
      console.log(
        `https://switchdeals.vercel.app/api/games?page=${pageParam}&type=${type}`
      );
      return { ...data, next: pageParam + 1 };
    },
    getNextPageParam: (lastPage) => lastPage.next,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 16,
        gap: 8,
        backgroundColor: palette.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "NunitoSans_900Black",
            fontSize: 24,
            color: palette.text,
          }}
        >
          Discounts/Deals
        </Text>
        <AntDesign
          name="bulb1"
          size={20}
          onPress={() => {
            if (theme == "light") {
              setTheme("dark");
            }
            if (theme == "dark") {
              setTheme("light");
            }
          }}
          color={palette.foreground}
        />
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <ChipButton label="Game" isActive={!type} onPress={() => setType("")} />
        <ChipButton
          label="Bundle"
          isActive={type === "filter[type]=bundle"}
          onPress={() => setType("filter[type]=bundle")}
        />
      </View>
      {data ? (
        <FlatList
          data={data.pages.flatMap((page) => page.games)}
          renderItem={(game) => (
            <Link
              href={{
                pathname: "/game/[id]",
                params: { id: game.item["link"] },
              }}
              asChild
            >
              <Pressable style={{ flexDirection: "column", gap: 8, flex: 1 }}>
                <Image
                  src={game.item["imgSrc"]}
                  style={{
                    width: width / 5,
                    height: height / 5,
                    aspectRatio: 1 / 1,
                    borderRadius: 8,
                  }}
                />
                <View style={{ flexDirection: "column", gap: 3 }}>
                  <Text
                    style={{
                      fontFamily: "NunitoSans_400Regular",
                      flexShrink: 1,
                      flexWrap: "wrap",
                      color: palette.text,
                    }}
                  >
                    {game.item["productTitle"]}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "NunitoSans_700Bold",
                        flexShrink: 1,
                        color: palette.text,
                      }}
                    >
                      {game.item["price"]}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "NunitoSans_400Regular",
                        textDecorationLine: "line-through",
                        fontSize: 12,
                        color: "#ababab",
                        flexShrink: 1,
                      }}
                    >
                      {game.item["originalPrice"]}
                    </Text>
                  </View>
                </View>
              </Pressable>
            </Link>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={{ gap: 12 }}
          columnWrapperStyle={{ gap: 16 }}
          onEndReached={() => {
            fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
        />
      ) : (
        <SafeAreaView
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={palette.text} size={36} />
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}
