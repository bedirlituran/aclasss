import * as React from "react";
import { StyleSheet, View, Text,TouchableOpacity,TextInput } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Profile from "../sehifeler/Profile";
import SearchScreen from "../sehifeler/SearchScreen";
import Qadin from "../sehifeler/Qadin";
import Usaq from "../sehifeler/Usaq";
import Kisi from "../sehifeler/Kisi";
import Sebetim from "../sehifeler/Sebetim";
import UrunDetay from "../sehifeler/UrunDetay";
import FavoriteScreen from "../sehifeler/FavoriteScreen";
import Ev from "../components/Ev";
import ProductDetailsScreen from "../sehifeler/ProductDetailsScreen";
import { useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Evstack = () => (
  <Stack.Navigator initialRouteName="EvHome">
    <Stack.Screen
      name="EvHome"  // Ekran ismini benzersiz yapıyoruz
      component={Ev}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="UrunDetay"
      component={UrunDetay}
      options={{
        headerShown: true,
        headerTitle: "Məhsul haqqında",
        headerTitleAlign: "center",
        headerStyle: { height: 50 },
      }}
    />
  
    <Stack.Screen
      name="Qadin"
      component={Qadin}
      options={{ headerShown: true, headerTitle: "Qadın" }}
    />
    <Stack.Screen
      name="Usaq"
      component={Usaq}
      options={{ headerShown: true, headerTitle: "Uşaq" }}
    />
    <Stack.Screen
      name="Kisi"
      component={Kisi}
      options={{ headerShown: true, headerTitle: "Kişi" }}
    />
      <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />

  </Stack.Navigator>
);

const getIconName = (routeName, focused) => {
  switch (routeName) {
    case "Profil":
      return focused ? "person" : "person-outline";
    case "Kataloq":
      return focused ? "search" : "search-outline";
    case "Shop":
      return focused ? "cart" : "cart-outline";
    case "Bəyənilər":
      return focused ? "heart" : "heart-outline";
    case "Səbət":
      return focused ? "basket" : "basket-outline";
    case "Ev":
      return focused ? "home" : "home-outline";
    default:
      return "help-outline";
  }
};

const Navigation = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Ev"  // Ev ekranını buradaki tabda tanımlıyoruz
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getIconName(route.name, focused);
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
              style={{ marginBottom: -3 }}
            />
          );
        },
        tabBarActiveTintColor: "#fb5607",
        tabBarInactiveTintColor: "gray",
        tabBarBadge: route.name === "Səbət" && cartItems.length > 0 ? cartItems.length : null,
      })}
    >
      <Tab.Screen
        name="Ev"
        component={Evstack}  // Ev ekranını stack içinde tanımladık
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profil"
        component={Profile}
        options={{ headerShown: false }}
      />
    <Tab.Screen
      name="Kataloq"
      component={SearchScreen}
      options={{
        headerShown: true,
        headerTitle: "",
        headerStyle: {
          height: 50,
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()} // Geri dönme işlevi
            style={{ marginLeft: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="İstediğiniz məhsulu axtarın . . ."
              placeholderTextColor="#888"
            />
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => alert('Mesajlar')}>
                <Ionicons name="chatbubble" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alert('Bildirimler')}>
                <Ionicons name="notifications" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ),
      }}
    />
<Tab.Screen
  name="Səbət"
  component={Sebetim} // Component'e SebetimScreen'i kullanıyoruz
  options={{
    headerShown: true,
    headerTitle: "Məhsul haqqında",
    headerTitleAlign: "center",
    headerStyle: {
      height: 50,
    },
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.goBack()} // Geri dönme işlevini burada kullanıyoruz
        style={{ marginLeft: 10 }}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    ),
  }}
/>
      <Tab.Screen
        name="Bəyənilər"
        component={FavoriteScreen}
        options={{
          headerShown: true,
          headerTitle: "Bəyənilər",
          headerTitleAlign: "center",
          headerStyle: {
            height: 50,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()} // Geri dönme işlevini burada kullanıyoruz
              style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent: 'space-around  ',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingRight: 5,
    paddingLeft: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingLeft: 15,
    fontSize: 14,
    backgroundColor: '#f1f1f1',

  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around middle',
    paddingHorizontal: 20,
    width: 80,
    gap:8
  },
  
});
