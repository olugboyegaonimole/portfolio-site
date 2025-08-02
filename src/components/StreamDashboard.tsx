'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

type StreamEntry = {
  location: string;
  temp: number;
  status: string;
  timestamp: string;
  isAnomaly?: boolean;
};

export default function StreamDashboard() {
  const [entries, setEntries] = useState<StreamEntry[]>([]);
  const [locationFilter, setLocationFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [timeRange, setTimeRange] = useState<'all' | '10min' | '1hr'>('all');

  useEffect(() => {
    const q = query(
      collection(db, 'streamData'),
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const data = doc.data() as StreamEntry;
        const isAnomaly = data.temp > 23;
        return { ...data, isAnomaly };
      });

      setEntries(docs);
    });

    return () => unsubscribe();
  }, []);

  const filteredEntries = entries.filter((entry) => {
    const entryTime = new Date(entry.timestamp).getTime();
    const now = Date.now();

    const matchesLocation = locationFilter === 'All' || entry.location === locationFilter;
    const matchesStatus = statusFilter === 'All' || entry.status === statusFilter;
    const matchesTime =
      timeRange === 'all' ||
      (timeRange === '10min' && entryTime >= now - 10 * 60 * 1000) ||
      (timeRange === '1hr' && entryTime >= now - 60 * 60 * 1000);

    return matchesLocation && matchesStatus && matchesTime;
  });

  const uniqueLocations = Array.from(new Set(entries.map((e) => e.location)));
  const uniqueStatuses = Array.from(new Set(entries.map((e) => e.status)));

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🚚 Real-Time Supply Chain Dashboard</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Location Filter */}
        <div>
          <label className="mr-2 font-medium">Location:</label>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="p-2 border rounded bg-gray-800 text-white"
          >
            <option value="All">All</option>
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="mr-2 font-medium">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded bg-gray-800 text-white"
          >
            <option value="All">All</option>
            {uniqueStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Time Range Filter */}
        <div>
          <label className="mr-2 font-medium">Time Range:</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as 'all' | '10min' | '1hr')}
            className="p-2 border rounded bg-gray-800 text-white"
          >
            <option value="all">All</option>
            <option value="10min">Last 10 min</option>
            <option value="1hr">Last 1 hour</option>
          </select>
        </div>
      </div>

      {/* Dashboard Entries */}
      <ul className="space-y-2">
        {filteredEntries.map((entry, idx) => (
          <li
            key={idx}
            className={`p-4 border rounded shadow ${
              entry.isAnomaly ? 'bg-red-800 text-white border-red-400' : 'bg-green-800 text-white border-green-400'
            }`}
          >
            <div>📍 <strong>{entry.location}</strong></div>
            <div>🌡 Temp: {entry.temp}°C</div>
            <div>⏱ Status: {entry.status}</div>
            <div>🕒 {new Date(entry.timestamp).toLocaleString()}</div>

            {entry.isAnomaly && (
              <div className="text-yellow-300 font-semibold mt-2">⚠️ Temp exceeds threshold!</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
