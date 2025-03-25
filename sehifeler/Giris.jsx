import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Input, Button } from "react-native-elements";
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../store/authSlice';
import { Ionicons } from "@expo/vector-icons";

const logo = require("../assets/3.png");

export default function Giris() {
  const [click, setClick] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
      
      if (response.data) {
        // Token'ı ve kullanıcı bilgilerini Redux'a kaydet
        dispatch(setToken(response.data.token || response.data));
        
     
        
        navigation.navigate("Main");
      }
    } catch (error) {
      console.error("Hata:", error.response?.data || error.message);
      alert("Giriş hatası: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} />
      <View style={styles.inputView}>
        <Input
          placeholder="İstifadəçi adı"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Input
          style={[styles.input, styles.passwordInput]}
          placeholder="Şifrə"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
          rightIcon={
            <Pressable onPress={() => setSecureText(!secureText)}>
              <Ionicons 
                name={secureText ? "eye-off" : "eye"} 
                size={20} 
                color="#6a1b9a" 
              />
            </Pressable>
          }
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
          <Pressable onPress={() => navigation.navigate("ResetPassword")}>
            <Text style={styles.forgetText}>Şifrəni unutdun?</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.buttonView}>
        <Button
          buttonStyle={styles.button}
          onPress={handleSubmit}
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
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  switch: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  rememberText: {
    fontSize: 14,
    color: "#555",
  },
  forgetText: {
    fontSize: 14,
    color: "#6a1b9a",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#6a1b9a",
    height: 50,
    borderRadius: 10,
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
    marginTop: 10,
  },
  footerText: {
    textAlign: "center",
    color: "gray",
    marginTop: 20,
    fontSize: 14,
  },
  signup: {
    color: "#6a1b9a",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
});