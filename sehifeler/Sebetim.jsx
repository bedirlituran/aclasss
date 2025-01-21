import {
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Dimensions, 
  Platform,
} from "react-native";
import CardItem from "../components/CardItem"; 
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const { height } = Dimensions.get("window");

const Sebetim = ({ removeFromCart, incrementQuantity, decrementQuantity,product }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems} 
        keyExtractor={(item) => `${item.id}-${item.price}`} 
        style={styles.flat}
        renderItem={({ item }) => (
          <TouchableOpacity  
          onPress={() =>
            navigation.navigate("UrunDetay", {
              title: item.title,
              description: item.description,
              price: item.price,
              image: item.image,
            })
          }
          
          >
              <CardItem 
            item={item}
            removeFromCart={removeFromCart} 
            incrementQuantity={incrementQuantity} 
            decrementQuantity={decrementQuantity}
          />
          </TouchableOpacity>
        
        )}
      />
      <View style={styles.view}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyCart}>Səbətiniz Boşdur</Text>
        ) : (
          <View style={styles.actionRow}>
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
                ).toFixed(2)}
                <Text>₼</Text>
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Sebetim; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    
  },
  removeText: {
    color: "white",
    fontSize: 16,
  },
  totalText: {
    fontSize: Platform.OS === "ios" ? 18 : 16, 
    fontWeight: "bold", 
  },
  priceText: {
    fontSize: Platform.OS === "ios" ? 20 : 18, 
    fontWeight: "bold",
    color: "#27ae60", 
  },
  priceContainer: {
    flex: 1, 
    flexDirection: "column", 
    justifyContent: "flex-end", 
    alignItems: "center", 
  },
  buttonText: {
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold", 
  },
  buttons: {
    flex: 1,
    backgroundColor: "#5d3ebd", 
    justifyContent: "center", 
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: Platform.OS === "ios" ? 12 : 8, 
    marginHorizontal: Platform.OS === "ios" ? 5 : 10,
  },
  view: {
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: "2%",
    height: height * 0.12, 
    backgroundColor: "#fefefe", 
    shadowColor: Platform.OS === "ios" ? "#000" : "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  emptyCart: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 30,
    fontStyle: "italic",
    paddingHorizontal: 10,
  },
  removeButton: {
    backgroundColor: "#f53d3d", 
    padding: Platform.OS === "ios" ? 12 : 10, 
    borderRadius: 10, 
    marginLeft: 10,
    marginTop: 10, 
    width: "40%", 
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flat:{
    marginBottom: 10,
    paddingHorizontal: "2%",
    paddingVertical: 10,

  }
});
