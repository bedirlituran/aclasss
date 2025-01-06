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

// const logo = require("../assets/3.webp");

// contact me :)
// instagram: must_ait6
// email : mustapha.aitigunaoun@gmail.com

export default function Giris() {
  const [click, setClick] = useState(false);
  const { username, setUsername } = useState("");
  const { password, setPassword } = useState("");
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
      return response.data; // API'den dönen veri
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error);
      throw error; // Hata fırlatılırsa yakalayabilirsiniz
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image source={logo} style={styles.image} resizeMode="contain" /> */}
      <Text style={styles.title}>Giriş</Text>
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
          {" "}
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
    backgroundColor: "black",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
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
    marginTop: 10,
  },
  signup: {
    color: "blue",
    fontSize: 13,
    fontWeight: "bold",
  },
});
