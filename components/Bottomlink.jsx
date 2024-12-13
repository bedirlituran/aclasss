import React,{useState,useRef} from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Bottomlink = ({ scrollY, isFirstClick, scrollToTop }) => {
  const navigation = useNavigation();
  const [isFirstClickB, setIsFirstClick] = useState(isFirstClick);
  const handlePress = () => {
    if (isFirstClickB) {

      navigation.reset({ index: 0, routes: [{ name: 'Sekil' }] });
      setIsFirstClick(false);
    } else {
      if (scrollY > 0) {
     
        scrollToTop();
      } else {
       
        navigation.navigate('Sekil'); 
      }

      setIsFirstClick(true); 
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Ionicons name="home" size={25} color="#54342b" />
        <Text style={styles.label}>Ana Səhifə</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SearchScreen")}
      >
        <FontAwesome name="search" size={25} color="#54342b" />
        <Text style={styles.label}>Axtar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("FavoriteScreen")}
      >
        <FontAwesome name="heartbeat" size={24} color="#54342b"
         />
        <Text style={styles.label}>Bəyənilər</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Sebetim")}
      >
        <Ionicons name="cart" size={30} color="#54342b" />
        <Text style={styles.label}>Səbətim</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons name="person" size={25} color="#54342b" />
        <Text style={styles.label}>Profil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 50,
    borderBottomColor: "gray",
    borderWidth: 0.5,
    borderColor: "#ffecfb",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#fffbfb",
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4, 
    },
    shadowOpacity: 0.3, 
    shadowRadius: 4.65, 
    elevation: 8, 
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    marginTop: 1,
    fontSize: 12,
    color: "black",
  },
});

export default Bottomlink;
