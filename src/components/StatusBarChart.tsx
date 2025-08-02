'use client'

import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts'

export default function StatusBarChart() {
  const [statusCounts, setStatusCounts] = useState([
    { status: 'On Time', count: 0 },
    { status: 'Delayed', count: 0 },
  ])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'streamData'), snapshot => {
      const statusMap: Record<string, number> = { 'On Time': 0, 'Delayed': 0 }

      snapshot.docs.forEach(doc => {
        const data = doc.data()
        if (data.status in statusMap) {
          statusMap[data.status] += 1
        }
      })

      setStatusCounts([
        { status: 'On Time', count: statusMap['On Time'] },
        { status: 'Delayed', count: statusMap['Delayed'] },
      ])
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="w-full h-64 mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">📊 Shipment Status Breakdown</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={statusCounts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
