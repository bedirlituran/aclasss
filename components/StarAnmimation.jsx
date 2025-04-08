import React, { useEffect, useState } from "react";
import { View, Pressable, Animated, Easing, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import { selectToken } from '../store/authSlice';
import axios from "axios";
import Constants from 'expo-constants';


const StarAnimation = ({ size, productId, disabled, initialIsLiked, favCount }) => {
  const [isFav, setIsFav] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(favCount);
  const [animation] = useState(new Animated.Value(1));
  const token = useSelector(selectToken);
  const apiUrl = Constants.expoConfig.extra.apiKey;

  const debouncedFavToggle = async (newIsLiked) => {
    try {
      const endpoint = newIsLiked ? `${apiUrl}/ratings/addRating?productId=${productId}` : `${apiUrl}/ratings/deleteRating?productId=${productId}`;
      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status !== 200) {
        setIsLiked(!newIsLiked); 
      }
    } catch (error) {
      console.error("Error with liking/unliking", error);
      setIsLiked(!newIsLiked);
    }
  }; 

  const toggleFav = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setCount(prevCount => newIsLiked ? prevCount + 1 : prevCount - 1);
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 2,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.spring(animation, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
    debouncedFavToggle(newIsLiked);
  };

  useEffect(() => {
    if (isLiked !== initialIsLiked) {
      setIsLiked(initialIsLiked);
    }
  }, [initialIsLiked]);

  const animatedStyle = {
    transform: [{ scale: animation }],
  };


  return (
    <View style={styles.container}>
      <Pressable key={isLiked} onPress={toggleFav} disabled={disabled} style={styles.button}>
        <Animated.View style={animatedStyle}>
          <FontAwesome
            name={isLiked ? "star" : "star-o"}
            size={24}
            color={isFav ? "gold" : disabled ? "black" : "black"}
          />
        </Animated.View>
      </Pressable>
      <Text style={styles.countText}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    padding: 10,
  },
  countText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default StarAnimation;
