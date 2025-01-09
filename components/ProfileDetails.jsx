import { View, Text, Image, TouchableOpacity,Dimensions } from "react-native";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import WhatsAppButton from './WhatsAppButton'
const {height, width}= Dimensions.get('window')
const ProfileDetails = () => {
  return (
    <View style={{ padding: 15, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }}>
      
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3N5jeFH2PTk7tx5nUsWNOzB_IuUxd67m8hw&s' }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginRight: 15,
            borderWidth: 2,
            borderColor: 'green',
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowRadius: 4,
            shadowOpacity: 0.7,
            elevation: 4
          }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>Colins</Text>
      </View>

      <View style={{width:width }}>
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "#333",textAlign:'start' }}>Hər növ geyimlər</Text>
        
        <View style={{ flexDirection: "row",marginTop: 5 ,width:width,gap:2}}>
          <Ionicons name="navigate-sharp" size={20} color="black" />
          <Text style={{ marginLeft: 5, fontSize: 14, color: "gray",textAlign:'left',fontWeight:'semibold'  }}>- Binəqədi 8mkr , C.Xendan kucesi</Text>
        </View>
        <View style={{ flexDirection: "row",marginTop: 5 ,width:width,gap:2}}>
        <Entypo name="phone" size={20} color="black" />
          <Text style={{ marginLeft: 5, fontSize: 14, color: "gray",textAlign:'left',fontWeight:'semibold'   }}> - (055) 808 08 01</Text>
        </View>

        <TouchableOpacity>
          <Text style={{
            color: "#fb5607",
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 5
          }}>See transactions</Text>
        </TouchableOpacity>
      </View>

      {/* Profil Butonu */}
      {/* <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 15 }}>
        <TouchableOpacity style={{
          backgroundColor: "black",
          width: "75%",
          paddingVertical: 12,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Text style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 16
          }}>
            Profil
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default ProfileDetails;
