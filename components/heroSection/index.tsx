import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";

interface HeroSectionProps {
  isUnterkategorie: boolean;
  searchQuery?: string;
  title?: string;
  subTitle?: string;
  isDynamicPage?: boolean;
  setShowHeroSection?: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
}

const HeroSection = ({
  isUnterkategorie,
  title,
  subTitle,
  isDynamicPage,
  setShowHeroSection,
  setSearchQuery,
  searchQuery,
}: HeroSectionProps) => {
  return (
    <View style={{ padding: 20 }}>
      {!isUnterkategorie ? (
        isDynamicPage ? (
          <View
            style={{
              marginBottom: 10,
              display: "flex",
              flexDirection: "row",
              position: "relative",
            }}
          >
            <View>
              <Image
                source={require("@/assets/images/info.png")}
                style={{ alignSelf: "center" }}
              />
            </View>
            <View style={{ marginLeft: 10, maxWidth: "70%" }}>
              <Text style={{ fontWeight: "400", fontSize: 14, lineHeight: 17 }}>
                Hier soll ein bis zu 5 Zeilen langer Text stehen, der wichtige
                Informationen zu dem gewählten Thema gibt und anzeigt was zu
                beachten ist.
              </Text>
            </View>
            {setShowHeroSection && (
              <TouchableOpacity
                style={{ position: "absolute", right: 0, bottom: 0 }}
                onPress={() => setShowHeroSection(false)}
              >
                <Entypo name="cross" size={16} color="#3B3B3B" />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <>
            <View style={{ marginBottom: 10, maxWidth: "70%" }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "700",
                  lineHeight: 36,
                  color: "#C2DE4C",
                  letterSpacing: 1,
                }}
              >
                ERSTE HILFE BEIM HUND
              </Text>
            </View>
            <View style={{ marginBottom: 40 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: 14,
                  color: "#666",
                }}
              >
                Maßnahmen Symptome und wichtiges Notfallwissen immer
                griffbereit.
              </Text>
            </View>
          </>
        )
      ) : (
        <View style={{ position: "relative", height: 130 }}>
          {title && (
            <Text
              style={{
                fontFamily: "Arkipelago",
                fontWeight: "400",
                fontSize: 50,
                lineHeight: 90,
                textAlign: "center",
                color: "#C2DE4C",
              }}
            >
              {title}
            </Text>
          )}
          {subTitle && (
            <Text
              style={{
                fontSize: 25,
                fontWeight: "500",
                lineHeight: 20,
                textAlign: "center",
                position: "absolute",
                top: "57%",
                left: 0,
                right: 0,
                paddingTop: 5,
              }}
            >
              {subTitle}
            </Text>
          )}
        </View>
      )}

      {!isDynamicPage && (
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 9,
            borderWidth: 1,
            borderColor: "#3B3B3B",
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 2,
            height: 40,
          }}
        >
          <Ionicons name="search" size={22} color="#3B3B3B" />
          <TextInput
            placeholder="Wonach suchst du?"
            style={{
              fontSize: 16,
              fontWeight: "300",
              padding: 8,
              flex: 1,
            }}
            onChangeText={(text: string) =>
              setSearchQuery && setSearchQuery(text)
            }
            value={searchQuery}
            placeholderTextColor="#3B3B3B"
          />
        </View>
      )}
    </View>
  );
};

export default HeroSection;
