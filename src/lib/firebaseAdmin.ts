// src/lib/firebaseAdmin.ts
import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Import the JSON file
import serviceAccount from "../../firebase-energy-forecast-service-account.json";

// Initialize only once
let app: App;
if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceAccount as any), // 👈 force cast here
  });
} else {
  app = getApps()[0];
}

export const adminDb = getFirestore(app);
