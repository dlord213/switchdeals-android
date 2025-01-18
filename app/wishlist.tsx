import { storage } from "@/stores/storage";
import { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const json = storage.getString("wishlists");
  const wishlists = json ? JSON.parse(json) : "{}";

  useEffect(() => {
    console.log(wishlists);
  }, [wishlists]);

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
    </SafeAreaView>
  );
}
