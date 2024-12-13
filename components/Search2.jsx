import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Arama ikonu için

const Search2 = () => {
  const [isFocused, setIsFocused] = useState(false);
  const inputWidth = useRef(new Animated.Value(100)).current; // İlk genişlik küçük

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(inputWidth, {
      toValue: 180, // Tıklandığında genişleyeceği alan
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(inputWidth, {
      toValue: 100, // Eski genişliğe dönüş
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleOutsidePress = () => {
    if (isFocused) {
      handleBlur();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleFocus}>
          <Animated.View style={[styles.searchContainer, { width: inputWidth }]}>
            <Ionicons name="search" size={20} color="#54342b" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Axtar"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal:10,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 5, // İkonla input arasında boşluk
  },
  icon: {
    marginRight: 5,
  },
});

export default Search2;
