{
  "expo": {
    "name": "A_class", // Uygulamanın adı
    "scheme": "aclass", // Uygulamanın benzersiz URL şeması
    "slug": "A_class", // Uygulamanın slug'ı, yani bağlantılarda kullanılacak kimlik
    "newArchEnabled": true, // Yeni mimari desteğini etkinleştirir (Expo'nun yeni özelliklerini kullanma)
    "version": "1.0.0", // Uygulamanın sürümü
    "orientation": "portrait", // Uygulamanın dikey ekran yönünde çalışmasını sağlar
    "icon": "./assets/3.webp", // Uygulama ikonu
    "userInterfaceStyle": "light", // Kullanıcı arayüzü tarzı, burada açık tema kullanılıyor
    "splash": {
      "image": "./assets/logo2048.png", // Splash ekranında kullanılacak resmin yolu
      "resizeMode": "cover", // Resim nasıl yerleşeceği (cover: ekranı tamamen kaplar)
      "backgroundColor": "linear-gradient(#e0f7fa, #ffffff)" // Splash ekranının arka plan rengi
    },
    "assetBundlePatterns": [
      "**/*" // Derlemeye dahil edilecek tüm dosyalar
    ],
    "ios": {
      "supportsTablet": true, // Tablet desteği
      "bundleIdentifier": "com.bedirliProductDetailScreen.Aclass" // iOS için uygulamanın benzersiz bundle identifier'ı
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/3.webp", // Android uygulaması için ön plan ikonu
        "backgroundColor": "#ffffff" // İkonun arka plan rengi
      },
      "package": "com.bedirliProductDetailScreen.A_class" // Android için uygulamanın paket adı
    },
    "web": {
      "favicon": "./assets/3.webp", // Web platformunda kullanılacak favicon
      "bundler": "metro" // Web uygulaması için kullanılan bundler (Metro bundler'ı kullanır)
    },
    "extra": {
      "eas": {
        "projectId": "6296b4a9-0cc4-4ab0-ad4c-47c73dd76092" // EAS (Expo Application Services) ile bağlantı kurmak için proje kimliği
      }
    }
  }
}
