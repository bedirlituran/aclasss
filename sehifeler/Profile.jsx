import React, { useState, useEffect,useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  RefreshControl,
} from "react-native";
import { Video } from 'expo-av';
import ProfileDetails from "../components/ProfileDetails";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../store/favoritesSlice";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Profile = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const favorites = useSelector((state) => state.favorites.items);
  const navigation = useNavigation();
  const images = useSelector((state) => state.images.images);
  const productInfo = useSelector(state => state.product);

  const handleToggleFavorite = (product) => {
    const isFavorited = favorites.some((favItem) => favItem.id === product.id);
    if (isFavorited) {
      dispatch(removeFromFavorites(product));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get("http://35.159.64.205:8081/api/productItem/getAll")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
        setRefreshing(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching products:", error);
      });
  };

 

  useEffect(() => {
    fetchProducts(); 
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
  }, []);

  const Truncate = (string, number) => {
    if (!string) {
      return null;
    }
    if (string.length <= number) {
      return string;
    }
    return string.slice(0, number) + "...";
  };

  const renderMedia = (uri) => {
    const extension = uri.split('.').pop().toLowerCase();
    if (extension === 'mp4' || extension === 'mov' || extension === 'avi') {
      return (
        <Video
          source={{ uri }}
          useNativeControls
          resizeMode="contain"
          style={styles.media}
        />
      );
    } else {
      return (
        <Image
          source={{ uri }}
          style={styles.image}
          resizeMode="cover"
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileDetailsContainer}>
        <ProfileDetails />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}   refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.productContainer}>
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#fb5607" />
              <Text>Paylaşım üçün şəkil vəya video yükləyin</Text>
            </View>
          ) : (
            <View style={styles.grid}>
              {images.map((imageUri, index) => {
                const product = {
                  id: index,
                  title: "Ürün Başlığı " + (index + 1),
                  description: "Bu bir örnek açıklamadır.",
                  price: "100",
                  rating: { count: 20 },
                  image: imageUri,
                };

                return (
                  <View style={styles.card} key={index}>
                    <TouchableOpacity
                      style={styles.image}
                      onPress={() =>
                        navigation.navigate("UrunDetay", {
                          title: productInfo.category,
                          description: productInfo.description,
                          price: productInfo.price,
                          image: product.image,
                          stock: productInfo.stock,
                        })
                      }
                    >
                      {renderMedia(imageUri)}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleToggleFavorite(product)} style={styles.like}>
                      <MaterialCommunityIcons
                        name="heart-plus-outline"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>

                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle} numberOfLines={1}>
                        {Truncate(productInfo.category, 55)} 
                      </Text>
                      <Text style={styles.cardDescription} numberOfLines={2}>
                        {Truncate(productInfo.description, 55)}
                      </Text>
                      <View style={styles.cardPriceContainer}>
                        <Text style={styles.cardPrice}>{productInfo.price}{"\u20BC"} </Text>
                        <Text style={styles.cardDetail}>Stok: {productInfo.stock}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  media: {
    width: "100%",
    height: 160,
  },
  cardPriceContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    gap: Platform.OS === "ios" ? 10 : 14,
  },
  like: {
    position: "absolute",
    top: Platform.OS === "ios" ? 10 : 5,
    right: 10,
    zIndex: 9999,
    backgroundColor: Platform.OS === "ios" ? "lightblue" : "lightgreen",
    borderRadius: 20,
    padding: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: Platform.OS === "ios" ? 6 : 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: Platform.OS === "ios" ? 4 : 2,
    paddingBottom: 40,
  },
  card: {
    width: width / 2 - 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: Platform.OS === "ios" ? 20 : 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  image: {
    width: "100%",
    height: 160,
  },
  cardBody: {
    paddingTop: 10,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: Platform.OS === "ios" ? 14 : 13,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "orange",
    marginVertical: 5,
  },
  cardDetail: {
    fontSize: 12,
    color: "#333",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  scrollView: {
    padding: 10,
  },
});

export default Profile;