@echo off
"C:\\Program Files\\Android\\Android Studio\\jbr\\bin\\java" ^
  --class-path ^
  "C:\\Users\\tbedi\\.gradle\\caches\\modules-2\\files-2.1\\com.google.prefab\\cli\\2.1.0\\aa32fec809c44fa531f01dcfb739b5b3304d3050\\cli-2.1.0-all.jar" ^
  com.google.prefab.cli.AppKt ^
  --build-system ^
  cmake ^
  --platform ^
  android ^
  --abi ^
  x86 ^
  --os-version ^
  24 ^
  --stl ^
  c++_shared ^
  --ndk-version ^
  26 ^
  --output ^
  "C:\\Users\\tbedi\\AppData\\Local\\Temp\\agp-prefab-staging14255934571977925914\\staged-cli-output" ^
  "C:\\Users\\tbedi\\.gradle\\caches\\8.10.2\\transforms\\e7d2cf3ea0f710e01bb7af2449bcb768\\transformed\\react-android-0.76.7-debug\\prefab" ^
  "C:\\react-native-projects\\aclass\\a\\android\\app\\build\\intermediates\\cxx\\refs\\react-native-reanimated\\1v52z5b5" ^
  "C:\\Users\\tbedi\\.gradle\\caches\\8.10.2\\transforms\\02dfef44a325c4b780258a54d06046ed\\transformed\\hermes-android-0.76.7-debug\\prefab" ^
  "C:\\Users\\tbedi\\.gradle\\caches\\8.10.2\\transforms\\31075bc6c43c101fe629cf4925cab858\\transformed\\fbjni-0.6.0\\prefab"
