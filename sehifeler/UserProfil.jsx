import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const userProfil = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
     <View>
        <View>
            <View><Text>P</Text></View>
        <Text style={styles.title}>User Profile</Text>

        </View>
 
     </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
 
});

export default userProfil;