import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const userProfil = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View  style={styles.header}>
          <View>
            <Text>P</Text>
          </View>
          <Text style={styles.title}>User Profile</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header:{
    backgroundColor: "#4caf50",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  }
});

export default userProfil;
