'use client'

import { useEffect, useRef, useState } from 'react'

const ports = ['Shanghai', 'Hamburg', 'Dubai', 'Rotterdam', 'Lagos']
const statuses = ['Departed', 'Arrived', 'In Transit', 'Delayed']

const generateLog = () => {
  const port = ports[Math.floor(Math.random() * ports.length)]
  const status = statuses[Math.floor(Math.random() * statuses.length)]
  return `[${new Date().toLocaleTimeString()}] Vessel from ${port} — ${status}`
}

export default function StreamingLog() {
  const [logs, setLogs] = useState<string[]>([])
  const logRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => [...prev.slice(-9), generateLog()])
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' })
  }, [logs])

  return (
    <div
      ref={logRef}
      className="bg-black/60 p-4 h-40 overflow-y-auto rounded-lg font-mono text-sm space-y-1 text-green-400"
    >
      {logs.map((log, idx) => (
        <div key={idx}>{log}</div>
      ))}
    </div>
  )
}
