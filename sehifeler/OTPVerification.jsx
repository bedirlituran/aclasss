import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, TextInput, View, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Button } from 'react-native-elements';

export default function OTPVerification() {
  const [otp, setOtp] = useState("");
  const route = useRoute();
  const { magaza } = route.params;
  const navigation = useNavigation();

  // OTP doğrulama fonksiyonu yorum satırına alındı
  // const handleVerifyOTP = async () => { ... };

  const handleProceed = () => {
    // OTP doğrulama yerine mağaza sahibi bilgilerini toplayacağımız sayfaya yönlendirme
    navigation.navigate("MagazaRegister", { magaza });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>OTP Doğrulama</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="OTP kodunu daxil edin"
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
        />
        <Button title="İrəli" type="solid" onPress={handleProceed} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
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
    paddingHorizontal: 40,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: "#fff",
  },
});
