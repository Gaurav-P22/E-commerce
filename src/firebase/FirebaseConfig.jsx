// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVg9Ec6Bgo7Zo7wm_XS5oakadl3V32Tv0",
  authDomain: "ecom-faf86.firebaseapp.com",
  projectId: "ecom-faf86",
  storageBucket: "ecom-faf86.appspot.com",
  messagingSenderId: "383377197390",
  appId: "1:383377197390:web:abb191fbe79e5eeba7761f",
  measurementId: "G-QV9572PXC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDb = getFirestore(app);
const auth = getAuth(app)
export {fireDb,auth } ;