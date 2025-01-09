import * as React from "react";
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Ev from "../components/Ev";

const { width, height } = Dimensions.get("screen");

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ["#A5BBFF", "#DDBEFE", "#FF63ED", "#B98EFF"];
const DATA = [
  {
    key: "3571572",
    title: "Aclass ilə üslubunu yarat, fərqini hiss et!",
    description:
      "Aclass ilə hər gün üçün mükəmməl geyim tapmaq artıq çox asandır. Aclass, zövqünüzə uyğun ən son trendleri sizin üçün seçir!",
    salam:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcIPr5NXlJz7NThMR5ZgG0VcCltLP11W3u6w&s",
  },
  {
    key: "3571747",
    title: "Aclass: Qardirobuna yeni sinif gətir!",
    description:
      "Aclass ilə qardirobunuzu yenidən kəşf edin.Hər bir parça ilə üslubunuza incəlik qatın və özünüzü hər gün xüsusi hiss edin!",
    salam:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT69KK4we-vk0F_GEw-grLX_037Vw4gVxAfHg&s",
  },
  {
    key: "3571680",
    title: "Modanı tut, Aclass ilə hər zaman dəbli ol!",
    description:
      "Aclass, modanın öncüsü olmağı təmin edir. Yenilənmiş kolleksiyalar və trendy parçalar ilə hər zaman aktuallığı qoruyun!",
    salam:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTRLYfRxvRuhlOgOEYVxrDKkeyD3ZdHuj2VQ&s",
  },
  {
    key: "3571603",
    title: "Aclass ilə hər gün yeni bir stil kəşf et!",
    description: "Gündəlik geyimlərinizi yeniləyərək fərqli üslubları sınayın. Aclass, hər gün üçün yeni və cəlbedici seçimlər təqdim edir.",
    salam:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6LmO5hKF7iyKwaYsVKQpy8X3NCQbKfzwaYA&s",
  },
];
 
const Indicatior = ({ scrollX }) => {
  return (
    <View style={{ flexDirection: "row", position: "absolute", bottom: 20 }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={`indicator_${i}`}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "white",
              opacity,
              margin: 10,
              transform: [{ scale }],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor,
        },
      ]}
    />
  );
};

const Square = ({ scrollX }) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "0deg", "35deg"],
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: "white",
        borderRadius: 86,
        position: "absolute",
        top: -height * 0.62,
        left: -height * 0.3,
        transform: [
          {
            rotate,
          },
          {
            translateX,
          },
        ],
      }}
    />
  );
};

export default function Esasgiris() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
     <StatusBar hidden />
     <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
    
      <Animated.FlatList
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={DATA}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          return (
            <View style={{ width: width, alignItems: "center", padding: 20 }}>
              <View style={{ flex: 0.7, justifyContent: "center" }}>
                <Image
                  source={{ uri: item.salam }}
                  style={{
                    width: width / 2,
                    height: width / 2,
                    resizeMode: "contain",
                  }}
                />
              </View>
              <View style={{ flex: 0.3 }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ fontWeight: "bold", color: "#fff",marginTop:10,fontSize:15 }}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <Indicatior scrollX={scrollX} />
      <View
        style={{
          flex: 0.1,
          justifyContent: "space-around",
          flexDirection: "row",
          padding: 25,
          gap: 55,
          position: "absolute",
          bottom: 60,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 0.4,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            padding: 10,
          }}

          onPress={() => navigation.navigate("Ev")}
        >
         <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Giriş</Text>

        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 0.6,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            padding: 10,
          }}

          onPress={() => navigation.navigate("Qeydiyyat")}

        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }} >Qeydiyyat</Text>

        </TouchableOpacity>


      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
