'use client'

import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'

const COLORS = ['#10b981', '#ef4444'] // green = normal, red = anomaly

export default function AnomalyPieChart() {
  const [counts, setCounts] = useState([
    { name: 'Normal', value: 0 },
    { name: 'Anomaly', value: 0 },
  ])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'streamData'), snapshot => {
      let anomaly = 0
      let normal = 0

      snapshot.docs.forEach(doc => {
        const data = doc.data()
        if (data.temp > 23) anomaly++
        else normal++
      })

      setCounts([
        { name: 'Normal', value: normal },
        { name: 'Anomaly', value: anomaly },
      ])
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="w-full h-64 mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">🧪 Anomaly Distribution</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={counts}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {counts.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
