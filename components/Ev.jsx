import React, { useState, useEffect, useCallback,useRef } from "react";
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
import { useNavigation } from "@react-navigation/native";
import StarAnmimation from "./StarAnmimation";
import Ionicons from "@expo/vector-icons/Ionicons";
import Reklam from "../components/Reklam";
import Header from "../components/Header";
import ProfilModal from './ProfilModal';
import YorumAnimation from "../components/YorumAnimation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { addToFavorites, removeFromFavorites } from "../store/favoritesSlice";
import { selectToken, selectIsLoggedIn } from "../store/authSlice";
import Constants from 'expo-constants';
import HeartAnimation from "./HeartAnimation";
import Toast from "react-native-toast-message";
import LottieView from "lottie-react-native";
import { BlurView } from "expo-blur";
import FlyingItem from "./FlyingItem";

const { height, width } = Dimensions.get("window");

const Ev = () => {
  const apiUrl = Constants.expoConfig.extra.apiKey;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);
  const [flyingItems, setFlyingItems] = useState([]);
  const cartIconRef = useRef(null);
  const [cartPosition, setCartPosition] = useState({ x: 0, y: 0 });
  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(apiUrl + '/productItem/getAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setData(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert("Error", "Failed to fetch data");
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [apiUrl, token]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const handleAddToCartWithAnimation = (item, event) => {
    if (!isLoggedIn) {
      showAuthAlert("səbətə əlavə etmək");
      return;
    }

    // Sepet ikonunun konumunu al
    cartIconRef.current.measure((x, y, width, height, pageX, pageY) => {
      const cartPos = { x: pageX + width / 2, y: pageY + height / 2 };
      setCartPosition(cartPos);

      // Tıklanan konumu al
      const startPos = {
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      };

      // Yeni animasyonlu öğe ekle
      setFlyingItems(prev => [
        ...prev,
        {
          id: Date.now(),
          startPos,
          endPos: cartPos,
        },
      ]);

      // Sepete ekleme işlemi
      dispatch(addToCart(item));
      showToast();
    });
  };

  const removeFlyingItem = (id) => {
    setFlyingItems(prev => prev.filter(item => item.id !== id));
  };


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

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Əlavə edildi',
      text2: 'Məhsul səbətə əlavə olundu ✅',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const renderItem = useCallback(({ item }) => (
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
        onAddToCart={(e) => handleAddToCartWithAnimation(item, e)}
      showAuthAlert={showAuthAlert}
      
    />
  ), [isLoggedIn, navigation, dispatch]);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <View style={styles.container}>
            <View 
        ref={cartIconRef} 
        style={{ position: 'absolute', left: 65, bottom: -25 ,zIndex:6000}}
        onLayout={() => {}}
      >
        <Ionicons name="cart" size={24} color="black" />
      </View>

      {/* Uçan öğeler */}
      {flyingItems.map((item) => (
        <FlyingItem
          key={item.id}
          startPos={item.startPos}
          endPos={item.endPos}
          onComplete={() => removeFlyingItem(item.id)}
        />
      ))}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <BlurView 
            intensity={30} 
            style={styles.blurContainer} 
            tint="light" 
          />
          <LottieView
            source={require("../assets/animation.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      )}
      
      <Header />
      
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            colors={['#ff6e40']}
            tintColor="#ff6e40"
          />
        }
        ListHeaderComponent={<Reklam />}
        ListEmptyComponent={
          !isLoading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Mövcud məhsul tapılmadı</Text>
            </View>
          )
        }
        contentContainerStyle={data.length === 0 && styles.emptyListContainer}
      />
      
      <Toast />
    </View>
  );
};

const Card = React.memo(({ item, isLoggedIn, onDetailPress, onAddToCart, showAuthAlert }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorited = favorites.some((favItem) => favItem.id === item.id);
  const [modalVisible, setModalVisible] = useState(false);

  const handleToggleFavorite = useCallback(() => {
    if (isFavorited) {
      dispatch(removeFromFavorites(item));
    } else {
      dispatch(addToFavorites(item));
    }
  }, [dispatch, isFavorited, item]);

  const handleShare = useCallback(() => {
    Share.share({
      message: `Məhsul: ${item.brand}\nQiymət: ${item.sellingPrice} ₼`,
    }).catch((error) => Alert.alert("Paylaşım Xətası", error.message));
  }, [item]);

  const handleProfilePress = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleStarPress = useCallback(() => {
    if (!isLoggedIn) {
      showAuthAlert("ulduz vermək");
    }
  }, [isLoggedIn, showAuthAlert]);

  const handleCommentPress = useCallback(() => {
    if (!isLoggedIn) {
      showAuthAlert("şərh yazmaq");
    }
  }, [isLoggedIn, showAuthAlert]);

  const truncateText = useCallback((text, maxLength) => {
    return text != null && text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  }, []);

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
          resizeMode="cover"
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
            
            >
              <Text style={styles.addToCartText}>İndi Al</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.addToCartButton}
              onPress={(e) => {
                e.persist(); // Event objesini koru
                onAddToCart(e);
              }}
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
          <YorumAnimation disabled={!isLoggedIn} />
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#555",
    fontFamily: 'Poppins_500Medium'
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: height * 0.7
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
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8f9f9",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#ff5a5f',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'Poppins_600SemiBold'
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
    fontFamily: 'Poppins_400Regular'
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
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  addToCartButton: {
    backgroundColor: "#00b894",
    paddingVertical: 8,
    paddingHorizontal: 15,
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
    paddingVertical: 12,
    backgroundColor: "#f1f2f6",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 8,
  },
  profileContainer: {
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
  moreOptionsButton: {
    padding: 4,
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
    width: 80,
    height: 80,
  },
});

export default Ev;