import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../sehifeler/Profile";
import SearchScreen from "../sehifeler/SearchScreen";
import Shop from "../sehifeler/Shop";
import Qadin from "../sehifeler/Qadin";
import Usaq from "../sehifeler/Usaq";
import Kisi from "../sehifeler/Kisi";
import Qeydiyyat from "../sehifeler/Qeydiyyat";
import Giris from "../sehifeler/Giris";
import Esasgiris from "../sehifeler/Esasgiris";
import Sebetim from "../sehifeler/Sebetim";
import UrunDetay from "../sehifeler/UrunDetay";
import FavoriteScreen from "../sehifeler/FavoriteScreen";
import Sekil from "../components/Sekil";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center", // Tüm başlıkları ortaya hizalar
      }}
    >
         <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false,
          unmountOnBlur: false
         }}
      />
      <Stack.Screen
        name="Sekil"
        component={Sekil}
        options={{ headerShown: false }}
      />
   
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen name="Qadin" component={Qadin} />
      <Stack.Screen name="Usaq" component={Usaq} />
      <Stack.Screen name="Kisi" component={Kisi} />

      <Stack.Screen
        name="Sebetim"
        component={Sebetim}
        options={{
          headerTitle: "Səbətim",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
        }}
      />

   <Stack.Screen
  name="UrunDetay"
  component={UrunDetay}
  options={{
    title: "Məhsul",
    headerRight: () => (
      <TouchableOpacity style={styles.iconWrapperBasket}>
        <Ionicons name="basket-sharp" size={22} color="#fb5607" />
        <Text style={styles.iconWrapperBasketText}>
          {cartItems
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2)}{" "}
          {"\u20BC"}
        </Text>
      </TouchableOpacity>
    ),
  }}
/>

      <Stack.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          headerTitle: "Bəyənilənlər",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  iconWrapperBasketText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
  },
  iconWrapperBasket: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: 100,
    height: 40,
    borderRadius: 25,
    padding: 5,
    borderColor: "lightgray",
    borderWidth: 0.4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
});
