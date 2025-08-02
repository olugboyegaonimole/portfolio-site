'use client'

import { useEffect, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Scatter
} from 'recharts'
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface DataPoint {
  timestamp: string
  temperature: number
  isAnomaly: boolean
}

export default function RealTimeChart() {
  const [data, setData] = useState<DataPoint[]>([])

  useEffect(() => {
    const q = query(
      collection(db, 'streamData'),
      orderBy('timestamp', 'desc'),
      limit(10)
    )

    const unsubscribe = onSnapshot(q, snapshot => {
      const points: DataPoint[] = snapshot.docs.map(doc => {
        const d = doc.data()
        return {
          timestamp: new Date(d.timestamp).toLocaleTimeString(),
          temperature: d.temp,
          isAnomaly: d.temp > 23,
        }
      }).reverse()

      setData(points)
    })

    return () => unsubscribe()
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
          {/* Red dots for anomalies */}
          <Scatter
            data={data.filter(d => d.isAnomaly)}
            dataKey="temperature"
            fill="red"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
