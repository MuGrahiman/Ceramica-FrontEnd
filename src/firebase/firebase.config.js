// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB2mRonwD2u2Y7HTjPr6QZi10N4Gxl0AU",
  authDomain: "book-store-7c43a.firebaseapp.com",
  projectId: "book-store-7c43a",
  storageBucket: "book-store-7c43a.firebasestorage.app",
  messagingSenderId: "502476655927",
  appId: "1:502476655927:web:0b92bb5986a4114eb95eb2",
  measurementId: "G-VKL4MLJ2HS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);
