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
  Text
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
import { selectIsLoggedIn } from "../store/authSlice";
import { selectToken, setLoading } from "../store/authSlice";
import Constants from 'expo-constants';
import HeartAnimation from "./HeartAnimation";
const { height, width } = Dimensions.get("window");

const Ev = () => {
  const apiUrl = Constants.expoConfig.extra.apiKey;
  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
 const token = useSelector(selectToken);
  const fetchData = async () => {
    try {
      const res = await axios.get(apiUrl + '/productItem/getAll', {
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const showAuthAlert = (actionName) => {
    Alert.alert(
      "Giriş Tələb Olunur",
      `Bu məhsulu ${actionName} üçün daxil olmalısınız`,
      [
        { text: "İmtina", style: "cancel" },
        { text: "Daxil Ol", onPress: () => navigation.navigate("Login") }
      ]
    );
  };

  const handleAction = (action, actionName) => {
    if (!isLoggedIn) {
      showAuthAlert(actionName);
    } else {
      action();
    }
  };

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
        data={Data}
        renderItem={({ item }) => (
          <Card
            item={item}
            isLoggedIn={isLoggedIn}
            onDetailPress={() => navigation.navigate("UrunDetay", {
              image: item.fileString,
              title: item.brand,
              description: item.description,
              price: item.sellingPrice,
            })}
            onAddToCart={() => handleAction(() => dispatch(addToCart(item)), "səbətə əlavə etmək")}
            showAuthAlert={showAuthAlert}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={<Reklam />}
        ListEmptyComponent={
          !isLoading && (
            <View style={styles.emptyContainer}>
              <Text>Mövcud məhsul tapılmadı</Text>
            </View>
          )
        }
      />
    </View>
  );
};

const Card = React.memo(({ item, isLoggedIn, onDetailPress, onAddToCart, showAuthAlert }) => {
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
      message: `Məhsul: ${item.brand}\nQiymət: ${item.sellingPrice} ₼`,
    }).catch((error) => Alert.alert("Paylaşım Xətası", error.message));
  };

  const handleProfilePress = () => {
    setModalVisible(true);
  };

  const handleStarPress = () => {
    if (!isLoggedIn) {
      showAuthAlert("ulduz vermək");
    }
    // Ulduz vermə funksiyası burada çağırılacaq
  };

  const handleCommentPress = () => {
    if (!isLoggedIn) {
      showAuthAlert("şərh yazmaq");
    }
    // Şərh yazma funksiyası burada çağırılacaq
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={handleProfilePress}>
          <Image 
            source={{ uri: item.userProfilePicture}} 
            style={styles.avatar} 
          />
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
        <Image 
          source={{ uri: item.fileString || 'https://via.placeholder.com/300' }} 
          style={styles.image} 
        />
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
            <Text style={styles.addToCartText}>İndi Al</Text>
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
        <TouchableOpacity onPress={() => isLoggedIn ? handleToggleFavorite() : showAuthAlert("bəyənmək")}>
          <HeartAnimation productId={item.id} initialIsLiked={item.likedByUser}/>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleStarPress}>
          <StarAnmimation 
            favCount={item.favCount} 
            productId={item.id}
            disabled={!isLoggedIn}
            initialIsLiked={item.likedByUser}
          />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleCommentPress}>
          <YorumAnimation 
            disabled={!isLoggedIn}
          />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="black" />
        </TouchableOpacity>
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
    width: width,
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.7
  },
  card: {
    width: width * 0.92,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0,
    shadowRadius: Platform.OS === 'ios' ? 6 : 0,
    elevation: Platform.OS === 'android' ? 5 : 0,
    overflow: "hidden",
    marginTop: 20,
    alignSelf: "center",
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
  categoryText: {
    fontSize: 14,
    color: "#555",
    fontFamily: 'Poppins_400Regular_Italic'
  },
  iconButton: {
    marginRight: 10,
    padding: 3,
  },
  image: {
    width: "100%",
    height: height * 0.3,
    resizeMode: "contain",
    marginTop: 10,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'Poppins_400Regular_Italic'
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
    fontFamily: 'Poppins_400Regular_Italic'
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
    fontFamily: 'Poppins_400Regular_Italic'
  },
  addToCartButton: {
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  ByButton: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: 'Poppins_400Regular_Italic'
  },
  stock: {
    marginTop: 10,
    fontSize: 14,
    color: "blue",
    fontFamily: 'Poppins_400Regular_Italic'
  },
  animations: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
});

export default Ev;