import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Search2 from "./Search2";

const Header = () => {
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          height: 50,
          borderBottomColor: "gray",
          borderWidth: 0.5,
          borderColor: "#ffecfb",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          backgroundColor: "#fffbfb",
          zIndex: 1000,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4, 
          },
          shadowOpacity: 0.3, 
          shadowRadius: 4.65, 
          elevation: 8, 
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "orange" }}>
            Aclass
          </Text>
        </View>

        <TouchableOpacity>
          <Search2 />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="notifications-circle" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
