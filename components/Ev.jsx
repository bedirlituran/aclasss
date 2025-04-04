import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Share,
  Dimensions,
  RefreshControl,
  Platform,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import SkeletonLoader from "../components/SkeletonLoader";
import StarAnmimation from "./StarAnmimation";
import WhatsAppButton from "./WhatsAppButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import Reklam from "../components/Reklam";
import Header from "../components/Header";
import ProfilModal from './ProfilModal';
import YorumAnimation from "../components/YorumAnimation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { addToFavorites, removeFromFavorites } from "../store/favoritesSlice";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from '@expo/vector-icons/Feather';
import { setLoading } from "../store/authSlice";
import Constants from 'expo-constants';
const { height, width } = Dimensions.get("window");
import { Text } from "react-native-elements";

const Ev = () => {
  const apiUrl = Constants.expoConfig.extra.apiKey;
  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [hasMoreData, setHasMoreData] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(apiUrl + `/productItem/getAll`);
      setData(res.data);
      setLoading(false);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setRefreshing(false); // Yenileme tamamlandığında refreshing'i false yap
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    setHasMoreData(true);
    fetchData();
  }, []);

  const loadMore = () => {
    if (isFetchingMore || !hasMoreData) return;
    setIsFetchingMore(true);
    setPage((prevPage) => prevPage + 1);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading && !refreshing) {
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
      <FlatList
        ref={scrollViewRef}
        data={Data}
        renderItem={({ item }) => (
          <Card
            item={item}
            onDetailPress={() =>
              navigation.navigate("UrunDetay", {
                image: item.fileString,
                title: item.brand,
                description: item.description,
                price: item.sellingPrice,
              })
            }
            onAddToCart={() => dispatch(addToCart(item))}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
        removeClippedSubviews={true}
        ListHeaderComponent={<Reklam />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          !isLoading && Data.length === 0 ? (
            <View style={styles.emptyContainer}>

            </View>
          ) : null
        }
      />
      <ProfilModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
};

// Card bileşeni
const Card = React.memo(({ item, onDetailPress, onAddToCart }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorited = favorites.some((favItem) => favItem.id === item.id);
  const [modalVisible, setModalVisible] = useState(false);
  const handleToggleFavorite = () => {
    if (isFavorited) {
      dispatch(removeFromFavorites(item));
    } else {
      dispatch(addToFavorites(item));
    }
  };

  const handleShare = () => {
    Share.share({
      message: `Ürün: ${item.brand}\nFiyat: ${item.sellingPrice} ₼`,
    }).catch((error) => Alert.alert("Paylaşım Hatası", error.message));
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <View style={styles.card}>
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={() => setModalVisible(true)} >
          <Image source={{ uri: item.userProfilePicture }} style={styles.avatar} />
          <Text style={styles.categoryText}>
            {truncateText(item.subCategory, 50)}
          </Text>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="navigate-circle-outline" size={23} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <WhatsAppButton />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="phone-call" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ProfilModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
      <TouchableOpacity onPress={onDetailPress}>
        <Image source={{ uri: item.fileString }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.brand}</Text>
        <Text style={styles.description}>
          {truncateText(item.description, 100)}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{item.sellingPrice} ₼</Text>
          <TouchableOpacity
            style={styles.ByButton}
            onPress={onAddToCart}
          >
            <Text style={styles.addToCartText}>Indi Al</Text>
          </TouchableOpacity>
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
        <TouchableOpacity onPress={handleToggleFavorite}>
          <MaterialCommunityIcons
            name={isFavorited ? "heart" : "heart-plus-outline"}
            size={24}
            color={isFavorited ? "#fb5607" : "black"}
          />
        </TouchableOpacity>
        <StarAnmimation size={item.likeCount} productId={item.id}/>
        <YorumAnimation />
        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-social-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
});

// Stil tanımlamaları
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center", // Vertically center content
    alignItems: "center", // Horizontally center content
  },
  skeletonContainer: {
    width: width,
    alignItems: "center",
    paddingVertical: 20,
  },
  card: {
    width: width * 0.92,
    maxWidth: width * 0.95,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0, // iOS'ta gölge opaklığını ekler
    shadowRadius: Platform.OS === 'ios' ? 6 : 0,    // iOS'ta gölge yarıçapını ekler
    elevation: Platform.OS === 'android' ? 5 : 0,   // Android'de elevation kullanılır
    overflow: "hidden",
    marginTop: 50,
    alignSelf: "center", 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#f8f9f9",
    paddingVertical: 10,
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
  categoryText: {
    fontSize: 14,
    color: "#555",
    fontFamily:'Poppins_400Regular_Italic'
  },
  iconButton: {
    marginRight: 10,
    backgroundColor: "#f8f9f9",

    padding: 3,
  },
  followButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 8,
    borderColor: "lightgray",
    borderWidth: 0.4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
    backgroundColor: "white",
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
    fontFamily:'Poppins_400Regular_Italic'

  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
    fontFamily:'Poppins_400Regular_Italic'

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
    color: "green",
    fontFamily:'Poppins_400Regular_Italic'

  },
  addToCartButton: {
    backgroundColor: "green",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  ByButton:{
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft:60,
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily:'Poppins_400Regular_Italic'

  },
  stock: {
    marginTop: 10,
    fontSize: 14,
    color: "blue",
    fontFamily:'Poppins_400Regular_Italic'

  },
  animations: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  shareButton: {
    padding: 5,
  },
});

export default Ev;