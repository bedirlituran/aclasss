import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation,useNavigationState } from "@react-navigation/native";
const Bottomlink = ({ scrollY, isFirstClick, scrollToTop }) => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Sekil');  // Başlangıçta 'Sekil' seçili

  const handlePress = (screenName) => {
    if (isFirstClick) {
      navigation.reset({ index: 0, routes: [{ name: 'Sekil' }] });
    } else if (scrollY > 0) { // scrollY'nin 0'dan büyük olup olmadığını kontrol et
      scrollToTop();
    } else {
      navigation.navigate(screenName);
    }
    
    setSelectedTab(screenName);  // Tıklanan tab'ı seçili hale getir
  };
  
  
  // Sekme için stil belirleme
  const getTabStyle = (tabName) => {
    return selectedTab === tabName ? styles.selectedTab : styles.defaultTab;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, getTabStyle('Sekil')]}
        onPress={() => handlePress('Sekil')}
      >
        <Ionicons name="home" size={25} color={selectedTab === 'Sekil' ? '#fb5607' : '#54342b'} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, getTabStyle('SearchScreen')]}
        onPress={() => handlePress('SearchScreen')}
      >
        <FontAwesome name="search" size={25} color={selectedTab === 'SearchScreen' ? '#fb5607' : '#54342b'}/>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, getTabStyle('FavoriteScreen')]}
        onPress={() => handlePress('FavoriteScreen')}
      >
        <FontAwesome name="heartbeat" size={24} color={selectedTab === 'FavoriteScreen' ? '#fb5607' : '#54342b'} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, getTabStyle('Sebetim')]}
        onPress={() => handlePress('Sebetim')}
      >
        <Ionicons name="cart" size={30} color={selectedTab === 'Sebetim' ? '#fb5607' : '#54342b'} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, getTabStyle('Profile')]}
        onPress={() => handlePress('Profile')}
      >
        <Ionicons name="person" size={25} color={selectedTab === 'Profile' ? '#fb5607' : '#54342b'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 50,
    borderBottomColor: "gray",
    borderWidth: 0.5,
    borderColor: "#ffecfb",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#fffbfb",
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    marginTop: 1,
    fontSize: 12,
    color: "black",
  },
  selectedTab: {
    opacity: 1,  // Seçilen butonun opaklık değeri
    transform: [{ scale: 1.2 }], // Seçilen buton biraz daha büyük olacak
   
  },
  defaultTab: {
    backgroundColor: "transparent", // Varsayılan tabda arka plan yok
  },
});

export default Bottomlink;
