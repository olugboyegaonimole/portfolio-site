// src/lib/firebaseEnergy.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔑 Use your "olu-energy-forecast" Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCIvMmHv6PTppOlbMZozLirr_Ac3jMVJ4Y",
  authDomain: "olu-energy-forecast.firebaseapp.com",
  projectId: "olu-energy-forecast",
  storageBucket: "olu-energy-forecast.appspot.com",
  messagingSenderId: "991909873297",
  appId: "1:991909873297:web:bfe722641ff8d1504b2130",
};

const app =
  getApps().find((a) => a.name === "energy") ??
  initializeApp(firebaseConfig, "energy");

export const energyDb = getFirestore(app);
