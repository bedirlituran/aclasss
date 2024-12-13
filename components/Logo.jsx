import React from 'react'
import { View, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

const Logo = ({Color}) => {
  return (
        <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
          top: 20,
          gap: 10,
        }}>
        <FontAwesome name="renren" size={30} color={Color} />
        <Text style={{ color: Color, fontSize: 30 }}>A Class</Text>
      </View>
  )
}

export default Logo