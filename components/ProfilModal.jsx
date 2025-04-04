import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Dimensions ,Text,ScrollView,Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

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
              {/* Profil Resmi */}
              <View style={styles.profileImageContainer}>
                <Image 
                  source={{ uri: 'https://example.com/profile.jpg' }}
                  style={styles.profileImage}
                />
                <Text style={styles.profileName}>Turan Bedirhan</Text>
              </View>
              
              {/* Bilgiler */}
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
                <View style={styles.infoItem}>
                  <Ionicons name="mail-outline" size={20} color="#666" />
                  <Text style={styles.infoText}>turan@example.com</Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons name="call-outline" size={20} color="#666" />
                  <Text style={styles.infoText}>+994 55 808 08 01</Text>
                </View>
              </View>
              
              {/* Diğer içerikler... */}
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
    height: height * 0.9, // Ekranın %90'ı
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  closeButton: {
    padding: 5,
  },
  modalContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
  },
});

export default ProfilModal;