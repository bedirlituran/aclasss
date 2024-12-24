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