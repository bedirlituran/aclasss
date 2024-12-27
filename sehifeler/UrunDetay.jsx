import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet,Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../store/reviewActions';

const UrunDetay = ({ route }) => {
  const { title, description, price,image } = route.params;
  const [inputValue, setInputValue] = useState(''); // Kullanıcının gireceği yorum
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
      setInputValue(''); // Yorum ekledikten sonra inputu sıfırlıyoruz
    } else {
      console.log('Error: Lütfen geçerli bir yorum girin.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image }} style={styles.image}/>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{description}</Text>
      <Text style={styles.price}>{price}</Text>

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
              <Text style={styles.reviewText}>Yorum: {review.comment}</Text>
              <Text style={styles.reviewDate}>Tarih: {review.date}</Text>
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
    backgroundColor: '#fff',
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
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  reviewsContainer: {
    marginTop: 20,
  },
  review: {
    backgroundColor: '#f9f9f9',
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
    color: '#888',
    marginVertical: 2,
  },
  noReview: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
    color: '#888',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UrunDetay;
