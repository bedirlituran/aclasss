import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const SkeletonLoader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileSkeleton}>
        <View style={styles.profileImage} />
        <View style={styles.profileTextContainer}>
          <View style={styles.profileTextShort} />
          <View style={styles.profileTextLong} />
        </View>
      </View>

      <View style={styles.imageSkeleton} />

      <View style={styles.textSkeleton}>
        <View style={styles.textLineShort} />
        <View style={styles.textLineLong} />
      </View>

      <View style={styles.footerSkeleton}>
        <View style={styles.priceSkeleton} />
        <View style={styles.buttonSkeleton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginVertical: 10,
  },
  profileSkeleton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e0e0e0",
    marginRight: 10,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileTextShort: {
    height: 10,
    backgroundColor: "#e0e0e0",
    width: "50%",
    borderRadius: 5,
    marginBottom: 5,
  },
  profileTextLong: {
    height: 10,
    backgroundColor: "#e0e0e0",
    width: "80%",
    borderRadius: 5,
  },
  imageSkeleton: {
    width: "100%",
    height: 200,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 10,
  },
  textSkeleton: {
    marginBottom: 10,
  },
  textLineShort: {
    height: 10,
    backgroundColor: "#e0e0e0",
    width: "60%",
    borderRadius: 5,
    marginBottom: 5,
  },
  textLineLong: {
    height: 10,
    backgroundColor: "#e0e0e0",
    width: "80%",
    borderRadius: 5,
  },
  footerSkeleton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceSkeleton: {
    width: "30%",
    height: 30,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  buttonSkeleton: {
    width: "40%",
    height: 30,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
});

export default SkeletonLoader;