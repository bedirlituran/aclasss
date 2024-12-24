import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Text
} from "react-native";
import MarqueeView from 'react-native-marquee-view';

const { width } = Dimensions.get("window");

const AdCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Statik resimlerin listesi
  const images = [
  
    require("../assets/reklam/colins.png"),
    require("../assets/reklam/zara.png"),
    require("../assets/reklam/papatya.png"),

  ];

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width);
    setActiveIndex(index);
  };

  return (
    <View style={{ flex: 1 }}>
    

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.adBox}>
            <Image source={image} style={styles.image} />
         
          </View>
          
        ))}
        
      </ScrollView>
      <MarqueeView 
      autoPlay={true}
      playing={true}
      speed={0.2}
	style={{
		width: '100%',
	}}>
	<View>
		<Text className="font-bold">Burada sizin reklamınız ola bilər</Text>
	</View>
</MarqueeView>
      {/* Çizgiler */}
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              { backgroundColor: index === activeIndex ? "black" : "#c4c4c4" },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  adBox: {
    width: width - 140,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    borderRadius: 10,
    padding: 10,
    shadowColor: "red",
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "contain",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  indicator: {
    width: 15,
    height: 3,
    borderRadius: 3,
    marginHorizontal: 3,
  },
});

export default AdCarousel;
