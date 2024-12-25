import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux"; // Redux state yönetimi için hook'lar
import { removeFromCart, decrementQuantity, incrementQuantity } from "../store/cartSlice";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const CardItem = ({ item }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product)); // Sepetten ürün çıkarma
  };

  const handleIncrement = (product) => {
    dispatch(incrementQuantity(product)); // Miktarı artırma
  };

  const handleDecrement = (product) => {
    dispatch(decrementQuantity(product)); // Miktarı azaltma
  };

  return (
    <View style={{ width: '100%' }}> {/* Tam ekran genişliği için */}
      <View
        style={{
          width: '100%', // Kartın genişliğini tam ekran yapıyoruz
          height: height * 0.13,
          justifyContent: "space-around",
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
          borderBottomColor: "lightgray",
          borderBottomWidth: 0.6,
          shadowOpacity: 0.4,
          shadowColor: "gray",
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 2 },
          paddingVertical: 16,
          paddingHorizontal: 10,
          borderRadius: 10,
          elevation: 2,
          marginBottom: 10,
          overflow: "hidden",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ borderWidth: 0.6, borderColor: 'lightgray', borderRadius: 8,  }}>
            <Image
              source={{ uri: item.image }}
              style={{ width: height * 0.09, height: height * 0.09 }}
              resizeMode="cover"
              borderRadius={8}
            />
          </View>

          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', maxWidth: width * 0.35 }}>{item.title} </Text>
            <Text style={{ color: 'blue', fontWeight: 'bold', marginTop: 5, fontSize: 16 }}>
              {item.price}₼
            </Text>
          </View>
        </View>

        {/* Miktar Kontrol */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "space-around",
            width: width * 0.28,
            height: height * 0.10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
            
          }}
        >
          <TouchableOpacity
            style={{ flex: 1, alignItems: "center", borderWidth: 0.5, borderColor: 'lightgray' }}
            onPress={() => handleDecrement(item)}
          >
            <Text style={{ fontWeight: '600', fontSize: 20 }}>-</Text>
          </TouchableOpacity>

          <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
            {item.quantity}
          </Text>

          <TouchableOpacity
            style={{ flex: 1, alignItems: "center", borderWidth: 0.5, borderColor: 'lightgray' }}
            onPress={() => handleIncrement(item)}
          >
            <Text style={{ fontWeight: '600', fontSize: 20 }}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => handleRemoveFromCart(item)}>
          <Ionicons name="trash" size={23} color="#54342b" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  view: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "4%",
    height: height * 0.12,
    backgroundColor: "#fefefe",
  },
});
