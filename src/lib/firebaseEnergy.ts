import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_ENERGY_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_ENERGY_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_ENERGY_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_ENERGY_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_ENERGY_MSG_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_ENERGY_APP_ID!,
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const energyDb = getFirestore(app)
