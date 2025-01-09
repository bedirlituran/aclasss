import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,Dimensions
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import {removeFromFavorites } from "../store/favoritesSlice"; // Beğeni slice'tan fonksiyonlar

const { width } = Dimensions.get("window");
const FavoriteScreen = () => {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onDetailPress = (item) => {
    navigation.navigate("UrunDetay", {
      image: item.image,
      title: item.title,
      description: item.description,
      price: item.price,
    });
  };

  const handleToggleFavorite = (product) => {
    dispatch(removeFromFavorites(product));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Sepete ürün ekleme
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product)); // Sepetten ürün çıkarma
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableWithoutFeedback onPress={() => { onDetailPress(item) }}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableWithoutFeedback>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price} ₼</Text>
        <TouchableOpacity
          onPress={() => handleToggleFavorite(item)}
          style={styles.removeButton}
        >
          <Ionicons name="trash" size={22} color="#fff" />
          <Text style={styles.removeText}>Sil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Hələki bəyəndiyiniz məhsul yoxdur.</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f4f4f4",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6, // Android için gölge
    marginHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    paddingHorizontal: Platform.OS === "ios" ? 15 : 10,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    borderRadius: 10,
  },
  info: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: "#1a8f00",
    fontWeight: "600",
  },
  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff4d4d",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  removeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 30,
    fontStyle: "italic",
  },
});

export default FavoriteScreen;
