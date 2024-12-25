import React from "react";
import { View, StyleSheet} from "react-native";
import ProfileDetails from "../components/ProfileDetails";
import Bottomlink from "../components/Bottomlink";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={{flex:9}}>
      <ProfileDetails />
      </View>
      <Bottomlink/>
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
