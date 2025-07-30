'use client'

import { useEffect, useState } from 'react'

export default function AnomalyAlert() {
  const [alert, setAlert] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const temp = parseFloat((Math.random() * 10 + 15).toFixed(2))
      if (temp > 23) {
        setAlert(`⚠️ Anomaly Detected: Cargo temperature high at ${temp}°C`)
      } else {
        setAlert(null)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-[56px] bg-red-900/40 border border-red-700 p-4 rounded-lg font-mono text-red-300 transition-all duration-300">
      {alert || '✔ System stable – no anomalies.'}
    </div>
  )
}
