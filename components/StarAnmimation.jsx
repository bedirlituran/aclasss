import React, { useEffect, useState } from "react";
import { View, Pressable, Animated, Easing, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import { selectToken } from '../store/authSlice';
import axios from "axios";

const StarAnimation = ({ size, productId, disabled }) => {
  const [isFav, setIsFav] = useState(false);
  const [count, setCount] = useState(size);
  const [animation] = useState(new Animated.Value(1));
  const token = useSelector(selectToken);

  const toggleFav = () => {
    if (disabled) return; // Eğer disabled true ise işlem yapma

    setIsFav(!isFav);
    setCount((prevCount) => (isFav ? prevCount - 1 : prevCount + 1));
    handleSubmit();

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
        "http://35.159.64.205:8081/api/likes/like?productId=" + productId,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

    } catch (error) {
      console.error("Hata:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    // İlk yüklemede veya bağımlılıklar değiştiğinde yapılacak işlemler
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleFav} disabled={disabled} style={styles.button}>
        <Animated.View style={animatedStyle}>
          <FontAwesome
            name={isFav ? "star" : "star-o"}
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
