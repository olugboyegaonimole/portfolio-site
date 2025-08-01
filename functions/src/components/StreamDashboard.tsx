"use client";


// src/components/StreamDashboard.tsx

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase'; // <-- adjust path based on your Firebase setup

type StreamEntry = {
  location: string;
  temp: number;
  status: string;
  timestamp: string;
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
      const docs = snapshot.docs.map((doc) => doc.data() as StreamEntry);
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
              entry.status === 'Delayed' ? 'bg-red-100' : 'bg-green-100'
            }`}
          >
            <div>📍 <strong>{entry.location}</strong></div>
            <div>🌡 Temp: {entry.temp}°C</div>
            <div>⏱ Status: {entry.status}</div>
            <div>🕒 {new Date(entry.timestamp).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
