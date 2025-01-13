import * as React from "react";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Profile from "../sehifeler/Profile";
import SearchScreen from "../sehifeler/SearchScreen";
import Sebetim from "../sehifeler/Sebetim";
import UrunDetay from "../sehifeler/UrunDetay";
import FavoriteScreen from "../sehifeler/FavoriteScreen";
import Ev from "../components/Ev";
import ProductDetailsScreen from "../sehifeler/ProductDetailsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

const EvStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="UrunDetay"
      component={UrunDetay}
      options={{ headerTitle: "Məhsul haqqında", headerTitleAlign: "center" }}
    />

  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="UrunDetay"
      component={UrunDetay}
      options={{ headerTitle: "Məhsul haqqında" }}
    />
  </Stack.Navigator>
);

const KataloqStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Kataloq"
      component={SearchScreen}
      options={{
        headerTitle: "",
        headerStyle: { height: 50 },
        headerLeft: () => (
          <TouchableOpacity style={{ marginLeft: 10 }}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="İstədiyiniz məhsulu axtarın . . ."
              placeholderTextColor="#888"
            />
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => alert("Mesajlar")}>
                <Ionicons name="chatbubble" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alert("Bildirimlər")}>
                <Ionicons name="notifications" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const SebetimStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Səbət"
      component={Sebetim}
      options={{ headerTitle: "Səbət", headerTitleAlign: "center" }}
    />
  </Stack.Navigator>
);

const FavoriteStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Bəyənilər"
      component={FavoriteScreen}
      options={{ headerTitle: "Bəyənilər", headerTitleAlign: "center" }}
    />
  </Stack.Navigator>
);

const TabNavigator = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getIconName(route.name, focused);
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fb5607",
        tabBarInactiveTintColor: "gray",
        tabBarBadge:
          route.name === "Səbət" && cartItems.length > 0
            ? cartItems.length
            : null,
      })}
    >
      <Tab.Screen name="Ev" component={Ev} options={{ headerShown: false }} />
      <Tab.Screen
        name="Profil"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Kataloq"
        component={KataloqStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Səbət"
        component={SebetimStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Bəyənilər"
        component={FavoriteStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={{ headerTitle: "Məhsul haqqında", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="UrunDetay"
        component={UrunDetay}
        options={{ headerTitle: "Məhsul haqqında", headerTitleAlign: "center" }}
      />

    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    paddingLeft: 15,
    fontSize: 14,
    backgroundColor: "#f1f1f1",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: 80,
    gap: 8,
  },
});