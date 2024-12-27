import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./Navigation/Navigation";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import Store from "./store/index";
import "./global.css";
import Bottomlink from "./components/Bottomlink";
import * as Linking from 'expo-linking'

const prefix  = Linking.createURL('/')

const App = () => {
  const linking = {
    prefixes: [prefix],
    config:{
      screens: {
        Sekil: {
          path:'Sekil'
        },
      }
    }
  }
  return (
    <Provider store={Store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            barStyle="dark-content" // Durum çubuğu içerik rengini koyu yapar (saat için)
            translucent={false} // Şeffaflığı kapatır
            backgroundColor="#ffffff" // Arka plan rengini beyaz yapar
          />
          <NavigationContainer  linking={linking}>
            <Navigation />
            <Bottomlink />
          </NavigationContainer>
          
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff", // Arka plan rengini SafeAreaView ile eşitleyin
  },
});

export default App;
