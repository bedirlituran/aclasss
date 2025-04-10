import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { useSelector } from "react-redux";
import axios from 'axios';
import { selectToken } from '../store/authSlice';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const ProductAddPage = ({ navigation }) => {
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const token = useSelector(selectToken);
  const images = useSelector((state) => state.images.images);
  const imageUri = images.length > 0 ? images[0] : null;
  const apiUrl = Constants.expoConfig.extra.apiKey;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(apiUrl + "/categories/getAll");
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
        Alert.alert("Hata", "Kategoriler yüklenirken bir sorun oluştu");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      const selectedCategory = categories.find(cat => cat.value === selectedCategoryId);
      setSubCategories(selectedCategory?.subCategories || []);
      setSelectedSubCategory(null); // Kategori değişince alt kategoriyi sıfırla
    } else {
      setSubCategories([]);
    }
  }, [selectedCategoryId]);

  const handleSave = async () => {
    if (!imageUri) {
      Alert.alert("Uyarı", "Lütfen bir resim seçin");
      return;
    }

    if (!selectedCategoryId || !selectedSubCategory || !brand || !price) {
      Alert.alert("Uyarı", "Lütfen zorunlu alanları doldurun");
      return;
    }

    try {
  
      let localUri = imageUri;
      let filename = localUri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = 'image/jpeg';
      const productData = {
        brand,
        description,
        sellingPrice: parseFloat(price),
        quantity: parseInt(stock) || 0,
        categoryId: selectedCategoryId,
        subCategory: selectedSubCategory,
        fileType: type
      };

      let formData = new FormData();
      formData.append("product", JSON.stringify(productData));
      formData.append("image", {
        uri: localUri,
        name: filename,
        type: type,
      });

      const response = await axios.post(
        apiUrl + "/productItem/save",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        }
      );

      if(response.status == 200) {
        Alert.alert("Başarılı", "Ürün başarıyla kaydedildi");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Upload Error:", error);
      Alert.alert("Hata", "Ürün kaydedilirken bir hata oluştu");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Yeni Ürün Ekle</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <View style={[styles.image, styles.emptyImage]}>
              <Ionicons name="image-outline" size={40} color="#ccc" />
              <Text style={styles.emptyImageText}>Resim Seçilmedi</Text>
            </View>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Kategori*</Text>
          <DropDownPicker
            open={openCategory}
            setOpen={setOpenCategory}
            value={selectedCategoryId}
            setValue={setSelectedCategoryId}
            items={categories}
            placeholder="Kategori seçin"
            placeholderStyle={styles.placeholderStyle}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropDownContainer}
            textStyle={styles.dropdownText}
            zIndex={3000}
            listMode="SCROLLVIEW"
  nestedScrollEnabled={true}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Alt Kategori*</Text>
          <DropDownPicker
            open={openSubCategory}
            setOpen={setOpenSubCategory}
            value={selectedSubCategory}
            setValue={setSelectedSubCategory}
            items={subCategories}
            placeholder={selectedCategoryId ? "Alt kategori seçin" : "Önce kategori seçin"}
            placeholderStyle={styles.placeholderStyle}
            style={[styles.dropdown, !selectedCategoryId && styles.disabledDropdown]}
            dropDownContainerStyle={styles.dropDownContainer}
            textStyle={styles.dropdownText}
            disabled={!selectedCategoryId}
            zIndex={2000}
            listMode="SCROLLVIEW"
  nestedScrollEnabled={true}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fiyat*</Text>
          <View style={styles.inputWithBorder}>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
            />
            <Text style={styles.currency}>₺</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Stok</Text>
          <View style={styles.inputWithBorder}>
            <TextInput
              style={styles.input}
              placeholder="0"
              value={stock}
              onChangeText={setStock}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Marka*</Text>
          <View style={styles.inputWithBorder}>
            <TextInput
              style={styles.input}
              placeholder="Marka adı"
              value={brand}
              onChangeText={setBrand}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Açıklama</Text>
          <View style={styles.inputWithBorder}>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Ürün açıklaması..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Kaydet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>İptal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    padding: 5,
  },
  headerRightPlaceholder: {
    width: 24,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  emptyImageText: {
    color: '#999',
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputWithBorder: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  currency: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingVertical: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  disabledDropdown: {
    backgroundColor: '#f0f0f0',
  },
  dropDownContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    
  },
  dropdownText: {
    fontSize: 16,
  },
  placeholderStyle: {
    color: '#999',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  cancelButtonText: {
    color: '#555',
  },
});

export default ProductAddPage;
