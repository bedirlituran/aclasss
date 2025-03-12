import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet} from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { useSelector } from "react-redux";
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

  const images = useSelector((state) => state.images.images); 
  const imageUri = images.length > 0 ? images[0] : null; // İlk resmi al
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

  useEffect(() => {
    const selectedCategory = categories.find(cat => cat.value === selectedCategoryId);
    if (selectedCategory) {
      setSubCategories(selectedCategory.subCategories);
      setSelectedCategoryName(selectedCategory.label); 
    } else {
      setSubCategories([]);
      setSelectedCategoryName(null);
    }
  }, [selectedCategoryId]);



  const handleSave = async () => {
    const productData = {
      
      brand,
      description,
      categoryId: selectedCategoryId,
      subCategory: selectedSubCategory,
      fileType:'image/jpeg',
    };
    console.log("Kaydedilen Ürün:", productData);
    onClose();
    let localUri = imageUri;
  let filename = localUri.split('/').pop();
  let type = 'image/jpeg'; 


    let formData = new FormData();

    formData.append("product", JSON.stringify(productData));
  
    formData.append("image", {
      uri: localUri,
      name: filename,
      type:type,
    });
  
    try {
      const response = await axios.post("http://192.168.1.64:8081/api/productItem/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      
    } catch (error) {
      console.error("Upload Error:", error);
  
  }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Məhsul Məlumatları</Text>

        <DropDownPicker
          open={openCategory}
          setOpen={setOpenCategory}
          value={selectedCategoryId}
          setValue={setSelectedCategoryId}
          items={categories}
          placeholder="Kateqoriya seçin"
          style={styles.dropdown1}
        />

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
