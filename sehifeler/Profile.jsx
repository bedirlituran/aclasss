import React from "react";
import { View, StyleSheet} from "react-native";
import Bottomlink from "../components/Bottomlink";
import ProfileDetails from "../components/ProfileDetails";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={{flex:9}}>
      <ProfileDetails />
      <Bottomlink />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

});

export default Profile;
