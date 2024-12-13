import { StatusBar } from "expo-status-bar";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Bottomlink from "../components/Bottomlink";

const images = {
  Kişi: "https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  Qadın:
    "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  Uşaq: "https://images.pexels.com/photos/1619801/pexels-photo-1619801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1cd",
};
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef(),
}));

const { width, height } = Dimensions.get("screen");

const Tab = React.forwardRef(({ item, onİtemPress }, ref) => {
  const navigation = useNavigation();
  const navigateToPage = () => {
    switch (item.title) {
      case "Kişi":
        navigation.navigate("Kisi");
        break;
      case "Qadın":
        navigation.navigate("Qadin");
        break;
      case "Uşaq":
        navigation.navigate("Usaq");
        break;
     
      default:
        break;
    }
  };

  return (
    <TouchableOpacity onPress={() => onİtemPress(item.key)} 

    onPressOut={() => {
      setTimeout(() => {
        navigateToPage(); // 1 saniye sonra navigateToPage fonksiyonunu çağırır
      }, 500);
    }}
    >

      <View ref={ref}>
        <Text
          style={{
            color: "white",
            fontSize: 65 / data.length,
            fontWeight: 800,
            textTransform: "uppercase",
          }}
        >
          {item.title}
        </Text>
        
      </View>
     
    </TouchableOpacity>
  );
});

const Tabs = ({ data, scrollX, onİtemPress }) => {
  const [measures, setMeasures] = React.useState([]);
  const containerRef = React.useRef();
  React.useEffect(() => {
    let m = [];
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({
            x,
            y,
            width,
            height,
          });
          if (m.length === data.length) {
            setMeasures(m);
          }
        }
      );
    });
  }, []);
  return (
    <View style={{ position: "absolute", top: 100, width }}>
      <View
        ref={containerRef}
        style={{
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {data.map((item, index) => {
          return (
            <Tab
              key={item.key}
              item={item}
              ref={item.ref}
              onİtemPress={() => {
                onİtemPress(index);
              }}
            />
          );
        })}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

const Indicator = ({ measures, scrollX }) => {
  const inputRange = data.map((_, i) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  });
  return (
    <Animated.View
      style={{
        position: "absolute",
        width: indicatorWidth,
        height: 4,
        backgroundColor: "white",
        bottom: -10,
        left: 0,
        transform: [{ translateX }],
      }}
    />
  );
};

const SearchScreen = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();
  const onİtemPress = React.useCallback((itemİndex) => {
    ref?.current?.scrollToOffset({
      offset: itemİndex * width,
    });
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StatusBar hidden />
      <Animated.FlatList
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        bounces={false}
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={{ width, height }}>
            <Image
              source={{ uri: item.image }}
              style={{ flex: 1, resizeMode: "cover" }}
            />
            <View
              style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: "rgba(0,0,0,0.3)" },
              ]}
            />
          </View>
        )}
      />

      <Tabs data={data} scrollX={scrollX} onİtemPress={onİtemPress} />
      <Bottomlink />
    </View>
  );
};

export default SearchScreen;
