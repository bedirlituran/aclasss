import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://35.159.64.205:8081/api/categories/getAll");
      setCategories(response.data.reverse());
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  const categoryIdMap = {
    "Men": "67ceeddf7b031af1efa10499",
    "Women": "67ceeddf7b031af1efa10498",
    "Boys' Clothing": "67ceeddf7b031af1efa10496",
    "Girls' Clothing": "67ceeddf7b031af1efa10497",
  };

  const goToProductDetails = (subCategory) => {
    const categoryId = categoryIdMap[selectedItem.title] || "";
  
    if (!categoryId) {
      console.error("Kategori ID bulunamadı!");
      return;
    }
  
    navigation.navigate("ProductDetailsScreen", {
      categoryId,
      subCategory,
      categoryTitle: selectedItem.title, // Kategori başlığını da iletiyoruz
    });
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePress = (item) => {
    setSelectedItem(selectedItem?.id === item.id ? null : item);
  };



  return (
    <View>
      <View style={styles.container}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={{ flexWrap: "nowrap" }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.item,
                selectedItem?.id === item.id && styles.selectedItem,
              ]}
              onPress={() => handlePress(item)}
            >
              <Text style={styles.titles}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View>
        {selectedItem && selectedItem.subCategories && (
          <FlatList
            data={selectedItem.subCategories}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            contentContainerStyle={styles.imagesContainer}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.imageTextContainer}
                onPress={() => goToProductDetails(item)}
              >
                <Image
                  source={{ uri: selectedItem.images[index]?.uri || 'https://via.placeholder.com/85' }}
                  style={styles.image}
                />
                <Text style={styles.title}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    paddingHorizontal: 8,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
    paddingVertical: 10,
  },
  imagesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    flexWrap: "wrap",
    backgroundColor: "#fff",
    paddingBottom: 150,
  
  },
  imageTextContainer: {
    alignItems: "center",
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
    width: 100,
    fontWeight: "bold",
    padding: 8,
    color: "#004085",
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 8,
    marginBottom: 5,
    resizeMode: "contain",
  },
  titles: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    padding: 8,
  },
  selectedItem: {
    backgroundColor: "#cce5ff",
    borderColor: "#004085",
  },
});
