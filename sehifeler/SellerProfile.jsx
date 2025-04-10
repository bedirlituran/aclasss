import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser, updateUser } from "../store/authSlice";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import axios from "axios";
import LottieView from "lottie-react-native";
import { BlurView } from "expo-blur";
const {width } = Dimensions.get("window");

const samplePosts = [
  { id: 1, uri: "https://picsum.photos/300/300?random=1" },
  { id: 2, uri: "https://picsum.photos/300/300?random=2" },
  { id: 3, uri: "https://picsum.photos/300/300?random=3" },
  { id: 4, uri: "https://picsum.photos/300/300?random=4" },
  { id: 5, uri: "https://picsum.photos/300/300?random=5" },
  { id: 6, uri: "https://picsum.photos/300/300?random=6" },
  { id: 7, uri: "https://picsum.photos/300/300?random=7" },
  { id: 8, uri: "https://picsum.photos/300/300?random=8" },
  { id: 9, uri: "https://picsum.photos/300/300?random=9" },
  { id: 10, uri: "https://picsum.photos/300/300?random=10" },
  { id: 11, uri: "https://picsum.photos/300/300?random=11" },
  { id: 12, uri: "https://picsum.photos/300/300?random=12" },
  { id: 13, uri: "https://picsum.photos/300/300?random=13" },
  { id: 14, uri: "https://picsum.photos/300/300?random=14" },
  { id: 15, uri: "https://picsum.photos/300/300?random=15" },
  { id: 16, uri: "https://picsum.photos/300/300?random=16" },
  { id: 17, uri: "https://picsum.photos/300/300?random=17" },
  { id: 18, uri: "https://picsum.photos/300/300?random=18" },
  { id: 19, uri: "https://picsum.photos/300/300?random=19" },
  { id: 20, uri: "https://picsum.photos/300/300?random=20" },
  { id: 21, uri: "https://picsum.photos/300/300?random=21" },
  { id: 22, uri: "https://picsum.photos/300/300?random=22" },
  { id: 23, uri: "https://picsum.photos/300/300?random=23" },
  { id: 24, uri: "https://picsum.photos/300/300?random=24" },
  { id: 25, uri: "https://picsum.photos/300/300?random=25" },
  { id: 26, uri: "https://picsum.photos/300/300?random=26" },
  { id: 27, uri: "https://picsum.photos/300/300?random=27" },
  { id: 28, uri: "https://picsum.photos/300/300?random=28" },
  { id: 29, uri: "https://picsum.photos/300/300?random=29" },
  { id: 30, uri: "https://picsum.photos/300/300?random=30" },
  { id: 31, uri: "https://picsum.photos/300/300?random=31" },
  { id: 32, uri: "https://picsum.photos/300/300?random=32" },
  { id: 33, uri: "https://picsum.photos/300/300?random=33" },
  { id: 34, uri: "https://picsum.photos/300/300?random=34" },
  { id: 35, uri: "https://picsum.photos/300/300?random=35" },
];

const SellerProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = Constants.expoConfig.extra.apiKey;
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [products, setProducts] = useState([]);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };


  const showAuthAlert = () => {
    Alert.alert(
      "Giriş Tələb Olunur",
      "Bu əməliyyatı yerinə yetirmək üçün qeydiyyat olmalısınız.",
      [
        { text: "Bağla", style: "cancel" },
        { text: "Qeydiyyat", onPress: () => navigation.navigate("Qeydiyyat") },
      ]
    );
  };

  useEffect(() => {
    console.log(user);
    
    getUserProducts();
  }, []);

  const getUserProducts = async () => {
    try {

      const response = await axios.get(
        apiUrl + "/productItem/getUserProducts",
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.status == 200) {
        setProducts(response.data);
        setLoading(false);
        //setRefreshing(false);
      }
    } catch (error) {
      console.error("Hata:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };
 

  const postProfilePicture = async (image) => {   
    setLoading(true); 
    let localUri = image;
    let filename = localUri.split('/').pop();
    let type = 'image/jpeg'; 

    let formData = new FormData();

    formData.append("image", {
      uri: localUri,
      name: filename,
      type: type,
    });
  
    try {
      console.log(apiUrl + "/user/postProfilePicture");
      
      const response = await axios.post(
        apiUrl + "/user/postProfilePicture", 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        }
      );
      
      dispatch(updateUser({userProfilePicture: response.data}));
      console.log(user);
      
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Məhsul yüklənərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
    }
    finally {
      setLoading(false); 
    }
  };

  const pickImage = async () => {
    // Galeriden resim seçme
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Fotoğraflara erişim izni vermeniz gerekiyor!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      postProfilePicture(result.assets[0].uri);
    }
  };

   


  return (
    <View style={styles.container}>
      {/* Loading varsa blur + Lottie animasyon göster */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <BlurView intensity={30} style={styles.blurContainer} tint="light" />
          <LottieView
            source={require('../assets/animation.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      )}
  
      <ScrollView
        style={styles.modalContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileTopSection}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{
                uri:
                  user.userProfilePicture ||
                  'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.webp?a=1&b=1&s=612x612&w=0&k=20&c=u5RPl326UFf1oyrM1iLFJtqdQ3K28TdBdSaSPKeCrdc=',
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
  
          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{products.length}</Text>
              <Text style={styles.statLabel}>Post</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {(samplePosts.length)
                  .toFixed()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                K
              </Text>
              <Text style={styles.statLabel}>Star</Text>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>102</Text>
              <Text style={styles.statLabel}>Satış</Text>
            </View>
          </View>
        </View>
  
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileBio}>
            {user.desc}
          </Text>
          <Text style={styles.profileLink}>{user.email}</Text>
        </View>
  
        <View style={styles.postsSection}>
          {/* <Text style={styles.sectionTitle}>Satıcıın Paylaşımları</Text> */}
          <View style={styles.postsGrid}>
            {products.map((post) => (
              <View key={post.id} style={styles.postContainer}>
                
  
                <Image source={{ uri: post.fileString }} style={styles.postImage} />
  
                <View style={styles.postInfo}>
                  <Text style={styles.brandName}>
                    {truncateText(post.brand, 16)}
                  </Text>
  
                  <View style={styles.postAlti}>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.rating}>🌠 5K</Text>
                    </View>
  
                    <View>
                      <Text style={styles.price}>
                        {post.sellingPrice} ₼
                        {/* <Text style={styles.miniprice}>.15</Text> ₼ */}
                      </Text>
                      {/* <TouchableOpacity style={styles.cartIcon} onPress={() => handleAddToCart(post)}>
                        <Ionicons name="cart-outline" size={24} color="black" />
                      </TouchableOpacity> */}
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
  
};

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  
  lottie: {
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  modalContent: {
    flex: 1,
    padding: 15,
  },
  profileTopSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  miniprice: {
    fontWeight: "semibold",
    fontSize: 11,
    color: "orange",
  },
  profileImage: {
    width: 130,
    height: 100,
    borderRadius: 30,
    marginRight: 20,
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "center",
    width: '60%',
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    flexBasis: '20%',
  },
  statNumber: {
    fontSize: 15,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 13,
    color: "gray",
  },
  profileInfo: {
    marginBottom: 25,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileBio: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  profileLink: {
    fontSize: 14,
    color: "#00376B",
    fontWeight: "500",
  },
  postsSection: {
    borderTopWidth: 1,
    borderTopColor: "#dbdbdb",
    paddingTop: 15,
  },
  postAlti: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 8,
    gap:20
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 15,
  },
  postsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  postContainer: {
    width: (width - 40) / 2, // 2 sütunlu grid
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
  likeIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
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
  brandName: {
    fontWeight: "bold",
    fontSize: 14,
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
  soldCount: {
    fontSize: 12,
    color: "#666",
  },
  priceCartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  price: {
    fontWeight: "bold",
    fontSize: 14,
    color: "orange",
  },
  cartIcon: {
    backgroundColor: "lightgray",
    padding: 4,
    borderRadius: 6,
  },
  divider: {
    height: "80%",
    width: 1,
    backgroundColor: "black",
    marginHorizontal: 10,
  },
});

export default SellerProfile; 