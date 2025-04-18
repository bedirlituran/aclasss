import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState([]);

  const categoryTitleMap = {
    "Men": "Kişi",
    "Women": "Qadın",
    "Boys' Clothing": "Oğlan uşaq geyimləri",
    "Girls' Clothing": "Qız uşaq geyimləri"
  };

  const subCategoryMap = {
    "Shirts": "Köynəklər",
    "Polo T-shirts": "Polo futbolkalar",
    "Pants": "Şalvarlar",
    "Jeans": "Cins şalvarlar",
    "Classic Shoes": "Ayaqqabılar",
    "Sneakers": "İdman ayaqqabıları",
    "Sandals": "Səndəllər",
    "Jackets": "Jaketlər",
    "Jacket": "Jaketlər",
    "Coat": "Paltolar",
    "Sweaters": "Svitərlər",
    "Hoodies": "Hudilər",
    "Shorts": "Şortlar",
    "Suit": "Kostyumlar",
    "Dresses": "Donlar",
    "Skirts": "Ətəklər",
    "Blouses": "Bluzlar",
    "Blouses and Shirts": "Bluz və Köynəklər",
    "Blazers and Suits": "Blazer və Kostyumlar",
    "Underwear and Swimwear": "Alt geyimlər və Çimərlik geyimləri",
    "Underwear and Home Clothing": "Alt geyimlər və Ev geyimləri",

    "Hats": "Papaqlar",
    "Gloves": "Əlcəklər",
    "Pants and Jumpsuits": "Şalvarlar və kombinezonlar",
    "Shirts and Polos":"Futbolka və Polo",
    "Socks and Tights": "Corab və taytlar",
    "Tops": "Üst geyimlər",
    "Heels": "Topuqlu ayaqqabılar",
    "Boots": "Çəkmələr",
    "Sleepwear": "Yuxu geyimləri",
    "Underwear": "Alt geyimlər",
    "Bags": "Çantalar",
    "Caps": "Papaqlar",
    "Belts": "Kəmərlər",
    "Swimwear": "Çimərlik geyimləri",
    "Raincoats": "Yağmurluqlar",
    "Vests": "Jiletlər",
    "Polos": "Polo köynəklər",
    "Sportswear": "İdman geyimləri",
    "Classic Shirts":"Klassik köynəklər",
    "Fabric Pants":"Parça şalvarlar",
    "Leather Jackets":"Dəri gödəkçələr",
    "Sports Shoes":"İdman ayaqqabıları",
    "T-shirts":"Futbolkalar",
    "Classic Jackets":"Klassik gödəkçələr",
    "Belts, Glasses, and Watches":"Kəmər, Eynek və Saatlar",	
    "Headwear":"Papaq",
    "Gloves and Scarves":"Əlcək və Şərflər",	
    "Ties and Bow Ties":"Qalstuk və Bantik",	
    "Sports Sets":"İdman dəstləri",
    "Skirts and Shorts":"Ətək və Şortlar",	
    "T-shirts and Polos":"Futbolka və Polo",
    "Bodysuits":"Vestlər",
    "Tights and Socks":"Kalqotka və Corablar",
    "High Heels":"Topuqlu ayaqqabılar",
    "Home Clothing":"Ev geyimləri",
    "Wedding Dresses":"Şənlik geyimləri",	
    "Hats and Hijabs":"Papaq və Hicablar",
  };
  

  const categoryIdMap = {
    "Men": "67ceeddf7b031af1efa10499",
    "Women": "67ceeddf7b031af1efa10498",
    "Boys' Clothing": "67ceeddf7b031af1efa10496",
    "Girls' Clothing": "67ceeddf7b031af1efa10497",
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://35.159.64.205:8081/api/categories/getAll");
      setCategories(response.data.reverse());
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handlePress = (item) => {
    setSelectedItem(selectedItem?.id === item.id ? null : item);
  };

  const goToProductDetails = (subCategory) => {
    const categoryId = categoryIdMap[selectedItem.title] || "";
    if (!categoryId) {
      console.error("Category ID not found!");
      return;
    }
    navigation.navigate("ProductDetailsScreen", {
      categoryId,
      subCategory,
      categoryTitle: selectedItem.title,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.item,
                selectedItem?.id === item.id && styles.selectedItem
              ]}
              onPress={() => handlePress(item)}
            >
              <Text style={styles.titles}>
  {categoryTitleMap[item.title] || item.title}
</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.subCategoriesContainer}>
        {selectedItem && selectedItem.subCategories && (
          <FlatList
            data={selectedItem.subCategories}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            contentContainerStyle={styles.imagesContainer}
          showsVerticalScrollIndicator={false}

            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.imageTextContainer}
                onPress={() => goToProductDetails(item)}
              >
                <Image
                  source={{ 
                    uri: selectedItem.images[index]?.uri || 'https://via.placeholder.com/85' 
                  }}
                  style={styles.image}
                />
                <Text style={styles.title}>
  {subCategoryMap[item] || item}
</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: { 
    padding: 12, 
    backgroundColor: "#f9f9f9", 
    paddingHorizontal: 20, 
    paddingVertical: 10 
  },
  subCategoriesContainer: {
    flex: 1,
    paddingTop: 10
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
    paddingVertical: 10 
  },
  imagesContainer: { 
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 24, 
    flexWrap: "wrap", 
    backgroundColor: "#fff", 
    paddingBottom: 150 
  },
  imageTextContainer: { 
    alignItems: "center", 
    marginBottom: 16, 
    padding: 8, 
    borderWidth: 1, 
    borderColor: "#ddd" 
  },
  title: { 
    fontSize: 12, 
    textAlign: "center", 
    marginTop: 5, 
    width: 100, 
    fontWeight: "bold", 
    padding: 8, 
    color: "#004085" 
  },
  image: { 
    width: 85, 
    height: 85, 
    borderRadius: 8, 
    marginBottom: 5, 
    resizeMode: "contain" 
  },
  titles: { 
    fontSize: 14, 
    textAlign: "center", 
    fontWeight: "bold", 
    padding: 8 
  },
  selectedItem: { 
    backgroundColor: "#cce5ff", 
    borderColor: "#004085" 
  },
});

export default SearchScreen;