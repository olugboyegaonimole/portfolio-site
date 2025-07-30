'use client'

import { useEffect, useState } from 'react'

const generateLog = () => {
  const ports = ['Shanghai', 'Rotterdam', 'Singapore', 'Los Angeles', 'Dubai']
  const statuses = ['Arrived', 'Departed', 'Delayed', 'In Transit', 'Docked']
  return `[${new Date().toLocaleTimeString()}] Vessel from ${ports[Math.floor(Math.random() * ports.length)]} - Status: ${statuses[Math.floor(Math.random() * statuses.length)]}`
}

export default function StreamingLog() {
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) =>
        [...prev.slice(-9), generateLog()]
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-black/60 p-4 h-40 overflow-y-auto rounded-lg font-mono text-sm space-y-1 text-green-400">
      {logs.map((log, idx) => (
        <div key={idx}>{log}</div>
      ))}
    </div>
  )
}
