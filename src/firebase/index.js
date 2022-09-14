
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAoL-B71k6nPiK4qgEd2d3fqyUtagKE-iE",
  authDomain: "vue-firebase-ae507.firebaseapp.com",
  projectId: "vue-firebase-ae507",
  storageBucket: "vue-firebase-ae507.appspot.com",
  messagingSenderId: "232800242822",
  appId: "1:232800242822:web:b1414331f2a9b3180f5507"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

 
 export{
  db,
 }
