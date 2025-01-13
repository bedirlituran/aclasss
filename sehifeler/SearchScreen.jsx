import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const data = [
  {
    id: 1,
    titles: "Tövsiyyə olunan",
    desc: ["Öneri 1", "Öneri 2"],
    images: [],
  },
  {
    id: 2,
    titles: "Kişi",
    desc: [
      "Kostyum",
      "Sport",
      "Klassik Ayaqqabılar",
      "Polo Futbolkalar",
      "Klassik Köynək",
      "Parça Şalvarlar",
      "Cins Şalvarlar",
      "Dəri Gödəkçələr",
      "Palto",
      "İdman Ayaqqabıları",
      "Futbolkalar",
      "Klassik Gödəkçələr",
    ],
    images: [
      {
        uri: "https://safe-vision.com/wp-content/uploads/2020/06/jpg_q50-kostyum-kkkkkkkkkkk-1.jpg",
      },
      { uri: "https://www.life-sport.az/storage/products/big/246.jpg" },
      { uri: "https://altimod.az/wp-content/uploads/2024/04/3004-06-4.jpg" },
      {
        uri: "https://safeseason.az/admin/uploads/10c72fc120cab48fa6bf66c0315517ed-202204181650279544.webp",
      },
      { uri: "https://richmen.az/images/detailed/3/IMG_6518.jpg" },
      {
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAo5zBPU1WYnBbyQ7Hn_m_UcNkX51PvVDnKA&s",
      },
      { uri: "https://richmen.az/images/detailed/5/IMG_9534.jpg" },
      {
        uri: "https://e-bay.az/products/793582395601729256103.jpg?v=1507911359",
      },
      {
        uri: "https://strgimgr.umico.az/sized/840/512014-791c1f7a3cc8d7fc7370fc518b3bac0c.jpg",
      },
      { uri: "https://cdn.globalso.com/walksun/WS029-2.jpg" },
      {
        uri: "https://volkssport.az/1204-home_default/reebok-gp-unisex-longer-te-dj-1890.jpg",
      },
      { uri: "https://richmen.az/images/detailed/4/IMG_8126.jpg" },
    ],
  },
  {
    id: 4,
    titles: "Qadın",
    desc: ["Moda", "Şık", "Estetik"],
    images: [
      { uri: "https://via.placeholder.com/150?text=Usaq1" },
      { uri: "https://via.placeholder.com/150?text=Usaq2" },
    ],
  },
  {
    id: 5,
    titles: "Uşaq",
    desc: ["Eğlenceli", "Konforlu"],
    images: [
      { uri: "https://via.placeholder.com/150?text=Elektronika1" },
      { uri: "https://via.placeholder.com/150?text=Elektronika2" },
    ],
  },
  {
    id: 6,
    titles: "Elektronika",
    desc: ["Yüksek Teknoloji", "Kullanışlı"],
    images: [
      { uri: "https://via.placeholder.com/150?text=Etriyyat1" },
      { uri: "https://via.placeholder.com/150?text=Etriyyat2" },
    ],
  },
];

const SearchScreen = () => {
  const navigation = useNavigation()

  const [selectedItem, setSelectedItem] = useState(null);

  const handlePress = (item) => {
  if (!item || !item.desc) {
    console.warn("Item does not have a valid description.");
    return;
  }

  setSelectedItem(selectedItem?.id === item.id ? null : item);
};



const goToProductDetails = (item, index) => {
  if (!selectedItem || !selectedItem.desc || !selectedItem.desc[index]) {
    console.warn("Selected item or description is not valid.");
    return;
  }
  
  const description = selectedItem.desc[index];  // Burada geçerli bir değeri aldığınızdan emin olun
  navigation.navigate('ProductDetailsScreen', {
    categoryTitle: description,
  });
};

  
  
  
  return (
    <View>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          contentContainerStyle={{ flexWrap: "nowrap" }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handlePress(item)}
            >
              <Text style={styles.titles}>{item.titles}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View>
        {selectedItem && selectedItem.desc && selectedItem.images && (
          <FlatList
            data={selectedItem.images}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3} // Bu, iki sütunlu bir düzen sağlar.
            contentContainerStyle={styles.imagesContainer}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.imageTextContainer}
                onPress={() => goToProductDetails(selectedItem.desc[index], index)}
              >
                <Image source={item} style={styles.image} />
                <Text style={styles.title}>{selectedItem.desc[index]}</Text>
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
    paddingVertical: 8,
  },
  imagesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center", // Center items horizontally
    alignItems: "center", // Center items vertically
    padding: 24,
    flexWrap: "wrap",
    backgroundColor: "#fff",
    // Allow items to wrap to multiple lines
  },
  imageTextContainer: {
    alignItems: "center",
    marginBottom: 16,
    padding: 6,
  },
  title: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 5,
    width: 100,
  },
  image: {
    width: 85, // Reduced size for three items per row
    height: 85,
    borderRadius: 8,
    marginBottom: 5,
    resizeMode: "cover",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  titles: {
    fontSize: 14,
    textAlign: "center",
  },
});
