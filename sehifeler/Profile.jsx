import React, { useState, useEffect } from "react";
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
} from "react-native";
import ProfileDetails from "../components/ProfileDetails";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../store/favoritesSlice";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Profile = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const navigation = useNavigation();

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
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching products:", error);
      });
  };

  const handleImageUpload = () => {
    fetchProducts(); // Resim yükleme işlemi tamamlandığında ürünleri güncelle
  };

  useEffect(() => {
    handleImageUpload();
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

  return (
    <View style={styles.container}>
      <View style={styles.profileDetailsContainer}>
        <ProfileDetails />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
      >
        <View style={styles.productContainer}>
        

          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#fb5607" />
            </View>
          ) : (
            <View style={styles.grid}>
              {products.map((product) => {
                const isFavorited = favorites.some(
                  (favItem) => favItem.id === product.id
                );
                return (
                  <View style={styles.card} key={product.id}>
                    <TouchableOpacity
                      style={styles.image}
                      onPress={() =>
                        navigation.navigate("UrunDetay", {
                          title: product.title,
                          description: product.description,
                          price: product.price,
                          image: product.image,
                        })
                      }
                    >
                      <Image
                        style={styles.image}
                        source={{ uri: product.image }}
                        resizeMode="center"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleToggleFavorite(product)}
                      style={styles.like}
                    >
                      <MaterialCommunityIcons
                        name={isFavorited ? "heart" : "heart-plus-outline"}
                        size={24}
                        color={isFavorited ? "#fb5607" : "black"}
                      />
                    </TouchableOpacity>

                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle} numberOfLines={1}>
                        {Truncate(product.title, 55)}
                      </Text>
                      <Text style={styles.cardDescription} numberOfLines={2}>
                        {Truncate(product.description, 55)}
                      </Text>
                      <View style={styles.cardPriceContainer}>
                        <Text style={styles.cardPrice}>
                          {product.price} {"\u20BC"}{" "}
                        </Text>
                        <Text style={styles.cardDetail}>
                          Stok: {product.rating.count}
                        </Text>
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
  cardPriceContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    gap: Platform.OS === "ios" ? 10 : 14, // iOS ve Android'de farklı boşluklar
  },
  like: {
    position: "absolute",
    top: Platform.OS === "ios" ? 10 : 5, // Platforma göre pozisyon
    right: 10,
    zIndex: 9999,
    backgroundColor: Platform.OS === "ios" ? "lightblue" : "lightgreen", // Farklı renkler
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
    paddingVertical: Platform.OS === "ios" ? 6 : 8, // Platforma göre padding
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: Platform.OS === "ios" ? 4 : 2, // iOS'ta daha fazla boşluk
    paddingBottom: 40,
  },
  card: {
    width: width / 2 - 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: Platform.OS === "ios" ? 20 : 15,
    alignItems: "center",
    shadowColor: "#000", // Siyah gölge rengi
    shadowOffset: { width: 0, height: 4 }, // Gölgenin ofseti
    shadowOpacity: 0.3, // Gölgenin opaklığı
    shadowRadius: 5, // Gölgenin blur radius'u
    elevation: 6, // Android'de gölge yüksekliği
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
    fontSize: Platform.OS === "ios" ? 14 : 13, // iOS'ta daha büyük font
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
});
export default Profile;
