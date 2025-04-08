import * as React from "react";
import { useRef, useCallback, useState, useEffect } from "react";
import { View, TouchableOpacity, Platform, Text, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import Sebetim from "../sehifeler/Sebetim";
import UrunDetay from "../sehifeler/UrunDetay";
import FavoriteScreen from "../sehifeler/FavoriteScreen";
import Ev from "../components/Ev";
import ProductDetailsScreen from "../sehifeler/ProductDetailsScreen";
import Esasgiris from "../sehifeler/Esasgiris";
import Giris from "../sehifeler/Giris";
import Qeydiyyat from "../sehifeler/Qeydiyyat";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import SearchScreen from "../sehifeler/SearchScreen";
import { addImage } from "../store/imageSlice";
import ProductAddPage from "../components/ProductAddPage";
import OTPVerification from "../sehifeler/OTPVerification";
import MagazaRegister from "../sehifeler/MagazaRegister";
import UserProfil from "../sehifeler/UserProfil";
import SellerProfile from "../sehifeler/SellerProfile";
import { selectIsFirstLaunch, selectIsLoggedIn, selectUser, completeOnboarding } from '../store/authSlice';

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

const TabNavigator = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);
  const homeTabPressCount = useRef(0);
  const lastTabPressTime = useRef(0);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMediaUri, setSelectedMediaUri] = useState('');
  const [selectedMediaFormat, setSelectedMediaFormat] = useState('');
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const pickImage = async () => {
    if (!isLoggedIn) {
      showAuthAlert();
      return;
    }

    Alert.alert(
      "Şəkil vəya Video Seç",
      "Qalereya vəya Kameradan şəkil və video seçə bilərsiniz.",
      [
        {
          text: "Qalereya",
          onPress: async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Giriş rədd edildi', 'Şəkilləri və videoları seçə bilmek üçün icazə verməlisiniz.');
              return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaType.All,
              allowsEditing: false,
              aspect: [4, 3],
              quality: 1,
            });

            handleMediaSelection(result);
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
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: false,
              aspect: [4, 3],
              quality: 1,
            });

            handleMediaSelection(result);
          }
        },
        {
          text: "Bağla",
          style: "cancel"
        }
      ]
    );
  };

  const handleMediaSelection = (result) => {
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      const mediaUri = selectedAsset.uri;
      const mediaType = selectedAsset.type;
      const mediaFormat = mediaType === 'video' ? 'video/mp4' : 'image/jpeg';
  
      setSelectedMediaUri(mediaUri);
      setSelectedMediaFormat(mediaFormat);
      dispatch(addImage(mediaUri));
      setModalVisible(true);
    } else {
      Alert.alert('Hata', 'Geçersiz medya seçimi. Lütfen tekrar deneyin.');
    }
  };
  

  const handleTabPress = useCallback((e) => {
    const currentTime = Date.now();
    if (e.target === 'Ev') {
      if (currentTime - lastTabPressTime.current < 300) {
        homeTabPressCount.current += 1;
        if (homeTabPressCount.current % 2 === 0) {
          navigation.emit({
            type: 'tabPress',
            target: e.target,
            canPrEventDefault: true,
          });
        } else {
          navigation.emit({
            type: 'tabLongPress',
            target: e.target,
          });
        }
      } else {
        homeTabPressCount.current = 1;
      }
      lastTabPressTime.current = currentTime;
    }
  }, [navigation]);

  const showAuthAlert = () => {
    Alert.alert(
      "Giriş Tələb Olunur",
      "Bu əməliyyatı yerinə yetirmək üçün qeydiyyat olmalısınız.",
      [
        { text: "İptal", style: "cancel" },
        { text: "Qeydiyyat", onPress: () => navigation.navigate("Qeydiyyat") }
      ]
    );
  };

  const profileLog = () => {
    if (user?.userType === 'SELLER') {
      navigation.navigate('SellerProfile');
    } else {
      navigation.navigate('UserProfil');
    }
  };

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
        tabBarStyle: {
          height: Platform.OS === "ios" ? 80 : 60,
          paddingBottom: Platform.OS === "ios" ? 25 : 10,
          paddingTop: 6,
          borderTopWidth: 0.5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
      })}
      screenListeners={{
        tabPress: handleTabPress,
      }}
    >
      <Tab.Screen name="Ev" component={Ev} options={{ headerShown: false }} />
      <Tab.Screen
        name="Səbət"
        component={Sebetim}
        options={{ headerShown: false }}
        listeners={{
          tabPress: (e) => {
            if (!isLoggedIn) {
              e.preventDefault();
              showAuthAlert();
            }
          }
        }}
      />
      <Tab.Screen
        name="Əlavə et"
        component={Esasgiris}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={pickImage}
              style={{
                top: -16,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 3 },
              }}
            >
              <ProductAddPage
                visible={modalVisible}
                onClose={() => {
                  setModalVisible(false);
                  setSelectedMediaUri('');
                  setSelectedMediaFormat('');
                }}
                imageUri={selectedMediaUri}
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
                borderWidth:0.3

                }}
              >
                <Ionicons name="add-circle-outline" size={48} color="#fb5607" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Bəyənilər"
        component={FavoriteScreen}
        options={{ headerShown: false }}
        listeners={{
          tabPress: (e) => {
            if (!isLoggedIn) {
              e.preventDefault();
              showAuthAlert();
            }
          }
        }}
      />
      <Tab.Screen
  name="Profil"
  component={UserProfil} // Varsayılan bileşen (önemsiz, çünkü yönlendirmeyi manuel yapıyoruz)
  options={{ headerShown: false }}
  listeners={{
    tabPress: (e) => {
      if (!isLoggedIn) {
        e.preventDefault(); // Giriş yapılmamışsa sekme değişmesin
        showAuthAlert(); // "Giriş yapmalısınız" uyarısı göster
      } else {
        e.preventDefault(); // Varsayılan navigasyonu engelle
        profileLog(); // Kullanıcı tipine göre yönlendir
      }
    }
  }}
/>
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFirstLaunch = useSelector(selectIsFirstLaunch);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (isFirstLaunch) {
      dispatch(completeOnboarding());
    }
  }, [isFirstLaunch, dispatch]);

  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? 'Ev' : 'Esasgiris'}>
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
      <Stack.Screen name="UserProfil" component={UserProfil} options={{ headerShown: false }} />
      <Stack.Screen name="SellerProfile" component={SellerProfile} options={{ headerShown: false }} />
      <Stack.Screen name="Esasgiris" component={Esasgiris} options={{ headerShown: false }} />
      <Stack.Screen name="ProductAddPage" component={ProductAddPage} options={{ headerShown: false }} />

      <Stack.Screen name="OTPVerification" component={OTPVerification} options={{
        header: () => (
          <View style={{ height: 60, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ marginLeft: 15, padding: 10 }} onPress={() => navigation.goBack()}>
              <Ionicons name="return-up-back" size={24} color={Platform.OS === 'ios' ? '#000' : '#000'} />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: Platform.OS === 'ios' ? '#000' : '#000' }}>Otp Doğrulama</Text>
            <TouchableOpacity style={{ marginRight: 15, opacity: 0 }}>
              <Ionicons name="notifications" size={24} color={Platform.OS === 'ios' ? '#000' : '#fff'} />
            </TouchableOpacity>
          </View>
        ),
      }} />
      <Stack.Screen name="MagazaRegister" component={MagazaRegister} options={{
        header: () => (
          <View style={{ height: 60, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ marginLeft: 15, padding: 10 }} onPress={() => navigation.goBack()}>
              <Ionicons name="return-up-back" size={24} color={Platform.OS === 'ios' ? '#000' : '#000'} />
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: Platform.OS === 'ios' ? '#000' : '#000' }}>Mağaza Qeydiyyat</Text>
            <TouchableOpacity style={{ marginRight: 15, opacity: 0 }}>
              <Ionicons name="notifications" size={24} color={Platform.OS === 'ios' ? '#000' : '#fff'} />
            </TouchableOpacity>
          </View>
        ),
      }} />
    </Stack.Navigator>
  );
};

export default Navigation;
