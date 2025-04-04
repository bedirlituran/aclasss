import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Dimensions, Text, ScrollView, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

// Örnek resimler (gerçek uygulamada API'den gelecek)
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
];

const ProfilModal = ({ visible, onClose }) => {
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
          
          <ScrollView style={styles.modalContent}>
            {/* Profil Üst Kısmı */}
            <View style={styles.profileTopSection}>
              <Image 
                source={{ uri: 'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.webp?a=1&b=1&s=612x612&w=0&k=20&c=u5RPl326UFf1oyrM1iLFJtqdQ3K28TdBdSaSPKeCrdc=' }}
                style={styles.profileImage}
              />
              
              <View style={styles.profileStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>1,234</Text>
                  <Text style={styles.statLabel}>Posts</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>5.6M</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>24</Text>
                  <Text style={styles.statLabel}>Following</Text>
                </View>
              </View>
            </View>

            {/* Kullanıcı Bilgileri */}
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Aclass</Text>
              <Text style={styles.profileBio}>Digital Content Creator | Photography Enthusiast</Text>
              <Text style={styles.profileLink}>www.aclass.example.com</Text>
            </View>

            {/* Paylaşımlar Grid */}
            <View style={styles.postsSection}>
              <Text style={styles.sectionTitle}>Posts</Text>
              <View style={styles.postsGrid}>
                {samplePosts.map((post) => (
                  <Image 
                    key={post.id}
                    source={{ uri: post.uri }}
                    style={styles.postImage}
                  />
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
    padding: 5,
  },
  modalContent: {
    flex: 1,
  },
  profileTopSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileStats: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
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
    color: '#666',
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
  postImage: {
    width: (width - 40) / 3, // 3 sütunlu grid
    height: (width - 40) / 3,
    marginBottom: 2,
  },
});

export default ProfilModal;