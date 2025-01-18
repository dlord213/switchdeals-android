import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "expo-router";

export default function Page() {
  const [query, setQuery] = useState("");
  const { width, height } = useWindowDimensions();

  const { data, refetch } = useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `https://switchdeals.vercel.app/api/search?query=${query}&region=us`
        );

        return data;
      } catch (err) {
        return err;
      }
    },
    enabled: false,
    staleTime: 1000 * 60 * 10,
  });

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, gap: 8 }}>
      <View style={{ position: "relative", justifyContent: "center" }}>
        <AntDesign
          name="search1"
          size={24}
          color="#484848"
          style={{ position: "absolute", zIndex: 10, left: 16 }}
        />
        <TextInput
          style={{
            borderColor: "#fefefe",
            borderWidth: 1,
            backgroundColor: "#f2f2f2",
            padding: 16,
            fontFamily: "NunitoSans_400Regular",
            borderRadius: 16,
            paddingLeft: 48,
          }}
          numberOfLines={1}
          selectionColor="#B03B48"
          enterKeyHint="search"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => refetch()}
        />
      </View>
      {data ? (
        <FlatList
          data={data.games}
          renderItem={(game) => {
            if (game.item["imgSrc"]) {
              return (
                <Link
                  href={{
                    pathname: "/game/[id]",
                    params: { id: game.item["link"] },
                  }}
                  asChild
                >
                  <Pressable
                    style={{ flexDirection: "column", gap: 8, flex: 1 }}
                  >
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
              );
            }
            return null;
          }}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={{ gap: 12 }}
          columnWrapperStyle={{ gap: 16 }}
        />
      ) : (
        <View style={{ flex: 1, marginVertical: 8 }}>
          <Text
            style={{
              fontFamily: "NunitoSans_700Bold",
              fontSize: 20,
              color: "#484848",
            }}
          >
            Search some games...
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
