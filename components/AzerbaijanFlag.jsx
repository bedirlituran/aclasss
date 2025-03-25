import React from 'react';
import { View, StyleSheet } from 'react-native';

const AzerbaijanFlag = ({ size = 24 }) => {
  const flagRatio = 2; // Bayrağın en-boy oranı (2:1)
  const width = size;
  const height = size / flagRatio;
  const stripeHeight = height / 3;

  return (
    <View style={[styles.container, { width, height }]}>
      {/* Üst mavi şerit */}
      <View style={[styles.stripe, { 
        height: stripeHeight, 
        backgroundColor: '#00B5E2' 
      }]} />
      
      {/* Orta kırmızı şerit */}
      <View style={[styles.stripe, { 
        height: stripeHeight, 
        backgroundColor: '#EF3340' 
      }]} />
      
      {/* Alt yeşil şerit */}
      <View style={[styles.stripe, { 
        height: stripeHeight, 
        backgroundColor: '#509E2F' 
      }]} />
      
      {/* Ay ve yıldız (simplified) */}
      <View style={styles.crescentContainer}>
        <View style={[styles.crescent, { 
          width: size/6, 
          height: size/6,
          borderRadius: size/12
        }]} />
        <View style={[styles.star, { 
          borderLeftWidth: size/16,
          borderRightWidth: size/16,
          borderBottomWidth: size/8,
          left: size/4.8,
          top: '40%'
        }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    margin: 1,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  stripe: {
    width: '100%',
  },
  crescentContainer: {
    position: 'absolute',
    width: '40%',
    height: '100%',
    left: '8%',
    justifyContent: 'center',
  },
  crescent: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
  },
  star: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    position: 'absolute',
    transform: [{ rotate: '180deg' }],
  },
});

export default AzerbaijanFlag;