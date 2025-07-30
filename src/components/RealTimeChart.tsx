// src/components/RealTimeChart.tsx

'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function RealTimeChart() {
  const [data, setData] = useState<{ time: string; value: number }[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => [
        ...prev.slice(-19),
        { time: new Date().toLocaleTimeString(), value: Math.floor(Math.random() * 100) },
      ])
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
