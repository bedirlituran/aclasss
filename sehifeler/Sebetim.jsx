import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import CardItem from "../components/CardItem";

const { width, height } = Dimensions.get("window");
const Sebetim = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={CardItem}
        renderItem={({ item }) => (
          <View>
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
          </View>
        )}
      />
      <View style={styles.view}>
        <TouchableOpacity style={styles.button}>
          <Text className="font-bold text-white text-lg">Davam Et</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pul}>
          <Text className="text-xl font-semibold">24{"\u20BC"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sebetim;

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
  button: {
    height: height * 0.06,
    flex: 3,
    backgroundColor: "#5d3ebd",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  pul: {
    height: height * 0.06,
    flex: 1,
    backgroundColor: "#f9f9f9",
    marginLeft: "2%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -10,
    borderBottomRightRadius:10,
    borderTopRightRadius: 10,
  },
});
