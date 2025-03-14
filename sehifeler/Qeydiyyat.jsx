import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
const logo = require("../assets/3.png");



export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const handleRegister = async () => {
    console.log(username + password +confirmPassword)

    try{
      const res = await axios.post("http://192.168.1.69:8080/web/login/registration",{
        username:username,
        password:password,
        repeatPassword:confirmPassword,
      });
      console.log(res.data);
    }catch(error){
        console.log(error);
    }
  


    if (password !== confirmPassword) {
      Alert.alert("Xəta", "Şifrelər eyni deyil!");
    } else if (password.length < 6) {
      Alert.alert("Hata", "Şifre en az 6 karakter olmalıdır!");
    }

    // Burada kayıt işlemini gerçekleştir
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode="contain" />
      {/* <Text style={styles.title}>Qeydiyyat</Text> */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="İSTİFADƏÇİ ADI"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="ŞİFRƏ"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="ŞİFRƏ TƏKRAR ET"
          secureTextEntry
          onChangeText={setConfirmPassword}
          autoCorrect={false}
          autoCapitalize="none"
          value={confirmPassword}

        />
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>QEYDİYYAT</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          Artıq hesabınız varsa?{" "}
          <Text
            style={{ color: "blue", fontWeight: "bold" }}
            onPress={() => navigation.navigate("Giris")}
          >
            Giriş
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 100,
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    height: 160,
    width: 160,
    marginBottom: 20,
    borderRadius: 80,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 40,
    color: "red",
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 7,
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
  },
  switch: {
    flexDirection: "row",
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberText: {
    fontSize: 13,
  },
  forgetText: {
    fontSize: 11,
    color: "red",
  },
  button: {
    backgroundColor: "red",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
    marginTop: 30,
  },
  optionsText: {
    textAlign: "center",
    paddingVertical: 10,
    color: "gray",
    fontSize: 13,
    marginBottom: 6,
  },
  mediaIcons: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 23,
  },
  icons: {
    width: 40,
    height: 40,
  },
  footerText: {
    textAlign: "center",
    color: "gray",
  },
  signup: {
    color: "red",
    fontSize: 13,
  },
});
