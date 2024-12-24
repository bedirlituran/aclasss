import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");
const CardItem = ({ product }) => {
  return (
        <View style={{width:'100%' ,backgroundColor:'white',
        }}>
        <View
      style={{
        width: width * 0.92,
        height: height * 0.13,
        justifyContent: "space-between",
        marginHorizontal: width * 0.04,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "lightgray",
        borderBottomWidth: 0.6,
        shadowOpacity: 0.4,
        shadowColor: "gray",
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      <View className="flex-row items-center ">
        <Image
          source={require("../assets/qadin/cins.png")}
          style={{ width: height * 0.09, height: height * 0.09 }}
        />
        <View className="ml-2">
          <Text className="text-md font-semibold" style={{maxWidth:width*0.46}}>colins slim fit cins </Text>
          <Text className="color-blue-400 font-bold mt-2 font-lg">
            150 {"\u20BC"}
          </Text>
        </View>
      </View>
      {/* //counter */}
      <View
        style={{
            flexDirection: 'row',
            alignItems:'center',
          width: width * 0.26,
          borderColor: "lightgray",
          borderWidth: 0.5,
          height: height * 0.042,
          borderRadius: 10,
          justifyContent: "space-around",
          shadowOpacity: 0.4,
          shadowColor:'red',
        }}
      >
        <View className="flex-1 items-center">
          <Text className="font-semibold">-</Text>
        </View>
        <View className="flex-1 items-center bg-blue-700 h-full w-full justify-center">
          <Text className=" text-white font-bold">1</Text>
        </View>

        <View className="flex-1 items-center">
          <Text className="font-semibold">+</Text>
        </View>
      </View>
    </View>
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({});
