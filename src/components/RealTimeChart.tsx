'use client'

import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export default function RealTimeChart() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/stream')
      const json = await res.json()
      setData((prev) => [...prev.slice(-19), {
        time: new Date(json.timestamp).toLocaleTimeString(),
        temperature: json.temperature
      }])
    }

    const interval = setInterval(fetchData, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" domain={[10, 30]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#60a5fa"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
