import { storage } from "@/stores/storage";
import useTheme from "@/stores/useTheme";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
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
  const { theme, palette } = useTheme();
  const { width, height } = useWindowDimensions();
  const json = storage.getString("wishlists");
  const wishlists = json ? JSON.parse(json) : "{}";

  if (wishlists.lists.length >= 1) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          padding: 16,
          gap: 8,
          backgroundColor: palette.background,
        }}
      >
        <Text
          style={{
            fontFamily: "NunitoSans_900Black",
            fontSize: 24,
            color: palette.text,
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
                        color: palette.text,
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
      <AntDesign name="meh" size={width / 8} color={palette.text} />
      <Text style={{ fontFamily: "NunitoSans_700Bold", color: palette.text }}>
        No wishlists...
      </Text>
    </SafeAreaView>
  );
}
