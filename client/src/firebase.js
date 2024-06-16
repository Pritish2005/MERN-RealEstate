// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-5287d.firebaseapp.com",
  projectId: "real-estate-5287d",
  storageBucket: "real-estate-5287d.appspot.com",
  messagingSenderId: "671480606579",
  appId: "1:671480606579:web:6a0fc4619eada525f89f06"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);