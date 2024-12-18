// src/firebaseConfig.js

// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "reggieanddro1234.firebaseapp.com",
  projectId: "reggieanddro1234",
  storageBucket: "reggieanddro1234.firebasestorage.app",
  messagingSenderId: "97956027942",
  appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

// Initialize Firestore and export it
export const db = getFirestore(app);
