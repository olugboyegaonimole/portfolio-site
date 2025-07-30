// src/app/projects/supply-chain-monitor/components/AnomalyAlert.tsx

'use client'

import { useEffect, useState } from 'react'

interface StreamData {
  timestamp: string
  location: string
  status: string
  temperature: number
}

export default function AnomalyAlert() {
  const [anomaly, setAnomaly] = useState<StreamData | null>(null)

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('/api/stream')
      const data: StreamData = await res.json()

      if (data.temperature > 30 || data.status.toLowerCase().includes('delay')) {
        setAnomaly(data)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-2">🚨 Anomaly Detection</h2>
      <p className="text-gray-400 mb-4">
        Monitoring data for temperature spikes or delays...
      </p>
      {anomaly ? (
        <div className="bg-red-900/50 border border-red-700 p-4 rounded-lg text-red-300 font-mono">
          ⚠️ Anomaly Detected! {anomaly.location} reported {anomaly.temperature}°C / {anomaly.status} at {anomaly.timestamp}
        </div>
      ) : (
        <div className="text-gray-500 italic">No anomalies detected yet.</div>
      )}
    </div>
  )
}
