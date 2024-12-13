import React, { useState } from "react";
import { View, Pressable, Animated, Easing } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const HeartAnimation = ({ color, image, onAddFavorite,name }) => {
  const [isFav, setIsFav] = useState(false);
  const [animation] = useState(new Animated.Value(1));

  const toggleFav = () => {
    setIsFav(!isFav);

    if (!isFav && onAddFavorite) {
      onAddFavorite(image); 
    }

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
    <View style={{ alignItems: "center" }}>
      <Pressable onPress={toggleFav} style={{ padding: 10 }}>
        <Animated.View style={animatedStyle}>
          <AntDesign
            name={isFav ? "heart" : "hearto"}
            size={24}
            color={isFav ? "red" : "black"}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default HeartAnimation;
