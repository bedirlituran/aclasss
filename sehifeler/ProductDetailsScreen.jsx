import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../store/favoritesSlice";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { BlurView } from "expo-blur";
import axios from "axios";

const { width } = Dimensions.get("window");

const ProductDetailsScreen = ({ route }) => {
  const { categoryId, subCategory, categoryTitle } = route.params;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://35.159.64.205:8081/api/productItem/getAll"
        );

        // Filter products by categoryId and subCategory
        const filtered = response.data.filter(
          (product) =>
            product.categoryId === categoryId &&
            product.subCategory === subCategory
        );

        setProducts(filtered);
        setFilteredProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId, subCategory]);

  useEffect(() => {
    if (search === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => {
        return Object.keys(product).some((key) =>
          product[key]?.toString().toLowerCase().includes(search.toLowerCase())
        );
      });
      setFilteredProducts(filtered);
    }
  }, [search, products]);

  const handleToggleFavorite = (product) => {
    const isFavorited = favorites.some((favItem) => favItem.id === product.id);
    if (isFavorited) {
      dispatch(removeFromFavorites(product));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const Truncate = (string, number) => {
    if (!string) return "";
    if (string.length <= number) return string;
    return string.slice(0, number) + "...";
  };

  if (loading) {
    return (
      <View style={styles.loadingOverlay}>
        <BlurView intensity={30} style={styles.blurContainer} tint="light" />
        <LottieView
          source={require("../assets/animation.json")}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {categoryTitle} - {subCategory}
      </Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
      </View>

      {filteredProducts.length === 0 ? (
        <View style={styles.noProductsContainer}>
          <Text style={styles.noProductsText}>No products found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productsContainer}
          renderItem={({ item }) => {
            const isFavorited = favorites.some(
              (favItem) => favItem.id === item.id
            );
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate("UrunDetay", {
                    id: item.id,
                    title: item.brand,
                    description: item.description,
                    price: item.sellingPrice,
                    image: item.fileString,
                  })
                }
              >
                <Image
                  source={{ uri: item.fileString }}
                  style={styles.image}
                  resizeMode="contain"
                />

                <TouchableOpacity
                  onPress={() => handleToggleFavorite(item)}
                  style={styles.like}
                >
                  <MaterialCommunityIcons
                    name={isFavorited ? "heart" : "heart-outline"}
                    size={24}
                    color={isFavorited ? "#fb5607" : "black"}
                  />
                </TouchableOpacity>

                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {Truncate(item.brand || item.title || "No Name", 20)}
                  </Text>
                  <Text style={styles.cardDescription} numberOfLines={2}>
                    {Truncate(item.description, 40)}
                  </Text>
                  <View style={styles.cardPriceContainer}>
                    <Text style={styles.cardPrice}>
                      {item.sellingPrice} {"\u20BC"}
                    </Text>
                    <Text style={styles.cardDetail}>
                      Stock: {item.quantity || "N/A"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 15,
    fontWeight: "bold",
    color: "#333",
  },
  productsContainer: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  card: {
    width: width / 2 - 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 6,
    marginBottom: 8,
  },
  like: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
    padding: 5,
  },
  cardBody: {
    paddingHorizontal: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  cardPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "orange",
  },
  cardDetail: {
    fontSize: 12,
    color: "#333",
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noProductsText: {
    fontSize: 18,
    color: "#666",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default ProductDetailsScreen;
