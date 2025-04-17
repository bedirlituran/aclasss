import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./Navigation/Navigation";
import { StatusBar, StyleSheet ,Platform} from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import Store from "./store/index";
import Toast from 'react-native-toast-message';

export default function App(){
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

          {/* Toast burada əlavə olunur */}
          <Toast position="top" topOffset={Platform.OS === 'android' ? 40 : 60} />

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


