import {
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Dimensions, 
} from "react-native";
import CardItem from "../components/CardItem"; 
import { useSelector } from "react-redux";

const { height } = Dimensions.get("window");

const Sebetim = ({removeFromCart, incrementQuantity, decrementQuantity }) => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems} 
        keyExtractor={(item) => `${item.id}-${item.price}`} 
        renderItem={({ item }) => <CardItem item={item}
        removeFromCart={removeFromCart} 
        incrementQuantity={incrementQuantity} 
        decrementQuantity={decrementQuantity}/>}
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
  },
  removeText: {
    color: "white",
    fontSize: 16,
  },
  totalText: {
    fontSize: 16, 
    fontWeight: "bold", 
  },
  priceText: {
    fontSize: 18, 
    fontWeight: "bold",
    color: "#27ae60", 
  },
  priceContainer: {
    flex: 1, 
    flexDirection: "col", 
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
    borderRadius: 10, 
  },

  view: {
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: "2%",
    height: height * 0.12, 
    backgroundColor: "#fefefe", 
    marginBottom:40
  },
  emptyCart: {
    textAlign: "center", 
    fontSize: 18,
    marginTop: 20, 
  },
  removeButton: {
    backgroundColor: "#f53d3d", 
    padding: 10, 
    borderRadius: 10, 
    marginLeft: 10,
    marginTop: 10, 
    width: "40%", 
  },
});
