'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useEffect, useState } from 'react'

const generateDataPoint = () => ({
  time: new Date().toLocaleTimeString(),
  value: Math.floor(Math.random() * 100) + 20,
})

export default function RealTimeChart() {
  const [data, setData] = useState([generateDataPoint()])

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        [...prev.slice(-19), generateDataPoint()]
      )
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
