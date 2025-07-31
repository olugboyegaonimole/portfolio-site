// Import the functions you need from the SDKs you need

// the two lines below are from chatgpt
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgQeLZaKOtaw8Ci_CI1VViD3foqau36Xc",
  authDomain: "oluportfolio-stream.firebaseapp.com",
  projectId: "oluportfolio-stream",
  storageBucket: "oluportfolio-stream.firebasestorage.app",
  messagingSenderId: "495597999861",
  appId: "1:495597999861:web:9fdf0c1d3db71fe65d57bc",
  measurementId: "G-WBBDT0WBD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// the three lines below are from chatgpt
// const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }