import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Alert,
  Share,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SkeletonLoader from "../components/SkeletonLoader";
import StarAnmimation from "./StarAnmimation";
import BasketAnimation from "./BasketAnimation";
import WhatsAppButton from "./WhatsAppButton";
import { useFavorites } from "../FavoriteContext";
import Ionicons from "@expo/vector-icons/Ionicons"; // Kalp ikonu için
import Reklam from "../components/Reklam";
import Header from "../components/Header";


const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

const Sekil = () => {
  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0); // Scroll pozisyonunu takip eden state
  const [isFirstClick, setIsFirstClick] = useState(false); // İlk tıklama durumu
  const navigation = useNavigation();
  const scrollViewRef = useRef(null); // FlatList referansı
  const [page, setPage] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const loadMore = async () => {
    if (isFetchingMore) return;
    setIsFetchingMore(true);
    try {
      setPage((prevPage) => prevPage + 1);
      await fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingMore(false);
    }
  };



  const handleScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    setScrollY(contentOffsetY);
    if (contentOffsetY === 0) {
      setIsFirstClick(true);
    }
  };

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  const handleHomeButtonClick = () => {
    if (isFirstClick) {
      scrollToTop();
      setIsFirstClick(false);
    } else {
      fetchData();
      setIsFirstClick(true); 
    }
  };

  if (isLoading) {
    return (
      <View style={styles.skeletonContainer}>
        {[...Array(3)].map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </View>
    );
  }

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // const res = await fetch(`http://192.168.1.72:8080/api/productItem/getAll?page=0&size=10`);
      const res = await fetch(`https://api.escuelajs.co/api/v1/products`); 
      const data = await res.json();
      setData((prevData) => [...prevData, ...data]);
      console.log("API'den gelen veri:", data[0]); // API yanıtını burada konsola yazdırın
    }catch (error) {
      console.error("API isteği sırasında hata:", error);
      Alert.alert("Hata", "Veriler yüklenirken bir sorun oluştu.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [Data]);


  return (
    <View style={styles.container}>
      <Header />

      <FlatList
        ref={scrollViewRef}
        data={Data}
        renderItem={({ item }) => (
          <Card
            item={item}
            onDetailPress={() =>
              navigation.navigate("UrunDetay", {
                image: item.image,
                title: item.title,
                description: item.description,
                price: item.price,
              })
            }
          />
        )}
        keyExtractor={(item) => item.id} 
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={<Reklam />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />

      {/* BottomLink kısmı */}
      <View style={styles.bottomLinkContainer}>
        <TouchableOpacity onPress={handleHomeButtonClick}>
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Card = ({ item, onDetailPress }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [isShared, setIsShared] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const handleFavoriteToggle = () => {
    if (isFavorite(item)) {
      removeFromFavorites(item);
    } else {
      addToFavorites(item);
    }
  };

  const shareRotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const handleShare = () => {
    setIsShared(!isShared);
    Animated.timing(animation, {
      toValue: isShared ? 0 : 1,
      duration: 400,
      easing: Easing.elastic(1.2),
      useNativeDriver: true,
    }).start();

    Share.share({
      message: `Ürün: ${item.title}\nFiyat: ${item.price} ₼`,
    }).catch((error) => Alert.alert("Paylaşım Hatası", error.message));
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={{  uri: item.images[0] }} style={styles.avatar} />
          <Text className="font-semibold">Aclass</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.ion}>
            <Ionicons name="navigate-circle" size={35} color="#54342b" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.whatsAppButton}>
            <WhatsAppButton />
          </TouchableOpacity>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followText}>Izlə</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={onDetailPress}>
        {/* <Image source={{ uri: 'data:image/jpeg;base64,'+item.images[0] }} style={styles.image} /> */}
        <Image source={{ uri: item.images[0] }} style={styles.image} />

      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.title}> {item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{item.price} ₼</Text>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Səbətə yüklə</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.stock}>Stokda: Var</Text>
      </View>

      <View style={styles.animations}>
        <TouchableOpacity
          onPress={handleFavoriteToggle}
          className="flex items-center justify-center"
        >
          <Ionicons
            name={isFavorite(item) ? "heart" : "heart-outline"}
            size={30}
            color={isFavorite(item) ? "red" : "black"}
          />
        </TouchableOpacity>
        <StarAnmimation />
        <BasketAnimation />
        <TouchableOpacity onPress={handleShare} style={{ padding: 10 }}>
          <Animated.View style={{ transform: [{ rotate: shareRotate }] }}>
            <Feather
              name={isShared ? "share" : "share-2"}
              size={24}
              color="black"
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  skeletonContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  card: {
    width: "100%",
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    overflow: "hidden",
    marginTop: 20, // Daha uygun bir başlangıç noktası
    paddingBottom: 20, // Kartın alt kısmına padding ekledim
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f8f9f9",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 15,
    marginRight: 10,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  followButton: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 8,
  },
  followText: {
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: height * 0.3,
    resizeMode: "contain",
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
  },
  stock: {
    marginTop: 10,
    fontSize: 14,
    color: "green",
  },
  animations: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#f1f1f1",
  },
  bottomLinkContainer: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: [{ translateX: -width * 0.5 }],
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00f",
  },
});

export default Sekil;
