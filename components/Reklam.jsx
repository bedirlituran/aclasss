import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Text
} from "react-native";
import MarqueeView from 'react-native-marquee-view';

const { width, height } = Dimensions.get("window");

const AdCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  // Statik resimlerin listesi
  const images = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/640px-Zara_Logo.svg.png',
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsbchtWf8OPedGKTaEtcXQVCt_0PGXNuvTlw&s",
    "https://img.utdstc.com/icon/73c/f7b/73cf7bce3f4857a5967fdf4bb41773d6a510b618b8b5daccd48503e8fcc79110:200",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGumcmyIIGvR7Guex7NjZSs8AljQ4W7h6arg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5jyro0BfHS97NO9dCUN7WLTXoptIkecas2g&s"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex === images.length - 1) {
        setActiveIndex(0);
        scrollViewRef.current.scrollTo({ x: 0, animated: true });
      } else {
        setActiveIndex(prevIndex => prevIndex + 1);
        scrollViewRef.current.scrollTo({ x: (activeIndex + 1) * (width - 200), animated: true });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (width - 200));
    setActiveIndex(index);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        contentInset={{ left: width / 4, right: width / 4 }}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.adBox}>
            <Image source={{uri:image}} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      {/* <MarqueeView 
      autoPlay={true}
      playing={true}
      speed={0.1}
	style={{
		width: '100%',
	}}>
	<View>
		<Text className="font-bold">Burada sizin reklamınız ola bilər</Text>
	</View>
</MarqueeView> */}
      {/* Çizgiler */}
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              { backgroundColor: index === activeIndex ? "#fb5607" : "#c4c4c4" },
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
    backgroundColor: "#fff",
  
  },

  adBox: {
    width: width - 200,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 35,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 7,
    overflow: "hidden",
    borderWidth:2,
    borderColor: "lightgrey",
  },
  image: {
    height:height,
    width: width - 160,
    resizeMode: "center",
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
