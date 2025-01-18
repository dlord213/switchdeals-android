import { storage } from "@/stores/storage";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { width, height } = useWindowDimensions();
  const json = storage.getString("wishlists");
  const wishlists = json ? JSON.parse(json) : "{}";

  if (wishlists.lists.length >= 1) {
    return (
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, gap: 8 }}>
        <Text
          style={{
            fontFamily: "NunitoSans_900Black",
            fontSize: 24,
            color: "#363636",
          }}
        >
          Wishlists
        </Text>
        {wishlists ? (
          <FlatList
            data={wishlists.lists}
            renderItem={(game) => (
              <Link
                href={{
                  pathname: "/game/[id]",
                  params: { id: game.item["id"] },
                }}
                asChild
              >
                <Pressable style={{ flexDirection: "column", gap: 8, flex: 1 }}>
                  <Image
                    src={game.item["image"]}
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
                      {game.item["title"]}
                    </Text>
                  </View>
                </Pressable>
              </Link>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={{ gap: 12 }}
            columnWrapperStyle={{ gap: 16 }}
          />
        ) : (
          <ActivityIndicator color="#B03B48" size={"large"} />
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        gap: 8,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AntDesign name="meh" size={width / 8} color="#484848" />
      <Text style={{ fontFamily: "NunitoSans_700Bold", color: "#363636" }}>No wishlists...</Text>
    </SafeAreaView>
  );
}
