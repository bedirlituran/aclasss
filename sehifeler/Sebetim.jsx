import {
  StyleSheet, // StyleSheet, stil tanımlamak için kullanılır
  Text, // Text, metinleri eklemek için kullanılır
  View, // View, görünüm bileşenini oluşturmak için kullanılır
  FlatList, // FlatList, liste halinde veri görüntülemek için kullanılır
  TouchableOpacity, // TouchableOpacity, tıklanabilir öğe (buton vb.) oluşturur
  Dimensions, // Dimensions, ekran boyutlarını almak için kullanılır
} from "react-native"; // React Native bileşenlerini içe aktarır
import React from "react"; // React'i projeye dahil eder
import CardItem from "../components/CardItem"; // CardItem bileşenini içe aktarır
import { useDispatch, useSelector } from "react-redux"; // Redux state yönetimi için hook'lar
import { addToCart, removeFromCart } from "../store/cartSlice";
// import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

// Sebetim bileşeni, sepetteki ürünleri görüntüler ve yönetir
const Sebetim = () => {
  // Redux store'dan sepetteki ürünleri alır
  const cartItems = useSelector((state) => state.cart.items);
  // Redux'a dispatch yapmak için dispatch fonksiyonu kullanılır
  const dispatch = useDispatch();

  // Sepete ürün ekleme fonksiyonu
  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Sepete ürün ekleme
  };

  // Sepetten ürün çıkarma fonksiyonu
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product)); // Sepetten ürün çıkarma
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems} // Liste verisi, sepetteki ürünleri temsil eder
        keyExtractor={(item) => item.id.toString()} // Liste elemanlarının benzersiz anahtarları
        renderItem={({ item }) => <CardItem item={item} />}
      />
      <View style={styles.view}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyCart}>Sebetiniz Boshdur</Text>
        ) : (
          <View className="flex-row">
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => alert("Proceed to checkout")}
            >
              <Text style={styles.buttonText}>Davam Et</Text>
            </TouchableOpacity>
            <View style={styles.priceContainer}>
              <Text style={styles.totalText}>Cəm: </Text>
              <Text style={styles.priceText}>
                {cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}
                ₼
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Sebetim; // Sebetim bileşenini dışa aktarır

// Stil tanımlamaları
const styles = StyleSheet.create({
  container: {
    flex: 1, // Container'ı tam ekran yapmak için flex kullanılır
  },
  removeText: {
    color: "white", // Silme butonunun yazı rengi
    fontSize: 16, // Yazı boyutu
  },
  totalText: {
    fontSize: 16, // Toplam fiyatın yazı boyutu
    fontWeight: "bold", // Yazıyı kalın yapar
  },
  priceText: {
    fontSize: 18, // Fiyatın yazı boyutu
    fontWeight: "bold", // Fiyatı kalın yapar
    color: "#27ae60", // Fiyatın yazı rengi yeşil
  },
  priceContainer: {
    flex: 1, // Fiyat ve toplamın bulunduğu kısmın esnekliği
    flexDirection: "col", // Fiyatın ve toplamın yatayda sıralanması
    justifyContent: "flex-end", // Sağ tarafa hizalama
    alignItems: "center", // Yatayda ortalama
  },
  buttonText: {
    color: "#fff", // Buton yazısının rengi
    fontSize: 16, // Yazı boyutu
    fontWeight: "bold", // Yazıyı kalın yapar
  },
  buttons: {
    flex: 1, // Butonun genişliği
    backgroundColor: "#5d3ebd", // Butonun arka plan rengi
    justifyContent: "center", // Butonun içeriğini ortalar
    alignItems: "center", // Buton içeriğini dikeyde ortalar
    paddingVertical: 12, // Butonun dikeydeki boşluğu
    borderRadius: 10, // Butonun köşe yuvarlaklığı
  },

  view: {
    flexDirection: "row", // Alt kısımda yatayda sıralama
    alignItems: "center", // Elemanları ortalama
    paddingHorizontal: "2%", // Yatayda %4 iç boşluk bırakma
    height: height * 0.12, // Alt kısmın yüksekliği ekranın %12'si kadar
    backgroundColor: "#fefefe", // Arka plan rengi
    marginBottom:40
  },
  emptyCart: {
    textAlign: "center", // Yazıyı ortalar
    fontSize: 18, // Yazı boyutu
    marginTop: 20, // Üst boşluk
  },
  removeButton: {
    backgroundColor: "#f53d3d", // Silme butonunun arka plan rengi
    padding: 10, // Butonun içindeki boşluk
    borderRadius: 10, // Butonun köşe yuvarlaklığı
    marginLeft: 10, // Sol boşluk
    marginTop: 10, // Üst boşluk
    width: "40%", // Butonun genişliği
  },
});
