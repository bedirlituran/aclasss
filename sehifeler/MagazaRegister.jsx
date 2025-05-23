import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Platform } from "react-native";
import { Button, Input } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setUser } from '../store/authSlice';
import Constants from 'expo-constants';

export default function MagazaRegister() {
  const apiUrl = Constants.expoConfig.extra.apiKey;
  const route = useRoute();
  const { magaza } = route.params;
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    voen: "",
    address: "",
    username: "",
    phoneNumber: "",
    wpNumber: "",
    desc: "",
  });
  const dispatch = useDispatch();
  const register = async () => {
    try {
      let formD = new FormData();
      
      // Kullanıcı bilgilerini JSON olarak ekle (sunucunun beklediği anahtar ismiyle)
      formD.append("user", JSON.stringify(formData)); // "authRequest" yerine "user" olabilir
      
      // Resmi ekle (sunucunun beklediği anahtar ismiyle)
      if (imageUri) {
        let filename = imageUri.split('/').pop();
        
        formD.append('profilePic', {  // "profilePic" yerine "profileImage" olabilir
          uri: imageUri,
          name: filename,
          type: 'image/jpeg',  // Türü sabit olarak jpeg yapıyoruz
        });
      }
  
      const response = await axios.post(apiUrl + '/auth/register', formD, {
        headers: {
          "Content-Type": "multipart/form-data",  // Bu header önemli
        },
      });
      dispatch(setUser({ 
        ...response.data.user, 
        userType: "SELLER" 
      }));
      navigation.navigate("Main");
    } catch (error) {
      console.error("Hata:", error.response?.data || error.message);
      alert("Kayıt sırasında hata oluştu: " + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          console.log('Kütüphaneye erişim izni gerekli!');
        }
      }
    })();
  }, []);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleRegister = () => {
  
    register();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputView}>
        <TouchableOpacity onPress={handleSelectImage} style={styles.imagePicker}>
          <Text style={styles.imagePickerText}>Profil Şəkli Seç</Text>
        </TouchableOpacity>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
        )}
        <Input
          placeholder="İstifadəçi Adı"
          value={formData.username}
          onChangeText={(value) => handleChange("username", value)}
        />
        <Input
          placeholder="Ad"
          value={formData.firstName}
          onChangeText={(value) => handleChange("firstName", value)}
        />
        <Input
          placeholder="Soyad"
          value={formData.surname}
          onChangeText={(value) => handleChange("surname", value)}
        />
        <Input
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(value) => handleChange("email", value)}
        />
        <Input
          placeholder="Şifrə"
          secureTextEntry
          value={formData.password}
          onChangeText={(value) => handleChange("password", value)}
        />
      
        <Input
          placeholder="Vöen"
          value={formData.voen}
          onChangeText={(value) => handleChange("voen", value)}
        />
        <Input
          placeholder="Ətraflı ünvan"
          value={formData.address}
          onChangeText={(value) => handleChange("address", value)}
        />
        <Input
          placeholder="Mağaza adı"
          value={formData.name}
          onChangeText={(value) => handleChange("name", value)}
        />
        <Input
          placeholder="Əlaqə nömrəsi"
          keyboardType="phone-pad"
          value={formData.phoneNumber}
          onChangeText={(value) => handleChange("phoneNumber", value)}
        />
        <Input
          placeholder="Whatsapp nömrəsi"
          keyboardType="phone-pad"
          value={formData.wpNumber}
          onChangeText={(value) => handleChange("wpNumber", value)}
        />
        <Input
          placeholder="Açıqlama"
          value={formData.desc}
          onChangeText={(value) => handleChange("desc", value)}
          multiline
        />

        <Button 
          title="Qeydiyyatı tamamla" 
          type="solid" 
          onPress={handleRegister} 
          buttonStyle={styles.registerButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  inputView: {
    gap: 15,
    width: "100%",
  },
  imagePicker: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  imagePickerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  profileImage: {
    width: 200,
    height: 120,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: "center",
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: "#28a745",
  },
});