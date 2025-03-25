import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { Buffer } from "buffer";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Input, Button } from "react-native-elements";

const logo = require("../assets/3.png");

export default function Giris() {
  const [click, setClick] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true); // Parola gizleme durumu
  const navigation = useNavigation();

  const generateBasicToken = (username, password) => {
    return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://192.168.0.107:8081/api/auth/login",
        {
          username: username,
          password: password,
        },
      );

      console.log("Başarılı:", response.data);
      if (response.data != null) {
        navigation.navigate("Main");
      }
    } catch (error) {
      console.error("Hata:", error.response?.data || error.message);
      alert(
        "Kayıt sırasında hata oluştu: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} />
      <View style={styles.inputView}>
        <Input
          // style={styles.inputs}
          placeholder="İstifadəçi adı"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Input
          style={[styles.input, styles.passwordInput]}
          placeholder="Şifrə"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.rememberView}>
        <View style={styles.switch}>
          <Switch
            value={click}
            onValueChange={setClick}
            trackColor={{ true: "green", false: "gray" }}
          />
          <Text style={styles.rememberText}>Məni xatırla</Text>
        </View>
        <View>
          <Pressable onPress={() => Alert.alert("Forget Password!")}>
            <Text style={styles.forgetText}>Şifrəni unutdun?</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.buttonView}>
        <Button
          style={styles.button}
          onPress={handleSubmit}
          type="solid"
          title="Giriş"
        />
      </View>

      <Text style={styles.footerText}>
        Hesabın yoxdur?
        <Text
          style={styles.signup}
          onPress={() => navigation.navigate("Qeydiyyat")}
        >
          Qeydiyyat
        </Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 100,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    flex: 1,
  },
  image: {
    height: 160,
    width: 160,
    resizeMode: "contain",
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 8,
    borderColor: "red",
    borderRadius: 7,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    height: 50,
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
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
  },
  footerText: {
    textAlign: "center",
    color: "gray",
    marginTop: 10,
  },
  signup: {
    color: "blue",
    fontSize: 13,
    fontWeight: "bold",
  },
  inputs: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "red",
    borderRadius: 7,
    borderWidth: 1,
  },
});
