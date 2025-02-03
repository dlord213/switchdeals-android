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
import { useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import ChipButton from "@/components/ChipButton";
import useTheme from "@/stores/useTheme";
import { AntDesign } from "@expo/vector-icons";
import useRegion from "@/stores/useRegion";
import { Picker } from "@react-native-picker/picker";
import countries from "@/types/Countries";

export default function Index() {
  const { width, height } = useWindowDimensions();
  const { palette } = useTheme();
  const pickerRef = useRef();

  const [type, setType] = useState(""); // this is for filtering deals by either game or bundle
  const { region, setRegion } = useRegion();

  // the infinite query for fetching data in the vercel API I made
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["games", type, region],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `https://switchdeals.vercel.app/api/games?region=${region}&page=${pageParam}&type=${type}`
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
          name="earth"
          size={20}
          color={palette.text}
          onPress={() => {
            pickerRef?.current.focus();
          }}
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
      <Picker
        ref={pickerRef}
        selectedValue={region}
        onValueChange={(itemValue, itemIndex) => {
          setRegion(itemValue);
        }}
        style={{ display: "none" }}
      >
        {Object.entries(countries).map(([countryName, data]) => (
          <Picker.Item
            label={`${countryName} (${data.currency})`}
            key={data.value}
            value={data.value}
          />
        ))}
      </Picker>
    </SafeAreaView>
  );
}
