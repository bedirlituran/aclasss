import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Linking, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Expo'dan bir ikon paketi

const WhatsAppButton = ({ phoneNumber, message }) => {
  const openWhatsApp = () => {
    if (!phoneNumber) {
      Alert.alert("Xəta", "Xaiş edirik telefon nömrəsi daxil edin.");
      return;
    }

    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Xəta", "WhatsApp tətbiqi cihazınızda tapılmadı.");
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("URL açma hatası:", err));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openWhatsApp}>
        <Ionicons name="logo-whatsapp" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#25D366", // WhatsApp'ın yeşil tonu
    paddingVertical: 3,
    paddingHorizontal: 3,
    borderRadius: 25,
 
  },

});

export default function App() {
  return (
    <WhatsAppButton
      phoneNumber="+994558080801"
      message="Salam! Hörmetli Satıcı.Məhsul haqqında məlumat almaq istərdim!" // Gönderilecek mesaj
    />
  );
}
