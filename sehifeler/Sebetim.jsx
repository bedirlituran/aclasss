import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import CardItem from "../components/CardItem";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("window");

const Sebetim = ({ removeFromCart, incrementQuantity, decrementQuantity }) => {
  const cartItems = useSelector((state) => state.cart?.items || []);

  const navigation = useNavigation();

  const calculateTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.sellingPrice * item.quantity,
      0
    ).toFixed(2);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Səbət Boşdur", "Səbətinizə əlavə etmək üçün məhsul seçin");
      return;
    }
    Alert.alert(
      "Sifarişi Tamamla",
      `Ümumi məbləğ: ${calculateTotal()}₼\nSifarişi tamamlamaq istəyirsiniz?`,
      [
        { text: "Ləğv et", style: "cancel" },
        { text: "Təsdiqlə", onPress: () => navigation.navigate("Checkout") },
      ]
    );
  };

 

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyCart}>Səbətiniz Boşdur</Text>
          <TouchableOpacity
            style={styles.continueShopping}
            onPress={() => navigation.navigate("Ev")}
          >
            <Text style={styles.continueShoppingText}>Alış-verişə davam et</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => `${item.id}-${item.sellingPrice}`}
            contentContainerStyle={styles.flatListContent}
            style={styles.flatList}
            renderItem={({ item }) => (
            
                <CardItem
                  item={item}
                  removeFromCart={removeFromCart}
                  incrementQuantity={incrementQuantity}
                  decrementQuantity={decrementQuantity}
                />
             
            )}
            ListFooterComponent={<View style={styles.footer} />}
          />
          <View style={styles.bottomBar}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Ümumi:</Text>
              <Text style={styles.priceText}>
                {calculateTotal()}
                <Text style={styles.currency}>₼</Text>
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
              disabled={cartItems.length === 0}
            >
              <Text style={styles.checkoutButtonText}>Sifarişi tamamla</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Sebetim;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: height * 0.2,
  },
  emptyCart: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
  continueShopping: {
    backgroundColor: "#5d3ebd",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueShoppingText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: width * 0.04,
    paddingTop: 12,
    paddingBottom: height * 0.14,
  },
  footer: {
    height: height * 0.1,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.04,
    height: height * 0.12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  totalText: {
    fontSize: Platform.OS === "ios" ? 17 : 16,
    fontWeight: "600",
    color: "#333",
    marginRight: 6,
  },
  priceText: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontWeight: "700",
    color: "#27ae60",
  },
  currency: {
    fontSize: Platform.OS === "ios" ? 18 : 16,
  },
  checkoutButton: {
    backgroundColor: "#5d3ebd",
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    minWidth: width * 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: Platform.OS === "ios" ? 16 : 15,
    fontWeight: "600",
  },
});