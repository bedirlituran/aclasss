import React from 'react';
import { View,StyleSheet} from 'react-native';
import Bottomlink from '../components/Bottomlink';


const Shop = () => {


  return (
    <View style={styles.container}>
     
      <Bottomlink />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Shop;
