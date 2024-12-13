import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { useFavorites } from "../FavoriteContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";


const FavoriteScreen = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const navigation = useNavigation();
  const onDetailPress = (item) => {
    navigation.navigate("UrunDetay", {
      image: item.image,
      title: item.title,
      description: item.description,
      price: item.price,
    });
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableWithoutFeedback onPress={()=>{onDetailPress(item)}}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableWithoutFeedback>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price} ₼</Text>
        <TouchableOpacity
          onPress={() => removeFromFavorites(item)}
          style={styles.removeButton}
        >
          <Ionicons name="trash" size={20} color="#fff" />
          <Text style={styles.removeText}>Sil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorilerim</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Henüz favorilere eklenmiş ürün yok.</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    backgroundColor: "#f2f2f2",
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff6347",
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  removeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
});

export default FavoriteScreen;
