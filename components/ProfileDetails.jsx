import { View, Text, Image, TouchableOpacity,Dimensions } from "react-native";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import WhatsAppButton from './WhatsAppButton'
const {height, width}= Dimensions.get('window')
const ProfileDetails = () => {
  return (
    <View style={{ padding: 9, borderBottomWidth: 0.5, borderBottomColor: 'lightgray', }}>
      
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

      <View style={{display: 'flex',padding:5}}>
  <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#333', textAlign: 'start' }}>Hər növ geyimlər</Text>

  <TouchableOpacity style={{ flexDirection: 'row', marginTop: 5, width: width, gap: 2,marginBottom:8 }}>
  <Ionicons name="navigate-circle-outline" size={20} color="black" />
    <Text style={{ marginLeft: 5, fontSize: 14, color: 'gray', textAlign: 'left', fontWeight: 'semibold' }}>
      - Binəqədi 8mkr , C.Xendan kucesi
    </Text>
  </TouchableOpacity>

  <TouchableOpacity style={{ flexDirection: 'row', marginTop: 5, width: width, gap: 2,marginBottom:8 }}>
  <Feather name="phone-call" size={20} color="black" />
    <Text style={{ marginLeft: 5, fontSize: 14, color: 'gray', textAlign: 'left', fontWeight: 'semibold' }}>
      - (055) 808 08 01
    </Text>
  </TouchableOpacity>

  {/* WhatsApp Section */}
  <TouchableOpacity style={{ flexDirection: 'row', marginTop: 5, width: width, gap: 4, alignItems: 'center',marginBottom:12}}>
    <View style={{paddingVerticalL:30}}>
    <WhatsAppButton />

    </View>
    <Text style={{ fontSize: 14, color: 'gray', fontWeight: 'semibold' }}>- (055) 808 08 01</Text>
  </TouchableOpacity>

  {/* <TouchableOpacity>
    <Text style={{
      color: '#fb5607',
      fontSize: 16,
      fontWeight: 'bold',
    }}>Reklam bölməsi</Text>
  </TouchableOpacity>
  */}
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
