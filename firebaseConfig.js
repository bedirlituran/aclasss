
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAjEuA-SUFhm8F9eG_Ou5836pgg5P0Xyoo",
    authDomain: "com.bedirliProductDetailScreen.A_class",
    projectId: "aclass-cf911",
    storageBucket: "aclass-cf911.firebasestorage.app",
    messagingSenderId: "896154352246",
    appId: "1:896154352246:android:c50f62281489a5b4a67d57",
  };
  

  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
