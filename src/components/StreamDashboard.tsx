"use client";


// src/components/StreamDashboard.tsx

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase'; // <-- adjust path based on your Firebase setup

type StreamEntry = {
  location: string;
  temp: number;
  status: string;
  timestamp: string;
  isAnomaly?: boolean; // Add this line

};

export default function StreamDashboard() {
  const [entries, setEntries] = useState<StreamEntry[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'streamData'),
      orderBy('timestamp', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const data = doc.data() as StreamEntry;
        const isAnomaly = data.temp > 23; // 👈 Rule-based anomaly
        return { ...data, isAnomaly };
      });
setEntries(docs);

    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🚚 Real-Time Supply Chain Dashboard</h2>
      <ul className="space-y-2">
        {entries.map((entry, idx) => (
          <li
            key={idx}
            className={`p-4 border rounded shadow ${
              entry.isAnomaly ? 'bg-red-200 border-red-500' : 'bg-green-100'
            }`}
          >
            <div>📍 <strong>{entry.location}</strong></div>
            <div>🌡 Temp: {entry.temp}°C</div>
            <div>⏱ Status: {entry.status}</div>
            <div>🕒 {new Date(entry.timestamp).toLocaleString()}</div>

            {entry.isAnomaly && (
              <div className="text-red-700 font-semibold mt-2">⚠️ Temp exceeds threshold!</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
