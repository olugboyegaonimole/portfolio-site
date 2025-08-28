"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query, limit } from "firebase/firestore"
import { energyDb } from "@/lib/firebaseEnergy"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type Entry = {
  demand_kwh: number
  ts: string
}

export default function EnergyLineChart() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const q = query(collection(energyDb, "raw_consumption"), orderBy("ts", "desc"), limit(20))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => doc.data() as Entry)

      // Reverse for chronological order
      const chronological = docs.reverse()

      // Add predicted series (simple +10% for now)
      const withPrediction = chronological.map((d) => ({
        ...d,
        predicted: Math.round(d.demand_kwh * 1.1)
      }))

      setData(withPrediction)
    })

    return () => unsubscribe()
  }, [])

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ts" hide /> {/* Hide timestamps for clarity */}
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="demand_kwh" stroke="#82ca9d" name="Actual Demand" />
        <Line type="monotone" dataKey="predicted" stroke="#8884d8" name="Predicted Demand" strokeDasharray="5 5" />
      </LineChart>
    </ResponsiveContainer>
  )
}
