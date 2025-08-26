// src/lib/firebaseEnergy.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔑 Use your "olu-energy-forecast" Firebase project config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_ENERGY_API_KEY,
  authDomain: "olu-energy-forecast.firebaseapp.com",
  projectId: "olu-energy-forecast",
  storageBucket: "olu-energy-forecast.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_ENERGY_MSG_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_ENERGY_APP_ID,
};

const app =
  getApps().find((a) => a.name === "energy") ??
  initializeApp(firebaseConfig, "energy");

export const energyDb = getFirestore(app);
