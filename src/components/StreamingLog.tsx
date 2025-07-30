// src/components/StreamingLog.tsx

'use client'

import { useEffect, useState } from 'react'

export default function StreamingLog() {
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = `Ship ${Math.floor(Math.random() * 9000)} - Position Updated at ${new Date().toLocaleTimeString()}`
      setLogs(prev => [newLog, ...prev.slice(0, 9)])
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-black border border-gray-700 rounded p-4 text-green-400 font-mono h-60 overflow-y-auto">
      {logs.map((log, i) => (
        <div key={i}>{log}</div>
      ))}
    </div>
  )
}
