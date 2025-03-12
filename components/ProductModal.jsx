import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from "react-native-dropdown-picker";
import axios from 'axios';

const ProductModal = ({ visible, onClose }) => {
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const [openCategory, setOpenCategory] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [imageUri, setImageUri] = useState(null);
  const [imageType, setImageType] = useState(null);

  // API'den kategori verilerini al
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://35.159.64.205:8081/api/categories/getAll");
        const formattedCategories = response.data.map(item => ({
          label: item.title,
          value: item.id, 
          subCategories: item.subCategories.map(sub => ({
            label: sub, 
            value: sub 
          }))
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Kategori verileri alınırken hata oluştu:", error);
      }
    };
    fetchCategories();
  }, []);

  // Ana kategori değiştiğinde alt kategorileri ve ID'yi güncelle
  useEffect(() => {
    const selectedCategory = categories.find(cat => cat.value === selectedCategoryId);
    if (selectedCategory) {
      setSubCategories(selectedCategory.subCategories);
      setSelectedCategoryName(selectedCategory.label); // Seçili kategorinin adını kaydet
    } else {
      setSubCategories([]);
      setSelectedCategoryName(null);
    }
  }, [selectedCategoryId]);

  // Resim seçme işlemi
  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaType.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  
  //   console.log("Image Picker Result:", result); // Konsolda nəticəni yoxla
  
  //   if (!result.canceled && result.assets.length > 0) {
  //     setImageUri(result.assets[0].uri); // Şəkilin URI-ni state-də saxla
  //     setImageType(result.assets[0].mimeType || "image/jpeg"); // MIME type (formatı) state-də saxla
  //   }
  // };

  const handleSave = () => {
    const productData = {
      price,
      stock,
      brand,
      description,
      categoryId: selectedCategoryId,
      categoryName: selectedCategoryName,
      subCategory: selectedSubCategory,
      image: {
        uri: imageUri,
        type: imageType,
      },
    };
    console.log("Kaydedilen Ürün:", productData);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Məhsul Məlumatları</Text>

        {/* Resim Seçme Butonu */}
      
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

        {/* Ana Kategori */}
        <DropDownPicker
          open={openCategory}
          setOpen={setOpenCategory}
          value={selectedCategoryId}
          setValue={setSelectedCategoryId}
          items={categories}
          placeholder="Kateqoriya seçin"
          style={styles.dropdown1}
        />

        {/* Alt Kategori */}
        <DropDownPicker
          open={openSubCategory}
          setOpen={setOpenSubCategory}
          value={selectedSubCategory}
          setValue={setSelectedSubCategory}
          items={subCategories}
          placeholder="Alt kateqoriya seçin"
          style={styles.dropdown2}
          disabled={subCategories.length === 0}
        />

        <TextInput style={styles.input} placeholder="Qiymət" value={price} onChangeText={setPrice} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Stok" value={stock} onChangeText={setStock} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Brend" value={brand} onChangeText={setBrand} />
        <TextInput style={styles.input} placeholder="Təsvir" value={description} onChangeText={setDescription} multiline />

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
  dropdown1: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    zIndex:1000,

  },
  dropdown2: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    zIndex:999,
    
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 10,
    alignSelf: 'center',
  }
});

export default ProductModal;
