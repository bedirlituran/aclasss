import React from "react";
import { ScrollView, View, Text, FlatList, StyleSheet, Image } from "react-native";

const StoryList = () => {
  const categories = [
    { id: "1", name: "Qadın", image: require("../assets/womens_clothing.png") },
    { id: "2", name: "Kishi ", image: require("../assets/mens_clothing.png") },
    { id: "3", name: "Ushaq ", image: require("../assets/childrens_clothing.png") },
    { id: "4", name: "Ayaqqabı", image: require("../assets/shoes.png") },
    { id: "5", name: "Iç Geyim", image: require("../assets/icgeyim.png") },
    // Diğer kategorileri ekleyebilirsiniz
  ];

  const renderItem = ({ item }) => (
    <View style={styles.category}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.categoryName}>{item.name}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomWidth:0.5,
    borderBottomColor: 'gray',

  },
  contentContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  category: {
    alignItems: "center",
    marginRight: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
    borderColor: "gray",
    borderWidth: 1,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default StoryList;
