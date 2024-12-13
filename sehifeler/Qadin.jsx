import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Bottomlink from "../components/Bottomlink";
export default function Qadin() {
  const windowWidth = Dimensions.get("window").width;
  const itemWidth = windowWidth * 0.8;
  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: 10,
          left: 20,
          right: 20,
          paddingHorizontal: 5,
          paddingVertical: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          borderWidth: 0.5,
          borderRadius: 10,
          alignItems: "center",
          backgroundColor: "white",
          zIndex: 1,
        }}
      >
        <TextInput placeholder="Axtar..." />
        <FontAwesome name="search" size={20} color="green" />
      </View>
      <View
        style={{
          absolute: 1,
          top: 40,
          left: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
          margin: 20,
          borderRadius: 20,
          zIndex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: 800,
            marginBottom: 10,
            color: "black",
          }}
        >
          Qadin Kateqoriyalar
        </Text>
      </View>
      <StatusBar hidden />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        marginBottom={20}
        marginTop={20}
      >
        <View>
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              padding: 20,
              width: 290,
              height: 100,
              margin: 5,
              borderRadius: 20,
              gap: 100,
              borderWidth: 0.5,
            }}
          >
            <View style={{ flex: 1 }}>
              <Image
                source={require("../assets/qadin/cins.png")}
                resizeMode="cover"
                style={{ borderRadius: 20, width: "120%", height: "150%" }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: "black" }}>
                Jeans
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              padding: 20,
              width: 290,
              height: 100,
              margin: 5,
              borderRadius: 20,
              gap: 100,
              borderWidth: 0.5,
            }}
          >
            <View style={{ flex: 1 }}>
              <Image
                source={require("../assets/qadin/klassik.png")}
                resizeMode="cover"
                style={{ borderRadius: 20, width: "120%", height: "150%" }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: "black" }}>
                Klassik
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              padding: 20,
              width: 290,
              height: 100,
              margin: 5,
              borderRadius: 20,
              gap: 100,
              borderWidth: 0.5,
            }}
          >
            <View style={{ flex: 1 }}>
              <Image
                source={require("../assets/qadin/koynek.png")}
                resizeMode="cover"
                style={{ borderRadius: 20, width: "120%", height: "150%" }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: "black" }}>
                T-Shirt
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              padding: 20,
              width: 290,
              height: 100,
              margin: 5,
              borderRadius: 20,
              gap: 100,
              borderWidth: 0.5,
            }}
          >
            <View style={{ flex: 1 }}>
              <Image
                source={require("../assets/qadin/ayaqqabi.png")}
                resizeMode="cover"
                style={{ borderRadius: 20, width: "90%", height: "90%" }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: "800", color: "black" }}>
                Ayaqqabi
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              padding: 20,
              width: 290,
              height: 100,
              margin: 5,
              borderRadius: 20,
              gap: 100,
              borderWidth: 0.5,
            }}
          >
            <View style={{ flex: 1 }}>
              <Image
                source={require("../assets/qadin/sport.png")}
                resizeMode="cover"
                style={{ borderRadius: 20, width: "120%", height: "150%" }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: "black" }}>
                Sport
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              padding: 20,
              width: 290,
              height: 100,
              margin: 5,
              borderRadius: 20,
              gap: 100,
              borderWidth: 0.5,
            }}
          >
            <View style={{ flex: 1 }}>
              <Image
                source={require("../assets/qadin/alt.png")}
                resizeMode="cover"
                style={{ borderRadius: 20, width: "120%", height: "150%" }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: "black" }}>
                Ic Geyim
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              padding: 20,
              width: 290,
              height: 100,
              margin: 5,
              borderRadius: 20,
              gap: 100,
              borderWidth: 0.5,
            }}
          >
            <View style={{ flex: 1 }}>
              <Image
                source={require("../assets/qadin/kurtka.png")}
                resizeMode="cover"
                style={{ borderRadius: 20, width: "120%", height: "150%" }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: "black" }}>
                Kurtka
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Bottomlink />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});

