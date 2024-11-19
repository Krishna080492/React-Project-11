import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDV1fJo0k-oXOfi3DhpLZND78GMnk0mOQE",
  authDomain: "login-firestore-project11.firebaseapp.com",
  projectId: "login-firestore-project11",
  storageBucket: "login-firestore-project11.firebasestorage.app",
  messagingSenderId: "24890913699",
  appId: "1:24890913699:web:f4f275806df0325ffb2016"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);