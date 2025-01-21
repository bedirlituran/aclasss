import React,{useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./Navigation/Navigation";
import { StatusBar, StyleSheet ,Button,Platform} from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import Store from "./store/index";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function App(){
  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    return () => subscription.remove();
  }, []);
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
          {/* <Button
      title="Press to Send Notification"
      onPress={async () => {
        await sendPushNotification();
      }}
    /> */}
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


// Kayıt işlemi için token alma
async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);

  return token;
}

// Bildirim gönderme fonksiyonu
async function sendPushNotification() {
  const message = {
    to: '<EXPO_PUSH_TOKEN>',
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

await fetch('https://exp.host/--/api/v2/push/send', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(message),
})
.then(response => response.json())
.then(data => console.log('Push notification response:', data))
.catch(error => console.error('Error sending push notification:', error));
}