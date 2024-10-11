// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtOg2ZLx9v-CPK5Sb45Ns81V2TVIQ0iXI",
  authDomain: "week7-yanzhi.firebaseapp.com",
  projectId: "week7-yanzhi",
  storageBucket: "week7-yanzhi.appspot.com",
  messagingSenderId: "35334445412",
  appId: "1:35334445412:web:9643598f16c72c7a028271"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db