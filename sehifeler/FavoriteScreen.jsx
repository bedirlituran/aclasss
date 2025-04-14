import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform, Dimensions,
  RefreshControl
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { removeFromFavorites } from "../store/favoritesSlice"; // Beğeni slice'tan fonksiyonlar
import { selectToken, selectUser } from "../store/authSlice";
import Constants from 'expo-constants';
import axios from "axios";
import SkeletonLoader from "../components/SkeletonLoader";

const { width } = Dimensions.get("window");
const FavoriteScreen = () => {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const apiUrl = Constants.expoConfig.extra.apiKey;
  const [Data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onDetailPress = (item) => {
    navigation.navigate("UrunDetay", {
      image: item.image,
      title: item.title,
      description: item.description,
      price: item.price,
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLikedData();
  }, []);



  const fetchLikedData = async () => {
    try {
      const res = await axios.get(apiUrl + '/likes/userLikedProducts', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      setData(res.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Xəta", "Məhsullar yüklənərkən xəta baş verdi");
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLikedData();
  }, []);

  const handleToggleFavorite = (product) => {
    dispatch(removeFromFavorites(product));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Sepete ürün ekleme
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product)); // Sepetten ürün çıkarma
  };

  const truncateText = (text, maxLength) => {
    return text != null && text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const renderFavoriteItem = ({ item }) => (
    Data.length == 0 ? (
      <Text style={styles.emptyText}>Hələki bəyəndiyiniz məhsul yoxdur.</Text>
    ) :
    (
      <View style={styles.postContainer}>
      <TouchableOpacity onPress={() => onDetailPress(item)}>
        <Image source={{ uri: item.fileString }} style={styles.postImage} />
        <View style={styles.postInfo}>
          <Text style={styles.brandName}>{truncateText(item.brand, 16)}</Text>
          <View style={styles.postAlti}>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>🌠 5K</Text>
            </View>
            <Text style={styles.price}>{item.sellingPrice} ₼</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
    )
  );

  return (
    <View style={styles.container}>
       (
        <FlatList
          data={Data}
          renderItem={renderFavoriteItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          numColumns={2}
        />
      )
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f4f4f4",
  },
  postsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  postAlti: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 8,
    gap:20
  },
  postsSection: {
 
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
  },
  postContainer: {
    width: (width - 48) / 2,
    margin: 4,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  postInfo: {
    marginTop: 8,
    paddingHorizontal: 8,
    display: "flex",
    flexDirection: "col",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    paddingBottom: 20,
  },
  skeletonContainer: {
    width: width,
    alignItems: "center",
    paddingVertical: 20,
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
