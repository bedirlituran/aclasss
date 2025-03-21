import { View, Text, Image, TouchableOpacity, Dimensions,StyleSheet,Modal } from "react-native";
import React,{useState,useEffect} from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import WhatsAppButton from './WhatsAppButton'
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage'ı import ediyoruz.

const { height, width } = Dimensions.get('window')
const ProfileDetails = () => {
  const [modalVisible, setModalVisible] = useState(false); // Menü modal'ının görünürlüğü
  const [image, setImage] = useState(""); // Seçilen resmin URI'sini sakla

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImage(selectedImageUri);
      
      // Seçilen resmi AsyncStorage'a kaydediyoruz.
      try {
        await AsyncStorage.setItem("profileImage", selectedImageUri);
      } catch (error) {
        Alert.alert("Hata", "Resim kaydedilirken bir hata oluştu.");
      }
    }
  };

  // Uygulama açıldığında AsyncStorage'dan resim URI'sini yükle
  useEffect(() => {
    const loadImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem("profileImage");
        if (savedImage) {
          setImage(savedImage);
        }
      } catch (error) {
        Alert.alert("Hata", "Resim yüklenirken bir hata oluştu.");
      }
    };

    loadImage(); // Component mount olduğunda AsyncStorage'dan resmi yükle
  }, []);

    // // Menü seçeneklerini işlemek için fonksiyonlar
    // const handleChangeProfilePicture = () => {
    //   // Profil resmi değiştirme işlemi
    //   console.log('Profil resmi değiştir');
    //   setModalVisible(false); // Modal'ı kapat
    // };

    // const handleDeleteProfilePicture = () => {
    //   // Profil resmi silme işlemi
    //   console.log('Profil resmi silindi');
    //   setModalVisible(false); // Modal'ı kapat
    // };
  return (
    <View style={{ padding: 9, borderBottomWidth: 0.5, borderBottomColor: 'lightgray', }}>
      <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
        <View style={{ flexDirection: "row", alignItems: "center", }}>
   
              {image ? (
          <Image source={{ uri: image }}   style={{
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
          resizeMode="contain" />
        ) : (
          <Text style={styles.noImageText}>Profil resmi seçilmedi</Text>
        )}
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>Colins</Text>
        </View>

        <TouchableOpacity style={styles.menuButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="menu-sharp" size={24} color="black" />

          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Profil</Text>
            <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
              <Text style={styles.optionText}>Profil şəklini dəyişdir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => setImage('')}>
              <Text style={styles.optionText}>Profil şəklini sil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.optionText}>Bağla</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        </TouchableOpacity>

      </View>


      <View style={{ display: 'flex', padding: 5,marginTop:17 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#333', textAlign: 'start' }}>Hər növ geyimlər</Text>

        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 5, width: width, gap: 2, marginBottom: 8 }}>
          <Ionicons name="navigate-circle-outline" size={20} color="black" />
          <Text style={{ marginLeft: 5, fontSize: 14, color: 'gray', textAlign: 'left', fontWeight: 'semibold' }}>
            - Binəqədi 8mkr , C.Xendan kucesi
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 5, width: width, gap: 2, marginBottom: 8 }}>
          <Feather name="phone-call" size={20} color="black" />
          <Text style={{ marginLeft: 5, fontSize: 14, color: 'gray', textAlign: 'left', fontWeight: 'semibold' }}>
            - (055) 808 08 01
          </Text>
        </TouchableOpacity>

        {/* WhatsApp Section */}
        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 5, width: width, gap: 4, alignItems: 'center', marginBottom: 12 }}>
          <View style={{ paddingVerticalL: 30 }}>
            <WhatsAppButton />

          </View>
          <Text style={{ fontSize: 14, color: 'gray', fontWeight: 'semibold' }}>- (055) 808 08 01</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default ProfileDetails;


const styles = StyleSheet.create({
  menuButton: {
    backgroundColor: 'lightgray',
    padding: 12,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Gölge arka plan
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: 'lightgray',
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})