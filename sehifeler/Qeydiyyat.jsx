import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Button,Input } from 'react-native-elements';

const logo = require("../assets/3.png");

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [magaza, setMagaza] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigation = useNavigation();
  const [selected, setSelected] = useState("istifadeci");

  // OTP göndərmək funksiyası
  const handleSendOTP =  () => {
    // if (!magaza || magaza.length < 10) {
    //   Alert.alert("Hata", "Lütfen doğru telefon numarası girin!");
    //   return;
    // }

    // try {
    //   const res = await axios.post("http://192.168.1.69:8080/web/login/send-otp", { magaza });
    //   console.log(res.data);
    //   Alert.alert("Başarılı", "OTP kodu gönderildi!");
      navigation.navigate("OTPVerification", { magaza });
    // } catch (error) {
    //   console.log(error);
    //   Alert.alert("Hata", "OTP gönderilemedi, lütfen tekrar deneyin!");
    // }
  };

  // OTP təsdiqləmə funksiyası
  const handleVerifyOTP = async () => {
    try {
      const res = await axios.post("http://192.168.1.69:8080/web/login/verify-otp", { magaza, otp });
      console.log(res.data);
      Alert.alert("Uğur", "OTP təsdiqləndi!");
      // OTP təsdiqləndikdən sonra qeydiyyat edək
      handleRegister();
    } catch (error) {
      console.log(error);
      Alert.alert("Xəta", "OTP doğrulanmadı!");
    }
  };

  const handleRegister = async () => {
    if (selected === "istifadeci" && password !== confirmPassword) {
      Alert.alert("Xəta", "Şifrələr eyni deyil!");
      return;
    } else if (password.length < 6) {
      Alert.alert("Xəta", "Şifrə ən azı 6 simvol olmalıdır!");
      return;
    }

    try {
      const res = await axios.post("http://192.168.1.69:8080/web/login/registration", {
        username: username,
        password: password,
        repeatPassword: confirmPassword,
        magaza: magaza
      });
      console.log(res.data);
      Alert.alert("Uğur", "Qeydiyyat tamamlandı!");
    } catch (error) {
      console.log(error);
      Alert.alert("Xəta", "Qeydiyyat zamanı xəta baş verdi!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode="contain" />
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.option, selected === "istifadeci" && styles.selectedOption]}
          onPress={() => setSelected("istifadeci")}
        >
          <Text style={[styles.optionText, selected === "istifadeci" && styles.selectedText]}>
            İSTİFADƏÇİ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, selected === "magaza" && styles.selectedOption]}
          onPress={() => setSelected("magaza")}
        >
          <Text style={[styles.optionText, selected === "magaza" && styles.selectedText]}>
            MAĞAZA
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputView}>
        {selected === "istifadeci" ? (
          <>
            <Input
              style={styles.input}
              placeholder="İstifadəçi adı"
              
              value={username}
              onChangeText={setUsername}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Input
              style={styles.input}
              placeholder="Şifrə"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Input
              style={styles.input}
              placeholder="Şifrəni təkrar et"
              secureTextEntry
              onChangeText={setConfirmPassword}
              autoCorrect={false}
              autoCapitalize="none"
              value={confirmPassword}
            />
          </>
        ) : (
          <>
            <Input
              style={styles.input}
              placeholder="+994 50 123 45 67"
              keyboardType="phone-pad"
              value={magaza}
              onChangeText={setMagaza}
            />
            {!otpSent ? (
              <Button title="OTP Göndər" type="solid" onPress={handleSendOTP} />
            ) : (
              <>
                <Input
                  style={styles.input}
                  placeholder="OTP kodunu daxil edin"
                  keyboardType="number-pad"
                  value={otp}
                  onChangeText={setOtp}
                />
                <Button title="OTP Təsdiqlə" type="solid" onPress={handleVerifyOTP} />
              </>
            )}
          </>
        )}
      </View>

      {selected === "istifadeci" && (
        <View style={styles.buttonView}>
          <Button title="Qeydiyyat" type="solid" onPress={handleRegister} />
        </View>
      )}

      <Text style={{ textAlign: "center", marginTop: 10 }}>
        Artıq hesabınız varsa?{" "}
        <Text style={{ color: "blue", fontWeight: "bold" }} onPress={() => navigation.navigate("Giris")}>
          Giriş
        </Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#fff",
  },
  switchContainer: {
    flexDirection: "row",
    backgroundColor: "#EAEAEA",
    borderRadius: 25,
    padding: 5,
    width: 280,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  option: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20,
  },
  selectedOption: {
    backgroundColor: "#C6E466",
  },
  optionText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "bold",
  },
  selectedText: {
    color: "#000",
  },
  inputView: {
    gap: 13,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    // height: 50,
  
  },
  image: {
    height: 160,
    width: 160,
    borderRadius: 80,
    marginBottom:40
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
    marginTop: 30,
  },
});
