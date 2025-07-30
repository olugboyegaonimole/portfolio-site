// src/app/projects/supply-chain-monitor/components/StreamingLog.tsx

'use client'

import { useEffect, useState } from 'react'

interface StreamData {
  timestamp: string
  location: string
  status: string
  temperature: number
}

export default function StreamingLog() {
  const [logs, setLogs] = useState<StreamData[]>([])

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('/api/stream')
      const data: StreamData = await res.json()
      setLogs(prev => [data, ...prev.slice(0, 9)]) // Keep last 10 logs
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-900 p-4 rounded-lg text-sm max-h-80 overflow-y-auto">
      {logs.map((log, idx) => (
        <div key={idx} className="border-b border-gray-800 py-1 text-gray-300">
          <code>{log.timestamp}</code> –{' '}
          <span className="text-indigo-300">{log.location}</span> –{' '}
          <span>{log.status}</span> –{' '}
          <span className="text-yellow-300">{log.temperature}°C</span>
        </div>
      ))}
      {logs.length === 0 && <p className="text-gray-500 italic">Waiting for data...</p>}
    </div>
  )
}
