 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBPJ8wIFXhVIPW4Ogyev_qJBF8GuUwbboA",
    authDomain: "edit-profile-d8212.firebaseapp.com",
    projectId: "edit-profile-d8212",
    storageBucket: "edit-profile-d8212.appspot.com",
    messagingSenderId: "645881393714",
    appId: "1:645881393714:web:48c4ad2192b6a12570822b",
    measurementId: "G-D5G3SYRSNB"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;