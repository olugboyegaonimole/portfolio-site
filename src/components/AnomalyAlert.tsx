// src/components/AnomalyAlert.tsx

'use client'

import { useEffect, useState } from 'react'

export default function AnomalyAlert() {
  const [anomaly, setAnomaly] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const trigger = Math.random()
      if (trigger > 0.95) {
        setAnomaly(`⚠️ Anomaly detected in Zone ${Math.ceil(Math.random() * 5)} at ${new Date().toLocaleTimeString()}`)
        setTimeout(() => setAnomaly(null), 5000)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-4">
      {anomaly && (
        <div className="bg-red-700 text-white p-4 rounded shadow-lg animate-pulse">
          {anomaly}
        </div>
      )}
    </div>
  )
}
