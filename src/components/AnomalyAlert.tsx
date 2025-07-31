'use client'

import { useEffect, useState } from 'react'
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface StreamData {
  timestamp: string
  location: string
  status: string
  temperature: number
}

export default function AnomalyAlert() {
  const [anomaly, setAnomaly] = useState<StreamData | null>(null)

  useEffect(() => {
    const q = query(
      collection(db, 'streamData'),
      orderBy('timestamp', 'desc'),
      limit(1)
    )

    const unsubscribe = onSnapshot(q, snapshot => {
      const doc = snapshot.docs[0]
      if (!doc) return

      const data = doc.data() as StreamData
      if (data.temperature > 30 || data.status.toLowerCase().includes('delay')) {
        setAnomaly(data)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-2">🚨 Anomaly Detection</h2>
      <p className="text-gray-400 mb-4">
        Monitoring data for temperature spikes or delays...
      </p>
      {anomaly ? (
        <div className="bg-red-900/50 border border-red-700 p-4 rounded-lg text-red-300 font-mono">
          ⚠️ Anomaly Detected! {anomaly.location} reported {anomaly.temperature}°C / {anomaly.status} at {new Date(anomaly.timestamp).toLocaleTimeString()}
        </div>
      ) : (
        <div className="text-gray-500 italic">No anomalies detected yet.</div>
      )}
    </div>
  )
}
