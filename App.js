import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./Navigation/Navigation";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import Store from "./store/index";




const App = () => {

  return (
    <Provider store={Store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            barStyle="dark-content"
            translucent={false}
            backgroundColor="#ffffff"
          />
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

export default App;
