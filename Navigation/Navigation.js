import * as React from "react";
import { TouchableOpacity } from "react-native";
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
const Stack = createNativeStackNavigator();

const Navigation = () => {

  
  return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center", // Tüm başlıkları ortaya hizalar
        }}
      >
     
        <Stack.Screen
          name="Sekil"
          component={Sekil}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
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
          options={{ title: "Məhsul haqqında" }}
        />

        <Stack.Screen
          name="FavoriteScreen"
          component={FavoriteScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
};

export default Navigation;
