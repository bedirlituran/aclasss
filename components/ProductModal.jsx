import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateProductInfo } from '../store/productSlice';

const ProductModal = ({ visible, onClose, imageUri }) => {
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');

  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(updateProductInfo({
      image: imageUri,
      price,
      category,
      brand,
      description,
      stock,
    }));
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Məhsul Məlumatları</Text>
        <TextInput
          style={styles.input}
          placeholder="Qiymət"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
          <TextInput
          style={styles.input}
          placeholder="Stok"
          value={stock}
          onChangeText={setStock}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Kateqoriya"
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          style={styles.input}
          placeholder="Brend"
          value={brand}
          onChangeText={setBrand}
        />
        <TextInput
          style={styles.input}
          placeholder="Təsvir"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Button title="Yadda Saxla" onPress={handleSave} />
        <Button title="Bağla" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ProductModal;