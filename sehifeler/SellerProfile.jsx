import React from "react";
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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { addToFavorites, removeFromFavorites } from "../store/favoritesSlice";
import { selectIsLoggedIn } from "../store/authSlice";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const samplePosts = [
  { id: 1, uri: "https://picsum.photos/300/300?random=1" },
  { id: 2, uri: "https://picsum.photos/300/300?random=2" },
  { id: 3, uri: "https://picsum.photos/300/300?random=3" },
  { id: 4, uri: "https://picsum.photos/300/300?random=4" },
  { id: 5, uri: "https://picsum.photos/300/300?random=5" },
  { id: 6, uri: "https://picsum.photos/300/300?random=6" },
];

const SellerProfile = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigation = useNavigation();

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handleToggleFavorite = (item) => {
    if (!isLoggedIn) {
      showAuthAlert();
      return;
    }
    const isFavorited = favorites.some((favItem) => favItem.id === item.id);
    if (isFavorited) {
      dispatch(removeFromFavorites(item));
    } else {
      dispatch(addToFavorites(item));
    }
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      showAuthAlert();
      return;
    }
    dispatch(addToCart(product));
  };

  const showAuthAlert = () => {
    Alert.alert(
      "Giriş Tələb Olunur",
      "Bu əməliyyatı yerinə yetirmək üçün qeydiyyat olmalısınız.",
      [
        { text: "İptal", style: "cancel" },
        { text: "Qeydiyyat", onPress: () => navigation.navigate("Qeydiyyat") },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.modalContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileTopSection}>
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.webp?a=1&b=1&s=612x612&w=0&k=20&c=u5RPl326UFf1oyrM1iLFJtqdQ3K28TdBdSaSPKeCrdc=",
            }}
            style={styles.profileImage}
          />

          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{samplePosts.length}</Text>
              <Text style={styles.statLabel}>Post</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {(5.6 * samplePosts.length)
                  .toFixed(1)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                K
              </Text>
              <Text style={styles.statLabel}>Reytinq</Text>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1,024</Text>
              <Text style={styles.statLabel}>Satış</Text>
            </View>
          </View>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Aclass</Text>
          <Text style={styles.profileBio}>
            Digital Content Creator | Photography Enthusiast
          </Text>
          <Text style={styles.profileLink}>www.aclass.example.com</Text>
        </View>

        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>Satıcıın Paylaşımları</Text>
          <View style={styles.postsGrid}>
            {samplePosts.map((post) => (
              <View key={post.id} style={styles.postContainer}>
                {/* <TouchableOpacity
                  style={styles.likeIcon}
                  onPress={() => handleToggleFavorite(post)}
                >
                  <MaterialCommunityIcons
                    name={favorites.some((favItem) => favItem.id === post.id) ? 'heart' : 'heart-plus-outline'}
                    size={24}
                    color={favorites.some((favItem) => favItem.id === post.id) ? '#fb5607' : 'lightgray'}
                  />
                </TouchableOpacity> */}

                <Image source={{ uri: post.uri }} style={styles.postImage} />

                <View style={styles.postInfo}>
                  <Text style={styles.brandName}>
                    {truncateText("Aclass oğlan geyim", 16)}
                  </Text>

                  <View style={styles.postAlti}>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.rating}>5K {post.stars}</Text>
                    </View>

                    <View>
                      <Text style={styles.price}>
                        {post.price}100<Text style={styles.miniprice}>.15</Text>{" "}
                        ₼
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
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
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
