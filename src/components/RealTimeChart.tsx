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

const generateDataPoint = () => ({
  time: new Date().toLocaleTimeString(),
  temperature: parseFloat((Math.random() * 10 + 15).toFixed(2)) // 15°C to 25°C
})

export default function RealTimeChart() {
  const [data, setData] = useState([generateDataPoint()])

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => [...prev.slice(-19), generateDataPoint()])
    }, 2000)
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
