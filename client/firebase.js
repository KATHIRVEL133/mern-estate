// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-2a802.firebaseapp.com",
  projectId: "mern-estate-2a802",
  storageBucket: "mern-estate-2a802.appspot.com",
  messagingSenderId: "522733835589",
  appId: "1:522733835589:web:2adbf06f4ba030d7e75a2c"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);