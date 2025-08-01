import { onSchedule } from "firebase-functions/v2/scheduler";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";

initializeApp();
const db = getFirestore();

export const simulateStream = onSchedule("every 3 minutes", async () => {
  const locations = ["Lagos", "Nairobi", "Dubai", "London", "Mumbai"];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const temperature = +(20 + Math.random() * 15).toFixed(2);
  const delayed = Math.random() < 0.3;

  const doc = {
    location,
    temp: temperature,
    status: delayed ? "Delayed" : "On time",
    timestamp: new Date().toISOString(),
  };

  await db.collection("streamData").add(doc);
  logger.info(`✅ Simulated: ${location}, ${temperature}°C, ${doc.status}`);
});
