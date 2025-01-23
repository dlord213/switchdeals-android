import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";

import ChipButton from "@/components/ChipButton";
import useTheme from "@/stores/useTheme";
import { AntDesign } from "@expo/vector-icons";
import { storage } from "@/stores/storage";

export default function Page() {
  const { id } = useLocalSearchParams();
  const { width, height } = useWindowDimensions();
  const [wishlists, setWishlists] = useState({ lists: [] }); // this state is for rendering it on the component and is based on the MMKV "wishlists" key storage
  const [isWishlisted, setIsWishlisted] = useState(false); // this state is to check whether it's wishlisted or not and for rendering the appropriate icon
  const { palette } = useTheme();

  // a query hook that fetches game's data
  const { data } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `https://switchdeals.vercel.app/api/game_details?url=${id}&region=us`
        );

        return data;
      } catch (err) {
        return err;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  const [index, setIndex] = useState(0); // this state is for displaying pages based on its index
  const pages = [
    <>
      <Text
        style={{ fontFamily: "NunitoSans_400Regular", color: palette.text }}
      >
        {data?.gameDetails["description"] || ""}
      </Text>
    </>,
    <>
      {data?.gameDetails["images"].map((img: string) => (
        <Image
          src={img}
          key={img}
          style={{
            width: "auto",
            height: height / 4,
            objectFit: "contain",
            borderRadius: 8,
          }}
        />
      ))}
    </>,
    <>
      <View
        style={{
          flex: 1,
          flexWrap: "wrap",
          gap: 8,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {data?.gameDetails["recommendations"].map((game, idx) => (
          <Pressable
            key={idx}
            onPress={() =>
              router.push({
                pathname: "/game/[id]",
                params: { id: game.href },
              })
            }
            style={{
              flexDirection: "column",
              width: width / 2.2,
              gap: 4,
            }}
          >
            <Image
              src={game.imageUrl}
              style={{
                width: "auto",
                height: height / 5,
                borderRadius: 16,
              }}
            />
            <View style={{ flexDirection: "column", padding: 4, flex: 1 }}>
              <Text
                style={{
                  fontFamily: "NunitoSans_400Regular",
                  color: palette.text,
                  flexShrink: 1,
                }}
              >
                {game.title}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </>,
  ]; // here lies the components and will return the appropriate component based on "index" state above

  // this hook is to check if the game is wishlisted or not
  useEffect(() => {
    if (!storage.contains("wishlists")) {
      storage.set("wishlists", JSON.stringify({ lists: [] }));
    }

    const json = storage.getString("wishlists");
    const parsedWishlists = json ? JSON.parse(json) : { lists: [] };
    setWishlists(parsedWishlists);
  }, []);

  // this function is to toggle wishlist
  const toggleWishlist = async () => {
    let updatedWishlists = { ...wishlists };

    if (isWishlisted) {
      updatedWishlists.lists = updatedWishlists.lists.filter(
        (item) => item.id !== id
      );
    } else {
      updatedWishlists.lists.push({
        image: data.gameDetails["image"],
        title: data.gameDetails["title"],
        id: id,
      });
    }

    storage.set("wishlists", JSON.stringify(updatedWishlists));
    setWishlists(updatedWishlists);
    setIsWishlisted(!isWishlisted);
  };

  useEffect(() => {
    if (id) {
      const itemInWishlist = wishlists.lists.some((item) => item.id === id);
      setIsWishlisted(itemInWishlist);
    }
  }, [id]);

  if (data) {
    return (
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 12,
          gap: 12,
          backgroundColor: palette.background,
        }}
      >
        <Image
          src={data.gameDetails["image"]}
          style={{ width: "auto", height: height / 4, borderRadius: 8 }}
        />
        <View>
          <Text
            style={{
              fontFamily: "NunitoSans_900Black",
              fontSize: width / 14,
              color: palette.text,
            }}
          >
            {data.gameDetails["title"]}
          </Text>
          {data.gameDetails["Publisher"][0]["genreName"] ? (
            <Text
              style={{
                fontFamily: "NunitoSans_400Regular",
                fontSize: width / 24,
                color: palette.text,
              }}
            >
              {data.gameDetails["Publisher"][0]["genreName"]}
            </Text>
          ) : null}
          {data.gameDetails["MSRP"] && data.gameDetails["discountedPrice"] ? (
            <View style={{ flexDirection: "row", gap: 8, marginVertical: 4 }}>
              <Text
                style={{
                  fontFamily: "NunitoSans_700Bold",
                  fontSize: width / 24,
                  color: palette.text,
                }}
              >
                {data.gameDetails["discountedPrice"]}
              </Text>
              <Text
                style={{
                  fontFamily: "NunitoSans_400Regular",
                  fontSize: width / 24,
                  color: "#aaaaaa",
                  textDecorationLine: "line-through",
                }}
              >
                {data.gameDetails["MSRP"]}
              </Text>
            </View>
          ) : null}
          {!data.gameDetails["MSRP"] ? (
            <View style={{ flexDirection: "row", gap: 8, marginVertical: 4 }}>
              <Text
                style={{
                  fontFamily: "NunitoSans_700Bold",
                  fontSize: width / 24,
                  color: "#363636",
                }}
              >
                {data.gameDetails["discountedPrice"]}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <AntDesign
            name={isWishlisted ? "heart" : "hearto"}
            size={width / 15}
            color={palette.text}
            onPress={toggleWishlist}
          />
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={{ flexDirection: "row", gap: 8 }}
        >
          <ChipButton
            label="About"
            isActive={index === 0}
            onPress={() => setIndex(0)}
          />
          <ChipButton
            label="Screenshots"
            isActive={index === 1}
            onPress={() => setIndex(1)}
          />
          <ChipButton
            label="Recommendations"
            isActive={index === 2}
            onPress={() => setIndex(2)}
          />
        </ScrollView>
        {pages[index]}
      </ScrollView>
    );
  }

  if (!data) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 16,
          gap: 8,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: palette.background,
        }}
      >
        <ActivityIndicator color={palette.text} size={48} />
      </SafeAreaView>
    );
  }
}
