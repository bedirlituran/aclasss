import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage'ı import ediyoruz.

const Profile = () => {
  const [image, setImage] = useState(""); // Seçilen resmin URI'sini sakla

  // Resim seçme fonksiyonu
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImage(selectedImageUri);
      
      // Seçilen resmi AsyncStorage'a kaydediyoruz.
      try {
        await AsyncStorage.setItem("profileImage", selectedImageUri);
      } catch (error) {
        Alert.alert("Hata", "Resim kaydedilirken bir hata oluştu.");
      }
    }
  };

  // Uygulama açıldığında AsyncStorage'dan resim URI'sini yükle
  useEffect(() => {
    const loadImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem("profileImage");
        if (savedImage) {
          setImage(savedImage);
        }
      } catch (error) {
        Alert.alert("Hata", "Resim yüklenirken bir hata oluştu.");
      }
    };

    loadImage(); // Component mount olduğunda AsyncStorage'dan resmi yükle
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Sayfası</Text>

      {/* Profil Resmi */}
      <View style={styles.profileContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <Text style={styles.noImageText}>Profil resmi seçilmedi</Text>
        )}
      </View>

      {/* Resim Seçme Butonu */}
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Resim Seç</Text>
      </TouchableOpacity>
    </View>
  );
};

// Stil (CSS)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#fb5607",
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 16,
    color: "#888",
  },
  button: {
    backgroundColor: "#fb5607",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Profile;
