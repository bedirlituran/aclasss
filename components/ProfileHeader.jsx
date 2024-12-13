import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import React from "react";

const ProfileHeader = () => {
  return (
    <View style={{ paddingHorizontal: 15, paddingTop: 10, height: 50 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "black", }}>
          A Class
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity>
            <Image
              source={require("../assets/icons/bildirim.png")}
              style={{ width: 30, height: 30,backgroundColor:'#54342b' }}
            
            />
          </TouchableOpacity>
       
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
