import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Search2 from "./Search2";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Aclass</Text>
      </View>

      {/* Search Section */}
      <View style={styles.searchWrapper}>
        <Search2 />
      </View>

      {/* Notification Section */}
      <TouchableOpacity>
        <Ionicons name="notifications-circle" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 0.5,
    borderColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 1000,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    fontSize: 22,
    fontWeight: "bold",
    
  },
  searchWrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default Header;
