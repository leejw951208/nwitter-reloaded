// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaQam1z2f9SKA02pXVCcgeBfjlQuneOVU",
  authDomain: "nwitter-reloaded-aebd1.firebaseapp.com",
  projectId: "nwitter-reloaded-aebd1",
  storageBucket: "nwitter-reloaded-aebd1.appspot.com",
  messagingSenderId: "114426012127",
  appId: "1:114426012127:web:be9151292ef1d9eb50246a",
  measurementId: "G-35YMYBW43F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)