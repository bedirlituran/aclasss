import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Search2 = () => {
  const [isFocused, setIsFocused] = useState(false);
  const inputWidth = useRef(new Animated.Value(50)).current; // İlk genişlik ayarı

  // Genişleme animasyonu için
  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(inputWidth, {
      toValue: 180, // Tıklandığında genişleyecek alan
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Daralma animasyonu için
  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(inputWidth, {
      toValue: 100, // Eski genişliğe dönüş
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Input dışında bir yere tıklandığında
  const handleOutsidePress = () => {
    if (isFocused) {
      handleBlur();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <Animated.View style={[styles.searchContainer, { width: inputWidth }]}>
        
          <TextInput
            style={styles.input}
            placeholderTextColor="#999"
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder='axtar...'
          />
            <Ionicons name="search" size={18} color="#54342b" style={styles.icon} />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width:'10px'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 'auto',
    borderRadius: 20,
    borderBottomColor:"black",
    borderBottomWidth: 0.5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333', // Giriş metni rengi
    marginLeft: 8, // İkonla boşluk
  },
  
});

export default Search2;
