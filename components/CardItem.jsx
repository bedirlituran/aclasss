import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { removeFromCart, decrementQuantity, incrementQuantity } from '../store/cartSlice';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const CardItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(item.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(item.id));
  };

  const truncateText = (text, maxLength) => {
    return text != null && text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.fileString }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{truncateText(item.brand, 22)}</Text>
        <Text style={styles.description}>{truncateText(item.description, 50)}</Text>
        <Text style={styles.price}>{item.sellingPrice} ₼</Text>

        <View style={styles.controls}>
          <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleRemoveFromCart} style={styles.removeButton}>
        <Ionicons name="trash-bin" size={22} color="#ff4d4d" />
      </TouchableOpacity>
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: height * 0.1,
    height: height * 0.1,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  info: {
    flex: 1,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 13,
    color: '#777',
    marginTop: 3,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginTop: 6,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    fontSize: 15,
    fontWeight: '600',
    marginHorizontal: 10,
  },
  removeButton: {
    padding: 6,
  },
});
