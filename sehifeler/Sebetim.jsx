import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Bottomlink from '../components/Bottomlink'

const Sebetim = () => {
  return (
    <View style={styles.container}>

      <Text>Sebetim</Text>
      <Bottomlink/>

    </View>
  )
}

export default Sebetim

const styles = StyleSheet.create({
  container:{
    flex: 1,

  }
})
