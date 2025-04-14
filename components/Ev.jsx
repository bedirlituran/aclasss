import React, { useState, useEffect, useCallback } from "react";
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
import { useNavigation} from "@react-navigation/native";
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
import Feather from '@expo/vector-icons/Feather';
import { selectToken ,selectIsLoggedIn} from "../store/authSlice";
import Constants from 'expo-constants';
import HeartAnimation from "./HeartAnimation";
import Toast from "react-native-toast-message";
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

  const toast = ()=>{
    Toast.show({
      type: 'success',
      text1: 'Əlavə edildi',
      text2: 'Məhsul səbətə əlavə olundu ✅',
      position: 'bottom',
      visibilityTime: 2000,
    });
  }

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={Data}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        renderItem={({ item }) => (
          <Card
            item={item}
            isLoggedIn={isLoggedIn}
            onDetailPress={() => navigation.navigate("UrunDetay", {
              id: item.id,
              title: item.brand,
              description: item.description,
              price: item.sellingPrice,
              image: item.fileString,
            })}
            onAddToCart={() => {
              handleAction(() => dispatch(addToCart(item)), "səbətə əlavə etmək");
              toast(); 
            }}
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
    return text != null && text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileContainer} onPress={handleProfilePress}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: item.userProfilePicture || 'https://via.placeholder.com/300' }} 
              style={styles.avatar} 
            />
            {item.isVerified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#3897f0" />
              </View>
            )}
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.companyName} numberOfLines={1}>
              {item.sellerName || 'Company Name'}
            </Text>
            {/* <Text style={styles.productCategory} numberOfLines={1}>
              {item.category || 'Product Category'}
            </Text> */}
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.moreOptionsButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color="black" />
        </TouchableOpacity>
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
    <View style={styles.buttonGroup}>
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
            initialIsLiked={item.ratingByUser}
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
    marginBottom: 80,
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
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8f9f9",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35, // Dairəvi forma üçün width/2
    marginRight: 10,
    resizeMode: 'cover',
    borderWidth: 2, // Xəttin qalınlığı
    borderColor: '#ff5a5f', // İnstagramda üst-üstə düşən gradient rənglər
    // Shadow əlavə edək (iOS üçün)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    // Android üçün
    elevation: 5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 16,
    color: "#262626", // Daha qara rəng daha yaxşı oxunaqlılıq üçün
    fontFamily: 'Poppins_600SemiBold', // Qalın font daha professional görünüş üçün
    marginLeft: 8, // Avatar ilə arasında boşluq
    alignSelf: 'center', // Şaquli mərkəzləşdirmə
    maxWidth: width * 0.5, // Çox uzun adlar üçün məhdudiyyət
    fontWeight:'bold'
  },
  iconButton: {
    marginRight: 10,
    padding: 3,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "cover",
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
    gap: 8,
  },
  price: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    fontFamily: 'Poppins_600SemiBold'
  },
  ByButton: {
    backgroundColor: "#ff6e40",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  addToCartButton: {
    backgroundColor: "#00b894",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    fontFamily: 'Poppins_500Medium'
  },
  stock: {
    marginTop: 10,
    color: "#333",
    fontSize: 13,
    fontStyle: "italic",
  },
  animations: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#f1f2f6",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  buttonGroup:{
    flexDirection: "row",
  gap: 8,
  },
  profileContainer:{
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  profileTextContainer: {
    flex: 1,
  },
  companyName: {
    fontSize: 15,
    fontWeight: '600',
    color: "#262626",
    fontFamily: 'Poppins_600SemiBold',
  },
  productCategory: {
    fontSize: 13,
    color: "#8e8e8e",
    fontFamily: 'Poppins_400Regular',
    marginTop: 2,
  },
  moreOptionsButton: {
    padding: 4,
  },
});

export default Ev;