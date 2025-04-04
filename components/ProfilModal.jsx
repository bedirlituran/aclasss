import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Dimensions, Text, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { addToFavorites, removeFromFavorites } from '../store/favoritesSlice';

const { height, width } = Dimensions.get('window');

const samplePosts = [
  { id: 1, uri: 'https://picsum.photos/300/300?random=1' },
  { id: 2, uri: 'https://picsum.photos/300/300?random=2' },
  { id: 3, uri: 'https://picsum.photos/300/300?random=3' },
  { id: 4, uri: 'https://picsum.photos/300/300?random=4' },
  { id: 5, uri: 'https://picsum.photos/300/300?random=5' },
  { id: 6, uri: 'https://picsum.photos/300/300?random=6' },
  { id: 7, uri: 'https://picsum.photos/300/300?random=7' },
  { id: 8, uri: 'https://picsum.photos/300/300?random=8' },
  { id: 9, uri: 'https://picsum.photos/300/300?random=9' },
  { id: 10, uri: 'https://picsum.photos/300/300?random=10' },
  { id: 11, uri: 'https://picsum.photos/300/300?random=1' },
  { id: 12, uri: 'https://picsum.photos/300/300?random=2' },
  { id: 13, uri: 'https://picsum.photos/300/300?random=3' },
  { id: 14, uri: 'https://picsum.photos/300/300?random=4' },
  { id: 15, uri: 'https://picsum.photos/300/300?random=5' },
  { id: 16, uri: 'https://picsum.photos/300/300?random=6' },
  { id: 17, uri: 'https://picsum.photos/300/300?random=7' },
  { id: 18, uri: 'https://picsum.photos/300/300?random=8' },
  { id: 19, uri: 'https://picsum.photos/300/300?random=9' },
  { id: 20, uri: 'https://picsum.photos/300/300?random=10' },
  { id: 21, uri: 'https://picsum.photos/300/300?random=1' },
  { id: 22, uri: 'https://picsum.photos/300/300?random=2' },
  { id: 23, uri: 'https://picsum.photos/300/300?random=3' },
  { id: 24, uri: 'https://picsum.photos/300/300?random=4' },
  { id: 25, uri: 'https://picsum.photos/300/300?random=5' },
  { id: 26, uri: 'https://picsum.photos/300/300?random=6' },
  { id: 27, uri: 'https://picsum.photos/300/300?random=7' },
  { id: 28, uri: 'https://picsum.photos/300/300?random=8' },
  { id: 29, uri: 'https://picsum.photos/300/300?random=9' },
  { id: 30, uri: 'https://picsum.photos/300/300?random=10' },
  { id: 31, uri: 'https://picsum.photos/300/300?random=1' },
  { id: 32, uri: 'https://picsum.photos/300/300?random=2' },
  { id: 33, uri: 'https://picsum.photos/300/300?random=3' },
  { id: 34, uri: 'https://picsum.photos/300/300?random=4' },
  { id: 35, uri: 'https://picsum.photos/300/300?random=5' },
  { id: 36, uri: 'https://picsum.photos/300/300?random=6' },
  { id: 37, uri: 'https://picsum.photos/300/300?random=7' },
  { id: 38, uri: 'https://picsum.photos/300/300?random=8' },
  { id: 39, uri: 'https://picsum.photos/300/300?random=9' },
  { id: 40, uri: 'https://picsum.photos/300/300?random=10' },
  
];

const ProfilModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const handleToggleFavorite = (item) => {
    const isFavorited = favorites.some((favItem) => favItem.id === item.id);
    if (isFavorited) {
      dispatch(removeFromFavorites(item));
    } else {
      dispatch(addToFavorites(item));
    }
  };
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <View style={styles.profileTopSection}>
              <Image
                source={{ uri: 'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.webp?a=1&b=1&s=612x612&w=0&k=20&c=u5RPl326UFf1oyrM1iLFJtqdQ3K28TdBdSaSPKeCrdc=' }}
                style={styles.profileImage}
              />

<View style={styles.profileStats}>
  <View style={styles.statItem}>
    <Text style={styles.statNumber}>1,234</Text>
    <Text style={styles.statLabel}>Post</Text>
  </View>
  <View style={styles.divider} />
  <View style={styles.statItem}>
    <Text style={styles.statNumber}>5.6M</Text>
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
              <Text style={styles.profileBio}>Digital Content Creator | Photography Enthusiast</Text>
              <Text style={styles.profileLink}>www.aclass.example.com</Text>
            </View>

            <View style={styles.postsSection}>
              <Text style={styles.sectionTitle}>Satıcıın Paylaşımları</Text>
              <View style={styles.postsGrid}>
                {samplePosts.map((post) => (
                 <View key={post.id} style={styles.postContainer}>
                 <TouchableOpacity
                   style={styles.likeIcon}
                   onPress={() => handleToggleFavorite(post)}
                 >
                   <MaterialCommunityIcons
                     name={favorites.some((favItem) => favItem.id === post.id) ? 'heart' : 'heart-plus-outline'}
                     size={24}
                     color={favorites.some((favItem) => favItem.id === post.id) ? '#fb5607' : 'lightgray'}
                   />
                 </TouchableOpacity>
               
                 <Image
                   source={{ uri: post.uri }}
                   style={styles.postImage}
                 />
               
                 <View style={styles.postInfo}>
                   <Text style={styles.brandName}>{truncateText("Aclass oğlan geyim", 16)}</Text>
               
                   <View style={styles.ratingContainer}>
                     <Text style={styles.rating}>⭐⭐⭐ 5K {post.stars}</Text>
                   </View>
               
                   <View style={styles.priceCartContainer}>
                     <Text style={styles.price}>{post.price}100<Text style={styles.miniprice}>.15</Text> ₼</Text>
                     <TouchableOpacity style={styles.cartIcon} onPress={() => handleAddToCart(post)}>
                     <Ionicons name="cart-outline" size={24} color="black" />
                     </TouchableOpacity>
                   </View>
                 </View>
               </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    height: height * 0.9,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    padding: 2,
  },
  modalContent: {
    flex: 1,
  },
  profileTopSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  miniprice:{
    fontWeight: 'semibold',
    fontSize: 11,
    color: 'orange',

  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
  profileInfo: {
    marginBottom: 25,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileBio: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  profileLink: {
    fontSize: 14,
    color: '#00376B',
    fontWeight: '500',
  },
  postsSection: {
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb',
    paddingTop: 15,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 15,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  postContainer: {
    width: (width - 40) / 2, // 2 sütunlu grid
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  likeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  postInfo: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  brandName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    color: '#FFD700',
    fontSize: 12,
  },
  soldCount: {
    fontSize: 12,
    color: '#666',
  },
  priceCartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'orange',
  },
  cartIcon: {
    backgroundColor: 'lightgray',
    padding: 4,
    borderRadius: 6,
  },
  divider: {
    height: '80%',
    width: 1,
    backgroundColor: 'black',
    marginHorizontal: 10,
  },
});

export default ProfilModal;
