// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
// Se recomienda usar variables de entorno para Vercel
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSy...",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "luxor-auto.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "luxor-auto",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "luxor-auto.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:000000000000:web:000000000000"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
