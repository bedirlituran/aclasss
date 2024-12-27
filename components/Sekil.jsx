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
import { useNavigation } from "@react-navigation/native";
import SkeletonLoader from "../components/SkeletonLoader";
import StarAnmimation from "./StarAnmimation";
import BasketAnimation from "./BasketAnimation";
import WhatsAppButton from "./WhatsAppButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import Reklam from "../components/Reklam";
import Header from "../components/Header";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { addToFavorites, removeFromFavorites } from "../store/favoritesSlice";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const { height, width } = Dimensions.get("window");

const Sekil = () => {
  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  const loadMore = async () => {
    if (isFetchingMore || page >= maxPage) return; // maxPage sınırını kontrol edin
    setIsFetchingMore(true);
    try {
      setPage((prevPage) => prevPage + 1);
    } finally {
      setIsFetchingMore(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`https://fakestoreapi.com/products`);
      const shuffledData = res.data.sort(() => Math.random() - 0.5);
      setData((prevData) => [...prevData, ...shuffledData]);
    } catch (error) {
      console.error("API isteği sırasında hata:", error);
      Alert.alert("Hata", "Veriler yüklenirken bir sorun oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  if (isLoading) {
    return (
      <View style={styles.skeletonContainer}>
        {[...Array(3)].map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      {/* VirtualizedList kullanımı */}
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
            onAddToCart={() => dispatch(addToCart(item))}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        ListHeaderComponent={<Reklam />}
      />
    </View>
  );
};

const Card = React.memo(({ item, onDetailPress, onAddToCart }) => {
  const [isShared, setIsShared] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const longText = item.category;
  const maxLength = 18;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const isFavorited = favorites.some((favItem) => favItem.id === item.id);

  const handleToggleFavorite = (product) => {
    if (isFavorited) {
      dispatch(removeFromFavorites(product));
    } else {
      dispatch(addToFavorites(product));
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

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <View className="flex items-center justify-center">
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <Text className="font-semibold">
              {truncateText(longText, maxLength)}
            </Text>
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
          <Image
            source={{ uri: item.image || "https://via.placeholder.com/150" }}
            style={styles.image}
          />
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.footer}>
            <Text style={styles.price}>{item.price} ₼</Text>

            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={onAddToCart}
            >
              <Text style={styles.addToCartText}>Səbətə yüklə</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.stock}>Stokda: Var</Text>
        </View>

        <View style={styles.animations}>
          <TouchableOpacity onPress={() => handleToggleFavorite(item)}>
            <MaterialCommunityIcons
              name={isFavorited ? "heart" : "heart-plus-outline"}
              size={24}
              color={isFavorited ? "#fb5607" : "black"}
            />
          </TouchableOpacity>
          <StarAnmimation />
          <BasketAnimation />
          <TouchableOpacity onPress={handleShare} style={{ padding: 10 }}>
            <Animated.View style={{ transform: [{ rotate: shareRotate }] }}>
              <Ionicons name="share-social-outline" size={30} color="black" />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

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
    width: "95%",
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    overflow: "hidden",
    marginTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    margingBottom: 10,
    backgroundColor: "#f8f9f9",
    padding: 10,
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
    marginTop: 20,
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
    backgroundColor: "#f1f1f1",
    alignItems: "center",
  },
  bottomLinkContainer: {
    position: "absolute",
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
  ion: {
    marginRight: 5,
  },
});

export default Sekil;