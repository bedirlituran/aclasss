import * as React from "react";
import { useRef, useCallback, useState } from "react";
import { View, TouchableOpacity, Platform, Text, Alert  } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useSelector,useDispatch } from "react-redux";
import Profile from "../sehifeler/Profile";
import Sebetim from "../sehifeler/Sebetim";
import UrunDetay from "../sehifeler/UrunDetay";
import FavoriteScreen from "../sehifeler/FavoriteScreen";
import Ev from "../components/Ev";
import ProductDetailsScreen from "../sehifeler/ProductDetailsScreen";
import Esasgiris from "../sehifeler/Esasgiris";
import Giris from "../sehifeler/Giris";
import Qeydiyyat from "../sehifeler/Qeydiyyat";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker"
import SearchScreen from "../sehifeler/SearchScreen";
import { addImage } from "../store/imageSlice";
import ProductModal from "../components/ProductModal"
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

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const TabNavigator = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);
  const homeTabPressCount = useRef(0);
  const lastTabPressTime = useRef(0);
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    Alert.alert(
      "Şəkil vəya Video Seç",
      "Qalereya vəya Kameradan şəkil və video seçə bilərsiniz.",
      [
        {
          text: "Qalereya",
          onPress: async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Giriş rədd edildi', 'Şəkilləri seçə bilmek üçün icazə verməlisiniz.');
              return;
            }
  
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeImages,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
  
            if (!result.canceled && result.assets[0]?.uri) {
              const imageUri = result.assets[0].uri;
              setModalVisible(true);
              dispatch(addImage(imageUri)); // Redux'a kaydediyoruz
            } else {
              console.log('Hata', 'Geçersiz resim URI\'si');
            }
          }
        },
        {
          text: "Kamera",
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Kameraya giriş rədd edildi', 'Kamera giriş üçün izacə verməlisiniz.');
              return;
            }
  
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
  
            if (!result.canceled && result.assets[0]?.uri) {
              const imageUri = result.assets[0].uri;
              dispatch(addImage(imageUri)); // Redux'a kaydediyoruz
            } else {
              console.log('Hata', 'Geçersiz resim URI\'si');
            }
          }
        },
        {
          text: "Bağla",
          style: "cancel"
        }
      ]
    );
  };

  const handleTabPress = useCallback((e) => {
    const currentTime = Date.now();
    if (e.target === 'Ev') {
      if (currentTime - lastTabPressTime.current < 300) {
        // Double tap detected
        homeTabPressCount.current += 1;
        if (homeTabPressCount.current % 2 === 0) {
          // Even number of taps, trigger refresh
          navigation.emit({
            type: 'tabPress',
            target: e.target,
            canPrEventDefault: true,
          });
        } else {
          // Odd number of taps, scroll to top
          navigation.emit({
            type: 'tabLongPress',
            target: e.target,
          });
        }
      } else {
        // Single tap
        homeTabPressCount.current = 1;
      }
      lastTabPressTime.current = currentTime;
    }
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getIconName(route.name, focused);
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fb5607",
        tabBarInactiveTintColor: "gray",
        tabBarBadge: route.name === "Səbət" && cartItems.length > 0 ? cartItems.length : undefined,
      })}
      screenListeners={{
        tabPress: handleTabPress,
      }}
    >
      <Tab.Screen name="Ev" component={Ev} options={{ headerShown: false }} />
      <Tab.Screen
        name="Profil"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
      {/* Əlavə et Butonu */}
      <Tab.Screen
        name="Əlavə et"
        component={Esasgiris} // Burada açılacak sayfanı seç
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={pickImage}  // Resim yükleme işlemi yapılacak
              style={{
                top: -16,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 3 },
              }}
            >
               <ProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        imageUri={image}
      />
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOpacity: 0.2,
                  shadowOffset: { width: 0, height: 2 },
                }}
              >
                <Ionicons name="add-circle-outline" size={48} color="#fb5607" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Səbət"
        component={Sebetim}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Bəyənilər"
        component={FavoriteScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Esasgiris" component={Esasgiris} options={{ headerShown: false }} />
      <Stack.Screen name="Giris" component={Giris} options={{
        header: () => (
          <View style={{ height: 60, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ marginLeft: 15, padding: 10 }} onPress={() => navigation.goBack()}>
              <Ionicons name="return-up-back" size={24} color={Platform.OS === 'ios' ? '#000' : '#000'} />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: Platform.OS === 'ios' ? '#000' : '#000' }}>Giriş et</Text>
            <TouchableOpacity style={{ marginRight: 15, opacity: 0 }}>
              <Ionicons name="notifications" size={24} color={Platform.OS === 'ios' ? '#000' : '#fff'} />
            </TouchableOpacity>
          </View>
        ),
      }} />
      <Stack.Screen name="Qeydiyyat" component={Qeydiyyat} options={{
        header: () => (
          <View style={{ height: 60, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ marginLeft: 15, padding: 10 }} onPress={() => navigation.goBack()}>
              <Ionicons name="return-up-back" size={24} color={Platform.OS === 'ios' ? '#000' : '#000'} />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: Platform.OS === 'ios' ? '#000' : '#000' }}>Qeyd ol</Text>
            <TouchableOpacity style={{ marginRight: 15, opacity: 0 }}>
              <Ionicons name="notifications" size={24} color={Platform.OS === 'ios' ? '#000' : '#fff'} />
            </TouchableOpacity>
          </View>
        ),
      }} />
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UrunDetay" component={UrunDetay} options={{ headerShown: false }} />
      <Stack.Screen name="Kataloq" component={SearchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Sebetim" component={Sebetim} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />



    </Stack.Navigator>
  );
};

export default Navigation;
