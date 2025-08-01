// src/firebase.ts

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAgQeLZaKOtaw8Ci_CI1VViD3foqau36Xc",
  authDomain: "oluportfolio-stream.firebaseapp.com",
  projectId: "oluportfolio-stream",
  storageBucket: "oluportfolio-stream.firebasestorage.app",
  messagingSenderId: "495597999861",
  appId: "1:495597999861:web:9fdf0c1d3db71fe65d57bc",
  measurementId: "G-WBBDT0WBD9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
