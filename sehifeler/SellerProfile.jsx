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
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import axios from "axios";
import LottieView from "lottie-react-native";
import { BlurView } from "expo-blur";
const { width } = Dimensions.get("window");

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
    getUserProducts();
  }, []);

  const getUserProducts = async () => {
    try {
      const response = await axios.get(
        apiUrl + "/productItem/getUserProducts",
        { headers: { Authorization: `Bearer ${token}` } }
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
    let filename = localUri.split("/").pop();
    let type = "image/jpeg";

    let formData = new FormData();

    formData.append("image", {
      uri: localUri,
      name: filename,
      type: type,
    });

    try {
      const response = await axios.post(
        apiUrl + "/user/postProfilePicture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(updateUser({ userProfilePicture: response.data }));
      console.log(user);
    } catch (error) {
      console.error("Upload Error:", error);
      alert(
        "Məhsul yüklənərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin."
      );
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    // Galeriden resim seçme
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Fotoğraflara erişim izni vermeniz gerekiyor!");
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
            source={require("../assets/animation.json")}
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
          <TouchableOpacity onPress={pickImage} >
            <Image
              source={{
                uri:
                  user.userProfilePicture ||
                  "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.webp?a=1&b=1&s=612x612&w=0&k=20&c=u5RPl326UFf1oyrM1iLFJtqdQ3K28TdBdSaSPKeCrdc=",
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
                {samplePosts.length
                  .toFixed()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
          <Text style={styles.profileBio}>{user.desc}</Text>
          <Text style={styles.profileLink}>{user.email}</Text>
        </View>

        <View style={styles.postsSection}>
          <View style={styles.postsGrid}>
            {products.map((post) => (
              <View key={post.id}  style={styles.postContainer}>
          <TouchableOpacity onPress={() =>
    navigation.navigate("UrunDetay", {
        id: post.id,
        title: post.brand,
        description: post.description,
        price: post.sellingPrice,
        image: post.fileString,
    })
}>
    <Image
        source={{ uri: post.fileString }}
        style={styles.postImage}
    />
</TouchableOpacity>
              

                <View style={styles.postInfo}>
                  <Text style={styles.brandName}>
                    {truncateText(post.brand, 16)}
                  </Text>

                  <View style={styles.postAlti}>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.rating}>🌠 5K</Text>
                    </View>

                    <View>
                      <Text style={styles.price}>{post.sellingPrice} ₼</Text>
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalContent: {
    paddingHorizontal: 16,
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
  profileTopSection: {
    alignItems: "center",
    marginVertical: 10,
  },
  profileImage: {
    width: 120,
    height: 80,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ccc",
    objectFit: "cover",
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontWeight: "bold",
    fontSize: 16,
  },
  statLabel: {
    fontSize: 14,
    color: "#555",
  },
  divider: {
    width: 1,
    backgroundColor: "#ddd",
  },
  profileInfo: {
    alignItems: "center",
    marginVertical: 3,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileBio: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  profileLink: {
    fontSize: 14,
    color: "#1e90ff",
    marginTop: 4,
  },
  postsSection: {
    marginTop: 20,
  },
  postsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  postContainer: {
    width: (width - 48) / 2, // padding 16 * 2 + gap 16
    marginBottom: 16,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
    elevation: 2,
  },
  postImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  postInfo: {
    padding: 8,
  },
  brandName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  postAlti: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  ratingContainer: {
    backgroundColor: "#ffeaa7",
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  rating: {
    fontSize: 12,
    color: "#2d3436",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0984e3",
  },
  miniprice: {
    fontSize: 10,
    color: "#636e72",
  },
});

export default SellerProfile;
