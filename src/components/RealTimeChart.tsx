// src/components/RealTimeChart.tsx

'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

interface DataPoint {
  timestamp: string
  temperature: number
}

export default function RealTimeChart() {
  const [data, setData] = useState<DataPoint[]>([])

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('/api/stream')
      const json = await res.json()
      const newPoint: DataPoint = {
        timestamp: new Date(json.timestamp).toLocaleTimeString(),
        temperature: json.temperature,
      }

      setData(prev => [...prev.slice(-9), newPoint]) // max 10 points
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#444" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temperature" stroke="#4f46e5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
