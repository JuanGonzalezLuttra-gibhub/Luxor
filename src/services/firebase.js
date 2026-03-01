// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC8-RGskJd3gC4ptFi1EYJz6X3-imuD_QQ",
    authDomain: "luxor-66125.firebaseapp.com",
    projectId: "luxor-66125",
    storageBucket: "luxor-66125.firebasestorage.app",
    messagingSenderId: "705079183805",
    appId: "1:705079183805:web:2359a34cda7545aec22ad4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);