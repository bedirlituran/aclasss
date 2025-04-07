import React, { useState } from "react";
import { View, Pressable, Animated, Easing, Text, StyleSheet } from "react-native";
import CommentsScreen from '../components/CommentsScreen'; // Yorum sayfasını import ediyoruz.
import { FontAwesome5 } from "@expo/vector-icons";

const YorumAnimation = ({ disabled }) => {
  const [isFav, setIsFav] = useState(false);
  const [count, setCount] = useState(0);
  const [animation] = useState(new Animated.Value(1));
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleFav = () => {
    if (disabled) return; // Eğer disabled true ise işlem yapma

    setIsModalVisible(true);
    setIsFav(!isFav);
    setCount((prevCount) => (isFav ? prevCount - 1 : prevCount + 1));

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

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleFav} disabled={disabled} style={styles.button}>
        <Animated.View style={animatedStyle}>
          <FontAwesome5
            name="comments"
            size={24}
          />
        </Animated.View>
      </Pressable>
      <Text style={styles.countText}>{count}</Text>
      {/* Yorumlar modalı */}
      {isModalVisible && !disabled && (
        <CommentsScreen
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
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

export default YorumAnimation;
