'use client'

import { useEffect, useState } from 'react'

const generateAlert = () => {
  const routes = ['Route 12', 'Route 27', 'Route 91']
  const delays = [(2.3).toFixed(1), (4.2).toFixed(1), (6.5).toFixed(1)]
  const index = Math.floor(Math.random() * routes.length)
  return `ALERT: ${routes[index]} anomaly — ETA deviation detected (↑ ${delays[index]} hrs)`
}

export default function AnomalyAlert() {
  const [alert, setAlert] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setAlert(generateAlert())
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-red-900/50 border border-red-700 p-4 rounded-lg text-red-300 font-mono transition-all duration-500 ease-in-out">
      {alert ?? 'System nominal — no anomalies detected.'}
    </div>
  )
}
