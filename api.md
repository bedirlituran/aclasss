http://45.32.159.199:8081/api/categories/main -- Kisi ve qadin kategoriyalar
http://45.32.159.199:8081/api/categories/sub?category=Erkek -- Kisi alt kategoriyalar
http://45.32.159.199:8081/api/categories/sub?category=Kadin -- Qadin alt kategoriyalar
http://45.32.159.199:8081/api/categories/sub?details=Erkek -- Kisi alt kategoriyalar
http://45.32.159.199:8081/api/categories/details?subCategoryName=Ayakkabi -- Ayaqqabi reng ve olculer


http://45.32.159.199:8081/api/productItem/getAll?page=0&size=10     --- esas sehife

         <Image source={{ uri:'data:image/jpeg;base64,' + item.images[0]}} style={styles.avatar}  />



{'\u20BC'}-------azn isaresi



reklam elave
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   ScrollView,
//   StyleSheet,
//   Image,
//   Dimensions,
// } from "react-native";
// import SkeletonLoader from "./SkeletonLoader";

// const { width } = Dimensions.get("window");

// const AdCarousel = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [images, setImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products?limit=7")
//       .then((res) => res.json())
//       .then((json) => {
//         const fetchedData = json.map((item) => ({
//           image: item.image,
//         }));
//         setImages(fetchedData);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Internetinizi yoxlayın: ", error);
//         setIsLoading(false);
//       });
//   }, []);

//   const handleScroll = (event) => {
//     const contentOffsetX = event.nativeEvent.contentOffset.x;
//     const index = Math.floor(contentOffsetX / width);
//     setActiveIndex(index);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <ScrollView
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//         style={styles.scrollContainer}
//         contentContainerStyle={{ paddingHorizontal: 10 }}
//       >
//         {isLoading
//           ? // Skeleton Loader'lar gösteriliyor
//             Array.from({ length: 5 }).map((_, index) => (
//               <View key={index} style={styles.adBox}>
//                 <SkeletonLoader />
//               </View>
//             ))
//           : // Yükleme tamamlandığında görüntüler gösteriliyor
//             images.map((image, index) => (
//               <View key={index} style={styles.adBox}>
//                 <Image source={{ uri: image.image }} style={styles.image} />
//               </View>
//             ))}
//       </ScrollView>

//       {/* Çizgiler */}
//       <View style={styles.indicatorContainer}>
//         {images.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.indicator,
//               { backgroundColor: index === activeIndex ? "black" : "#c4c4c4" },
//             ]}
//           />
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     marginTop: 80,
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//   },

//   adBox: {
//     width: width - 140,
//     height: 150,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 20,
//     borderRadius: 10,
//     padding: 10,
//     shadowColor: "red",
//     backgroundColor: "#fff",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 4,
//     overflow: "hidden",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//     resizeMode: "contain",
//   },
//   indicatorContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   indicator: {
//     width: 15,
//     height: 3,
//     borderRadius: 3,
//     marginHorizontal: 3,
//   },
// });

// export default AdCarousel;





kohne axtaris bolmesi


// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { useNavigation } from "@react-navigation/native";

// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Animated,
//   Dimensions,
//   TouchableOpacity,
// } from "react-native";

// const images = {
//   Kişi: "https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//   Qadın:
//     "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//   Uşaq: "https://images.pexels.com/photos/1619801/pexels-photo-1619801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1cd",
// };
// const data = Object.keys(images).map((i) => ({
//   key: i,
//   title: i,
//   image: images[i],
//   ref: React.createRef(),
// }));

// const { width, height } = Dimensions.get("screen");

// const Tab = React.forwardRef(({ item, onİtemPress }, ref) => {
//   const navigation = useNavigation();
//   const navigateToPage = () => {
//     switch (item.title) {
//       case "Kisi":
//         navigation.navigate("Kisi");
//         break;
//       case "Qadın":
//         navigation.navigate("Qadin");
//         break;
//       case "Uşaq":
//         navigation.navigate("Usaq");
//         break;
     
//       default:
//         break;
//     }
//   };

//   return (
//     <TouchableOpacity
//     onPress={() => {
//       onİtemPress(item.key); // İlk olarak item'ı işliyoruz
//       setTimeout(() => {
//         navigateToPage(); // 1 saniye sonra navigateToPage fonksiyonunu çağırıyoruz
//       }, 500);
//     }}
//   >
  

//       <View ref={ref}>
//         <Text
//           style={{
//             color: "white",
//             fontSize: 65 / data.length,
//             fontWeight: 800,
//             textTransform: "uppercase",
//           }}
//         >
//           {item.title}
//         </Text>
        
//       </View>
     
//     </TouchableOpacity>
//   );
// });

// const Tabs = ({ data, scrollX, onİtemPress }) => {
//   const [measures, setMeasures] = React.useState([]);
//   const containerRef = React.useRef();
//   React.useEffect(() => {
//     let m = [];
//     data.forEach((item) => {
//       item.ref.current.measureLayout(
//         containerRef.current,
//         (x, y, width, height) => {
//           m.push({
//             x,
//             y,
//             width,
//             height,
//           });
//           if (m.length === data.length) {
//             setMeasures(m);
//           }
//         }
//       );
//     });
//   }, []);
//   return (
//     <View style={{ position: "absolute", top: 100, width }}>
//       <View
//         ref={containerRef}
//         style={{
//           justifyContent: "space-evenly",
//           alignItems: "center",
//           flexDirection: "row",
//         }}
//       >
//         {data.map((item, index) => {
//           return (
//             <Tab
//               key={item.key}
//               item={item}
//               ref={item.ref}
//               onİtemPress={() => {
//                 onİtemPress(index);
//               }}
//             />
//           );
//         })}
//       </View>
//       {measures.length > 0 && (
//         <Indicator measures={measures} scrollX={scrollX} />
//       )}
//     </View>
//   );
// };

// const Indicator = ({ measures, scrollX }) => {
//   const inputRange = data.map((_, i) => i * width);
//   const indicatorWidth = scrollX.interpolate({
//     inputRange,
//     outputRange: measures.map((measure) => measure.width),
//   });
//   const translateX = scrollX.interpolate({
//     inputRange,
//     outputRange: measures.map((measure) => measure.x),
//   });
//   return (
//     <Animated.View
//       style={{
//         position: "absolute",
//         width: indicatorWidth,
//         height: 4,
//         backgroundColor: "white",
//         bottom: -10,
//         left: 0,
//         transform: [{ translateX }],
//       }}
//     />
//   );
// };

// const SearchScreen = () => {
//   const scrollX = React.useRef(new Animated.Value(0)).current;
//   const ref = React.useRef();
//   const onİtemPress = React.useCallback((itemİndex) => {
//     ref?.current?.scrollToOffset({
//       offset: itemİndex * width,
//     });
//   });
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <StatusBar hidden />
//       <Animated.FlatList
//         ref={ref}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         pagingEnabled
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//           { useNativeDriver: false }
//         )}
//         bounces={false}
//         data={data}
//         keyExtractor={(item) => item.key}
//         renderItem={({ item }) => (
//           <View style={{ width, height }}>
//             <Image
//               source={{ uri: item.image }}
//               style={{ flex: 1, resizeMode: "cover" }}
//             />
//             <View
//               style={[
//                 StyleSheet.absoluteFillObject,
//                 { backgroundColor: "rgba(0,0,0,0.3)" },
//               ]}
//             />
//           </View>
//         )}
//       />

//       <Tabs data={data} scrollX={scrollX} onİtemPress={onİtemPress} />
//     </View>
//   );
// };

// export default SearchScreen;






import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator } from 'react-native';

const ProductDetailScreen = ({ route }) => {
  const { categoryTitle } = route.params; // Get category title passed from SearchScreen
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoryTitle}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDesc}>{item.description}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <Text style={styles.productStock}>Stock: {item.rating.count}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productDesc: {
    fontSize: 14,
    marginTop: 5,
    color: '#777',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productStock: {
    fontSize: 14,
    marginTop: 5,
    color: '#555',
  },
});

export default ProductDetailScreen;
