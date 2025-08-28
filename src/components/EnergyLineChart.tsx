"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query, limit } from "firebase/firestore"
import { energyDb } from "@/lib/firebaseEnergy"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type EnergyData = {
  ts: string
  demand_kwh: number
  predicted_kwh?: number
}

export default function EnergyLineChart() {
  const [data, setData] = useState<EnergyData[]>([])

  useEffect(() => {
    const q = query(collection(energyDb, "raw_consumption"), orderBy("ts", "desc"), limit(20))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const d = doc.data()
        return {
          ts: d.ts,
          demand_kwh: d.demand_kwh,
          predicted_kwh: d.predicted_kwh ?? undefined,
        } as EnergyData
      })

      // reverse so earliest is left-most
      setData(docs.reverse())
    })

    return () => unsubscribe()
  }, [])

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="ts" stroke="#aaa" />
        <YAxis stroke="#aaa" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="demand_kwh" stroke="#82ca9d" name="Actual Demand" />
        <Line type="monotone" dataKey="predicted_kwh" stroke="#8884d8" name="Predicted Demand" />
      </LineChart>
    </ResponsiveContainer>
  )
}
