import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const ProfileDetails = () => {
  return (
    <View style={{ padding: 15 ,borderBottomWidth:0.5}}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/3.png")}
          style={{ width: 100, height: 100, borderRadius: 50,marginBottom:10 }}
        />
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "black",margin:20,marginBottom:30 }}>Profil adi</Text>

      </View>
      <Text>React Native Developer</Text>
      <Text>Insagram clone</Text>
      <Text style={{ color: "black",fontSize: 16,fontWeight: "bold" }}>See transactions</Text>
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 15,marginHorizontal: 10 }}>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 5,justifyContent: "center" }}>
              <Text style={{
                backgroundColor:"black",
                width: "75%",
                fontWeight: "bold",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 5,
                textAlign: "center",
                color: "white",
              }}>Edit Profile</Text>
          </TouchableOpacity>
          
        </View>
    </View>
  );
};

export default ProfileDetails;
