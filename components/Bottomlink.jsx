import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation, useNavigationState } from "@react-navigation/native";

const Bottomlink = ({ scrollY, isFirstClick, scrollToTop }) => {
  const navigation = useNavigation();
  const currentRoute = useNavigationState(state => state?.routes[state?.index]?.name); // Safe access
  const [lastTabPress, setLastTabPress] = useState(null); // Son tıklanan sekme bilgisi

  const handlePress = (screenName) => {
    if (currentRoute === screenName) {
      // Eğer şu anda aynı sayfadaysak
      if (lastTabPress === screenName) {
        navigation.reset({ index: 0, routes: [{ name: screenName }] }); // Sayfayı yenile
      }
    } else {
      // Başka bir sekmeden geliyorsak yalnızca yönlendir
      navigation.navigate(screenName);
    }

    setLastTabPress(screenName); // Son tıklanan sekme güncellenir
  };

  // Sekme için stil belirleme
  const getTabStyle = (tabName) => {
    return currentRoute === tabName ? styles.selectedTab : styles.defaultTab;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, getTabStyle('Sekil')]}
        onPress={() => handlePress('Sekil')}
      >
        <Ionicons name="home" size={25} color={currentRoute === 'Sekil' ? '#fb5607' : '#54342b'} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, getTabStyle('SearchScreen')]}
        onPress={() => handlePress('SearchScreen')}
      >
        <FontAwesome name="search" size={25} color={currentRoute === 'SearchScreen' ? '#fb5607' : '#54342b'} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, getTabStyle('FavoriteScreen')]}
        onPress={() => handlePress('FavoriteScreen')}
      >
        <FontAwesome name="heartbeat" size={24} color={currentRoute === 'FavoriteScreen' ? '#fb5607' : '#54342b'} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, getTabStyle('Sebetim')]}
        onPress={() => handlePress('Sebetim')}
      >
        <Ionicons name="cart" size={30} color={currentRoute === 'Sebetim' ? '#fb5607' : '#54342b'} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, getTabStyle('Profile')]}
        onPress={() => handlePress('Profile')}
      >
        <Ionicons name="person" size={25} color={currentRoute === 'Profile' ? '#fb5607' : '#54342b'} />
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
    zIndex: 2000,
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
  selectedTab: {
    opacity: 1,
    transform: [{ scale: 1.2 }], // Seçilen buton biraz daha büyük olacak
  },
  defaultTab: {
    backgroundColor: "transparent",
  },
});

export default Bottomlink;
