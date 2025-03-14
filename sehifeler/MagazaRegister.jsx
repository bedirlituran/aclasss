import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, ScrollView, Image, TouchableOpacity, Platform } from "react-native";
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { useRoute,useNavigation } from "@react-navigation/native";



export default function MagazaRegister() {
  const route = useRoute();
  const { magaza } = route.params;
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    email: "",
    sifre: "",
    sifreTekrar: "",
    unvan: "",
    etrafliUnvan: "",
    magazaAdi: "",
    profilSekli: null,
    elaqeNomresi: "",
    whatsappNomresi: "",
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Kütüphaneye erişim izni gerekli!');
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
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleChange('profilSekli', result.assets[0].uri);
    }
  };

  const handleRegister = () => {
    // Form verilerini işleyin veya gönderin
    console.log("Form Verileri:", formData);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mağaza Kayıt</Text>
      <View style={styles.inputView}>
      <TouchableOpacity onPress={handleSelectImage} style={styles.imagePicker}>
          <Text style={styles.imagePickerText}>Profil Resmi Seç</Text>
        </TouchableOpacity>
        {formData.profilSekli && (
          <Image source={{ uri: formData.profilSekli }} style={styles.profileImage} />
        )}
        <TextInput
          style={styles.input}
          placeholder="Ad"
          value={formData.ad}
          onChangeText={(value) => handleChange("ad", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Soyad"
          value={formData.soyad}
          onChangeText={(value) => handleChange("soyad", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(value) => handleChange("email", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          secureTextEntry
          value={formData.sifre}
          onChangeText={(value) => handleChange("sifre", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre Tekrar"
          secureTextEntry
          value={formData.sifreTekrar}
          onChangeText={(value) => handleChange("sifreTekrar", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Ünvan"
          value={formData.unvan}
          onChangeText={(value) => handleChange("unvan", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Etraflı Ünvan"
          value={formData.etrafliUnvan}
          onChangeText={(value) => handleChange("etrafliUnvan", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mağaza Adı"
          value={formData.magazaAdi}
          onChangeText={(value) => handleChange("magazaAdi", value)}
        />
      
        <TextInput
          style={styles.input}
          placeholder="Elaqe Nomresi"
          keyboardType="phone-pad"
          value={formData.elaqeNomresi}
          onChangeText={(value) => handleChange("elaqeNomresi", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Whatsapp Nomresi"
          keyboardType="phone-pad"
          value={formData.whatsappNomresi}
          onChangeText={(value) => handleChange("whatsappNomresi", value)}
        />
        <Button title="Kaydı Tamamla" type="solid" onPress={()=>navigation.navigate("Giris")} />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputView: {
    gap: 15,
    width: "100%",
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: "#fff",
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
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    margin:'auto'
  },
});
