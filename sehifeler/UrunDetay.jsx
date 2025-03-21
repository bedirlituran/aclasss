import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../store/reviewActions";
import { addToCart } from "../store/cartSlice";
import Modal from "react-native-modal";
import { PinchGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const UrunDetay = ({ route }) => {
  const { title, description, price, image } = route.params;
  const [inputValue, setInputValue] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const scale = useSharedValue(1);
  const reviews = useSelector((state) => state.reviews.reviews);
  const dispatch = useDispatch();

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      const newReview = {
        comment: inputValue,
        date: new Date().toLocaleString(),
      };
      dispatch(addReview(newReview));
      setInputValue("");
    } else {
      console.log("Error: Lütfen geçerli bir yorum girin.");
    }
  };

  const handleAddToCart = () => {
    const product = {
      title,
      description,
      price,
      image,
    };
    dispatch(addToCart(product));
  };

  const onPinchGestureEvent = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = event.scale;
    },
    onEnd: () => {
      scale.value = withTiming(1, { duration: 200 });
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={{ uri: image }} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{description}</Text>
      <View
        style={{
          width: width * 0.89,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
        }}
      >
        <Text style={styles.price}>{price} {"\u20BC"}</Text>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          title="Add to Cart"
        >
          <Text style={styles.addToCartText}>Səbətə yüklə</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Fikir bildir..."
        value={inputValue}
        onChangeText={handleInputChange}
        returnKeyType="done"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Göndər</Text>
      </TouchableOpacity>

      <View style={styles.reviewsContainer}>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <View key={index} style={styles.review}>
              <Text style={styles.reviewText}>Şərh: {review.comment}</Text>
              <Text style={styles.reviewDate}>Tarix: {review.date}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noReview}>Şərh yoxdur...</Text>
        )}
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
            <Animated.View style={[styles.fullImageContainer, animatedStyle]}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <MaterialIcons name="close" size={35} color="yellow" />
              </TouchableOpacity>
              <Image source={{ uri: image }} style={styles.fullImage} />
            </Animated.View>
          </PinchGestureHandler>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    width: width,
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#fb5607",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "80%",
    height: 250,
    borderRadius: 10,
    alignSelf: "center",
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    marginVertical: 10,
    textAlign: "center",
    color: "#333",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
  },
  reviewsContainer: {
    marginTop: 20,
    paddingBottom: 30,
  },
  review: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  reviewText: {
    fontSize: 14,
    marginVertical: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: "#888",
    marginVertical: 2,
  },
  noReview: {
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
    color: "#888",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black", // Full-screen background
  },
  fullImageContainer: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
});

export default UrunDetay;