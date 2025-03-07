import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Poppins_400Regular_Italic } from '@expo-google-fonts/poppins';




// import Search2 from "./Search2";

const { width } = Dimensions.get("window");

const Header = () => {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular_Italic, // Poppins fontunu ekledik
  });
  const navigation = useNavigation()
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>AClass</Text>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate("Kataloq")}>
      <Ionicons name="search-outline" size={24} color="gray" />

      </TouchableOpacity>

      <TouchableOpacity style={styles.iconWrapper}>
      <Ionicons name="notifications-outline" size={22} color="gray" />
        </TouchableOpacity> 


      <TouchableOpacity style={styles.iconWrapperBasket} onPress={() => navigation.navigate("Sebetim")}>
  <Ionicons name="basket-sharp" size={22} color="#fb5607" />
  <Text style={styles.iconWrapperBasketText}>
    {cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ).toFixed(2)} {'\u20BC'}
  </Text>
</TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 60, // Header'in yüksekliğini artırdık
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 1000,
  },
  iconWrapperBasketText:{
    fontSize:12,
    fontWeight: 'bold',
    color: 'black',
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "semibold",
    color:'green',
    fontFamily: 'Poppins_400Regular_Italic',
  },

  
  notificationCartWrapper: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center",
    width:width*0.40,
  },
  iconWrapper: {
    justifyContent: "center", 
    alignItems: "center", 
    width: 50,  
    height: 50, 
    borderRadius: 25, 
    padding: 10, 
  },
  iconWrapperBasket: {
    flexDirection: "row",  
    alignItems: "center", 
    justifyContent: "space-around", 
    width: 100,  
    height: 40, 
    borderRadius: 25, 
    padding: 5, 
    borderColor:'lightgray',
    borderWidth:0.4,
    backgroundColor:'white',
    shadowColor:'black',
    shadowOffset:{width:0, height:2},
    shadowOpacity:0.5,
    shadowRadius:2,
    elevation:3,
  },
});

export default Header;
