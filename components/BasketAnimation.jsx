import React, { useState, useRef } from 'react';
import { View, Text, Pressable, Animated, Easing } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ShoppingCartAnimation = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    Animated.timing(animation, {
      toValue: isCartOpen ? 0 : 1,
      duration: 400,
      easing: Easing.elastic(1.2),
      useNativeDriver: true,
    }).start();
  };

  const cartScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const cartRotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={{ alignItems: 'center' }}>
      <Pressable onPress={toggleCart} style={{ padding: 10 }}>
        <Animated.View style={{ transform: [{ scale: cartScale }, { rotate: cartRotate }] }}>
        <Feather name="shopping-cart" size={24} color="black" />
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default ShoppingCartAnimation;
