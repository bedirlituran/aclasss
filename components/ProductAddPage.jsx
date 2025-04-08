import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  ScrollView,
  Image
} from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { useSelector } from "react-redux";
import axios from 'axios';
import { selectToken } from '../store/authSlice';
import { Ionicons } from '@expo/vector-icons';

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
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  
  const token = useSelector(selectToken);
  const images = useSelector((state) => state.images.images); 
  const imageUri = images.length > 0 ? images[0] : null;

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
    
    let localUri = imageUri;
    let filename = localUri.split('/').pop();
    let type = 'image/jpeg'; 

    let formData = new FormData();
    formData.append("product", JSON.stringify(productData));
    formData.append("image", {
      uri: localUri,
      name: filename,
      type: type,
    });
  
    try {
      const response = await axios.post(
        "http://35.159.64.205:8081/api/productItem/save", 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        }
      );
      console.log(response.data);
      navigation.goBack();
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Məhsul yüklənərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Yeni Məhsul Əlavə Et</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {imageUri && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Kateqoriya</Text>
          <DropDownPicker
            open={openCategory}
            setOpen={setOpenCategory}
            value={selectedCategoryId}
            setValue={setSelectedCategoryId}
            items={categories}
            placeholder="Kateqoriya seçin"
            placeholderStyle={styles.placeholderStyle}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropDownContainer}
            textStyle={styles.dropdownText}
            ArrowDownIconComponent={() => <Ionicons name="chevron-down" size={18} color="#555" />}
            ArrowUpIconComponent={() => <Ionicons name="chevron-up" size={18} color="#555" />}
            zIndex={3000}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Alt Kateqoriya</Text>
          <DropDownPicker
            open={openSubCategory}
            setOpen={setOpenSubCategory}
            value={selectedSubCategory}
            setValue={setSelectedSubCategory}
            items={subCategories}
            placeholder="Alt kateqoriya seçin"
            placeholderStyle={styles.placeholderStyle}
            style={[styles.dropdown, subCategories.length === 0 && styles.disabledDropdown]}
            dropDownContainerStyle={styles.dropDownContainer}
            textStyle={styles.dropdownText}
            ArrowDownIconComponent={() => <Ionicons name="chevron-down" size={18} color="#555" />}
            ArrowUpIconComponent={() => <Ionicons name="chevron-up" size={18} color="#555" />}
            disabled={subCategories.length === 0}
            zIndex={2000}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Qiymət</Text>
          <View style={styles.inputWithBorder}>
            <TextInput 
              style={styles.input} 
              placeholder="0.00" 
              value={price} 
              onChangeText={setPrice} 
              keyboardType="decimal-pad"
            />
            <Text style={styles.currency}>AZN</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Stok Sayı</Text>
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
          <Text style={styles.label}>Brend</Text>
          <View style={styles.inputWithBorder}>
            <TextInput 
              style={styles.input} 
              placeholder="Brend adı" 
              value={brand} 
              onChangeText={setBrand} 
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Təsvir</Text>
          <View style={styles.inputWithBorder}>
            <TextInput 
              style={[styles.input, styles.multilineInput]} 
              placeholder="Məhsul haqqında ətraflı məlumat..." 
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
            <Text style={styles.buttonText}>Yadda Saxla</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>Ləğv Et</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

  },
  title: {
    fontSize: 18,
    fontWeight: '600',
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 8,
  },
  inputWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  currency: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  dropdown: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 0,
    minHeight: 40,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingBottom: 8,
  },
  disabledDropdown: {
    backgroundColor: 'transparent',
  },
  dropDownContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 5,
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
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
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