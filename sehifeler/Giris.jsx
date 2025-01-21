import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { Buffer } from 'buffer';
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons'; // Icon kütüphanesi

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
    const token = generateBasicToken(username, password);
    console.log(token);
    
    try {
      const response = await axios.get("http://192.168.1.69:8080/api/login", {
        headers: {
          Authorization: token, 
        },
      });
  
      console.log("Login successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputs}
          placeholder="İSTİFADƏÇİ ADI"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="ŞİFRƏ"
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Pressable onPress={() => setSecureText(!secureText)}>
            <Icon name={secureText ? "eye-off" : "eye"} size={20} color="gray" />
          </Pressable>
        </View>
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
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Giriş</Text>
        </Pressable>
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
    resizeMode: 'contain',
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
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 7,
    paddingHorizontal: 10,
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
    color: '#fff',
    fontWeight: 'bold',
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
    borderWidth:1
  },
});
