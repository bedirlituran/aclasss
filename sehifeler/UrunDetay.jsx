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
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../store/reviewActions";
import { addToCart } from "../store/cartSlice";
import Toast from "react-native-toast-message";

import Modal from "react-native-modal";
import { PinchGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { selectIsLoggedIn } from "../store/authSlice";

const { width, height } = Dimensions.get("window");

const UrunDetay = ({ route, navigation }) => {
  const { title, description, price, image } = route.params;
  const [inputValue, setInputValue] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const scale = useSharedValue(1);
  const reviews = useSelector((state) => state.reviews.reviews);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    if (!isLoggedIn) {
      showAuthAlert();
      return;
    }

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
    if (!isLoggedIn) {
      showAuthAlert();
      return;
    }
  
    const product = {
      id: route.params.id, // Əgər id parametri varsa
      title: route.params.title,
      description: route.params.description,
      price: route.params.price,
      image: route.params.image,
      fileString: route.params.image, // Əgər CardItem-də fileString istifadə olunursa
      brand: route.params.title, // Əgər brand istifadə olunursa
      sellingPrice: route.params.price // Əgər sellingPrice istifadə olunursa
    };
  
    dispatch(addToCart(product));
    Toast.show({
      type: 'success',
      text1: 'Əlavə edildi',
      text2: 'Məhsul səbətə əlavə olundu ✅',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };
  
  const showAuthAlert = () => {
    Alert.alert(
      "Giriş tələb olunur",
      "Bu əməliyyatı yerinə yetirmək üçün qeydiyyatdan keçməlisiniz.",
      [
        { text: "İmtina", style: "cancel" },
        { text: "Qeydiyyat", onPress: () => navigation.navigate("Qeydiyyat") },
      ]
    );
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
          alignItems: "center",
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
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#fefefe",
  },
  image: {
    width: width * 0.9,
    height: 250,
    borderRadius: 12,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    color: "#222",
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    textAlign: "center",
    color: "#555",
    lineHeight: 22,
    marginBottom: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#27ae60",
  },
  addToCartButton: {
    backgroundColor: "#00b894",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    backgroundColor: "#388e3c",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  reviewsContainer: {
    marginTop: 20,
    paddingBottom: 40,
  },
  review: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  reviewText: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
  },
  noReview: {
    fontStyle: "italic",
    textAlign: "center",
    color: "#888",
    marginTop: 10,
  },
  modalContent: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#222",
    padding: 8,
    borderRadius: 20,
    opacity: 0.8,
  },
  
});


export default UrunDetay;
