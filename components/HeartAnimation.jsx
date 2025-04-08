import React, { useEffect, useState, useRef } from "react"; // useRef eklendi
import { View, Pressable, Animated, Easing, TouchableOpacity} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import Constants from 'expo-constants';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { selectToken } from '../store/authSlice';
import { useSelector } from 'react-redux';
import debounce from "lodash.debounce";

const HeartAnimation = ({ color, image, onAddFavorite, name, size: initialSize, productId, initialIsLiked }) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [count, setCount] = useState(initialSize);
  const [animation] = useState(new Animated.Value(1));
  const token = useSelector(selectToken);
  const apiUrl = Constants.expoConfig.extra.apiKey;
  const isRequesting = useRef(false); 

  const debouncedLikeToggle = async (newIsLiked) => {
    try {
      const endpoint = newIsLiked ? `${apiUrl}/likes/like?productId=${productId}` : `${apiUrl}/likes/unlike?productId=${productId}`;
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
  
  const handleLikeToggle = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked); // UI'yi anında değiştir
  
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
  
    debouncedLikeToggle(newIsLiked); // Backend isteğini sonra çalıştır
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
    <View style={{ alignItems: "center" }}>
      <Pressable key={isLiked} activeOpacity={0.7} onPress={handleLikeToggle} style={{ padding: 10 }}>
      <Animated.View style={animatedStyle}>
          <AntDesign
            name={isLiked ? "heart" : "hearto"}
            size={24}
            color={isLiked ? "red" : "black"}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default HeartAnimation;