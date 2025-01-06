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
import { addToCart } from "../store/cartSlice"; // addToCart importu

const {width } = Dimensions.get("window");

const UrunDetay = ({ route }) => {
  const { title, description, price, image } = route.params; // Parametreleri alıyoruz
  const [inputValue, setInputValue] = useState(""); // Kullanıcının gireceği yorum
  const reviews = useSelector((state) => state.reviews.reviews); // Redux store'dan yorumları alıyoruz
  const dispatch = useDispatch(); // Dispatch fonksiyonunu alıyoruz

  const handleInputChange = (text) => {
    setInputValue(text); // Yorum inputu güncelleniyor
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      const newReview = {
        comment: inputValue,
        date: new Date().toLocaleString(), // Yorum tarihi
      };
      dispatch(addReview(newReview)); // Redux store'a yeni yorumu ekliyoruz
      setInputValue(""); // Yorum ekledikten sonra inputu sıfırlıyoruz
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
    dispatch(addToCart(product)); // Sepete ekleme
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{description}</Text>
      <View
        className="flex-row items-center justify-between py-2 px-1"
        style={{ width: width * 0.89 }}
      >
        <Text style={styles.price}>{price} {'\u20BC'}</Text>
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
        placeholder="Yorumunuzu girin"
        value={inputValue}
        onChangeText={handleInputChange}
        returnKeyType="done"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Yorum Gönder</Text>
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
          <Text style={styles.noReview}>Henüz yorum yapılmadı</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    width: width,
    paddingVertical: -60,
    paddingHorizontal:20
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#fb5607",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  image: {
    width: "70%",
    height: 240,
    borderRadius: 10,
    alignSelf: "center",
    objectFit: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  reviewsContainer: {
    marginTop: 20,
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
});

export default UrunDetay;
