import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TextInput,
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
  const [search, setSearch] = useState("");
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

  const searchProduct = products.filter((product) => {
    return Object.keys(product).some((key) =>
      product[key]
        .toString()
        .toLowerCase()
        .includes(search.toString().toLowerCase())
    );
  });

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
          <TextInput
            style={styles.input}
            placeholder="Axtar..."
            onChangeText={(text) => setSearch(text)}
            value={search}
          />

          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#fb5607" />
            </View>
          ) : (
            <View style={styles.grid}>
              {searchProduct.map((product) => {
                const isFavorited = favorites.some(
                  (favItem) => favItem.id === product.id
                );
                return (
                  <View style={styles.card} key={product.id}>
      <TouchableOpacity 
  style={styles.image} 
  onPress={() => navigation.navigate('UrunDetay', {
    title: product.title,
    description: product.description,
    price: product.price,
    image: product.image
  })}
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
    gap: Platform.OS === "ios" ? 8 : 12, // iOS ve Android'de farklı boşluklar
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
    justifyContent: "space-between",
    paddingHorizontal: Platform.OS === "ios" ? 4 : 2, // iOS'ta daha fazla boşluk
    paddingBottom: 40,
  },
  card: {
    width: width / 2 - 20,
    backgroundColor: "#f4f3ee",
    borderRadius: 8,
    marginBottom: Platform.OS === "ios" ? 20 : 15, // iOS'ta daha fazla margin
    alignItems: "center",
    shadowColor: Platform.OS === "ios" ? "#000" : "transparent", // iOS'ta gölge
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === "ios" ? 0.1 : 0, // Android'de gölge yok
    elevation: Platform.OS === "android" ? 3 : 0, // Android'de elevation
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
