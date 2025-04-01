import React, { useEffect, useState } from "react";
import { View, Pressable, Animated, Easing, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import { selectToken } from '../store/authSlice';
import axios from "axios";
const StarAnimation = ({ size,productId }) => {
  const [isFav, setIsFav] = useState(false);
  const [count, setCount] = useState(size);
  const [animation] = useState(new Animated.Value(1));
  const token = useSelector(selectToken);
  const toggleFav = () => {
    setIsFav(!isFav);
    setCount(count + 1)
    handleSubmit()
    if (isFav) {
      setCount(count - 1)
    };
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
  };

  const animatedStyle = {
    transform: [{ scale: animation }],
  };
  const handleSubmit = async () => {
    try {
      console.log(productId);
      
      const response = await axios.post(
        "http://35.159.64.205:8081/api/likes/like?productId="+productId, {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

    } catch (error) {
      console.error("Hata:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
 
  }, []);
  return (
    <View style={{ alignItems: "center",flexDirection: "row",justifyContent: "center" }}>
      <Pressable onPress={toggleFav} style={{ padding: 10 }}>
        <Animated.View style={animatedStyle}>
          <FontAwesome
            name={isFav ? "star" : "star-o"}
            size={24}
            color={isFav ? "gold" : "black"}
          />
        </Animated.View>
      </Pressable>
      <Text style={{ marginTop: 10 }}>{`${count}`}</Text>
    </View>
  );
};

export default StarAnimation;
