import { Ionicons, Fontisto, MaterialIcons, FontAwesome ,FontAwesome5} from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from "react-native";
import { useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/native";

import { logout } from '../store/authSlice';
const UserProfil = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const handlePhoneCall = () => {
    Linking.openURL(`tel:0558080801`);
  };

  const handleWhatsApp = () => {
    Linking.openURL(`https://wa.me/994558080801`);
  };

  const openSocialMedia = (url) => {
    Linking.openURL(url).catch(err => console.error("Bağlantı açılamadı", err));
  };



  const handleLogout = () => {
    dispatch(logout());
    navigation.replace('Esasgiris');
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profil Header */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>PR</Text>
          </View>
          <View>
            <Text style={styles.welcomeText}>Xoş gəlmisiniz</Text>
            <Text style={styles.title}>Profilim</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="white" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* Ülke Bilgisi */}
      <View style={styles.profileDetails}>
        <View style={styles.detailHeader}>
          <Ionicons name="location-outline" size={20} color="#6a1b9a" />
          <Text style={styles.detailTitle}>Çatdırılma Ölkəsi</Text>
        </View>
        
        <View style={styles.countryInfo}>
          <Image 
            source={require('../assets/bayraq.png')} 
            style={styles.flagImage}
          />
          <Text style={styles.countryText}>Azərbaycan</Text>
        </View>
      </View>

      {/* Reklam Banner */}
      <View style={styles.adBanner}>
        <Image 
          source={require('../assets/reklam.png')} 
          style={styles.adImage}
        />
      </View>

      {/* Diğer Profil Bilgileri */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hesab Məlumatları</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="person-outline" size={20} color="#6a1b9a" />
          <Text style={styles.infoText}>Profil məlumatları</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="card-outline" size={20} color="#6a1b9a" />
          <Text style={styles.infoText}>Ödəniş üsulları</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
        <View style={styles.infoItem}>
        <FontAwesome name="street-view" size={24} color="#6a1b9a" />
          <Text style={styles.infoText}>Unvan melumatlari</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Xidmetler</Text>
        </View>
        <View style={styles.infoItem}>
          <FontAwesome name="handshake-o" size={18} color="#6a1b9a" />
          <Text style={styles.infoText}>Alici muqavilesi</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="security" size={20} color="#6a1b9a" />
          <Text style={styles.infoText}>Mexfilik siyaseti</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="bus-sharp" size={20} color="#6a1b9a" />
          <Text style={styles.infoText}>Catdirilma</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
        <View style={styles.infoItem}>
          <Fontisto name="arrow-return-left" size={20} color="#6a1b9a" />
          <Text style={styles.infoText}>Qaytarilma</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="border-color" size={20} color="#6a1b9a" />
          <Text style={styles.infoText}>Sifaris</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
      </View>

      {/* Çıkış ve İletişim Bilgileri */}
      <View style={styles.contactSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Bizimlə Əlaqə</Text>
        </View>
        
        {/* Telefon Numarası */}
        <TouchableOpacity style={styles.contactItem} onPress={handlePhoneCall}>
          <Ionicons name="call-outline" size={24} color="#6a1b9a" />
          <Text style={styles.contactText}>Admin:055 808 08 01</Text>
        </TouchableOpacity>
        
        {/* WhatsApp */}
        
        
        {/* Sosyal Medya */}
        <View style={styles.socialMediaContainer}>
          <TouchableOpacity onPress={() => openSocialMedia('https://t.me/yourchannel')}>
            <Fontisto name="telegram" size={28} color="#0088cc" style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openSocialMedia('https://facebook.com/yourpage')}>
            <Fontisto name="facebook" size={28} color="#3b5998" style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openSocialMedia('https://instagram.com/yourprofile')}>
            <Fontisto name="instagram" size={28} color="#E1306C" style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openSocialMedia('https://tiktok.com/@yourprofile')}>
            <FontAwesome5 name="tiktok" size={28} color="#000000" style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleWhatsApp}>
          <Fontisto name="whatsapp" size={28} color="green" style={styles.socialIcon}/>
        </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Çıxış</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: "#6a1b9a",
    height: 80,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ffd600',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  welcomeText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    right: 6,
    top: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff4757',
  },
  profileDetails: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  countryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  flagImage: {
    width: 40,
    height: 25,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  countryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 12,
  },
  adBanner: {
    backgroundColor: 'white',
    borderRadius: 15,
    height: 120,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  adImage: {
    width: '100%',
    height: '100%',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  sectionHeader: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
  },
  contactSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    fontWeight:"bold",
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  socialIcon: {
    marginHorizontal: 5,
  },
  logoutButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  logoutText: {
    color: '#6a1b9a',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfil;