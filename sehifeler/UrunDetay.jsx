import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";

const UrunDetay = ({ route }) => {
  const { image, title, description, price } = route.params;
  const [inputValue, setInputValue] = useState(""); // inputValue sadece bir yorum alacak
  const [reviews, setReviews] = useState([]); // yorumları tutacak
  const [loading, setLoading] = useState(false); // Yorum gönderme sırasında loader

  const handleInputChange = (text) => {
    setInputValue(text); // Kullanıcının girdiği değeri güncelliyoruz
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setLoading(true); // Yorum eklenmeden önce loader'ı göster
      setTimeout(() => {
        // Yorum eklenmesi simülasyonu için timeout
        const newReview = {
          comment: inputValue,
          date: new Date().toLocaleString(), // Yorumun tarihini ekliyoruz
        };
        setReviews((prevReviews) => [...prevReviews, newReview]); // Yorum ekleyip array'i güncelliyoruz
        setInputValue(""); // Yorum ekledikten sonra inputu temizle
        setLoading(false); // Yorum ekleme tamamlandığında loader'ı kaldır
      }, 1000); // 1 saniyelik gecikme simülasyonu
    } else {
      console.log("Error", "Please enter a value.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{description}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.subtitle}>Şərhlər</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Yorumunuzu girin"
        value={inputValue}
        onChangeText={handleInputChange} // Kullanıcı girişini handle et
        onSubmitEditing={handleSubmit} // "Enter" tuşuna basıldığında form gönderilsin
        returnKeyType="done" // Klavye üzerinde "Done" tuşu görünsün
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" /> // Yükleme animasyonu
        ) : (
          <Text style={styles.buttonText}>Yorum Gönder</Text>
        )}
      </TouchableOpacity>
      
      <View style={styles.reviewsContainer}>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <View key={index} style={styles.review}>
              <Text style={styles.reviewText}>Yorum: {review.comment}</Text>
              <Text style={styles.reviewDate}>Tarih: {review.date}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noReview}>Henüz yorum yapılmadı</Text>
        )}
      </View>
    </ScrollView>
);};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "70%",
    height: 240,
    borderRadius: 10,
    alignSelf: 'center',
    objectFit:"contain",
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
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
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
