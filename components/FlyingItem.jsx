import React, { useEffect } from 'react';
import { Animated, Easing, View } from 'react-native';

const FlyingItem = ({ startPos, endPos, onComplete }) => {
  const position = new Animated.ValueXY(startPos);
  
  useEffect(() => {
    Animated.timing(position, {
      toValue: endPos,
      duration: 700,
easing: Easing.inOut(Easing.ease),

      useNativeDriver: true,
    }).start(() => {
      onComplete();
    });
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        backgroundColor: '#ff6e40',
        width: 20,
        height: 20,
        borderRadius: 10,
        transform: [
          { translateX: position.x },
          { translateY: position.y },
        ],
        zIndex: 1000,
      }}
    />
  );
};

export default FlyingItem;