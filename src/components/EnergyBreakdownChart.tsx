"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { energyDb } from "@/lib/firebaseEnergy"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

type BreakdownData = {
  name: string
  value: number
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]

export default function EnergyBreakdownChart() {
  const [data, setData] = useState<BreakdownData[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(energyDb, "raw_consumption"), (snapshot) => {
      const counts: Record<string, number> = {}

      snapshot.docs.forEach((doc) => {
        const d = doc.data()
        if (d.energy_type && d.demand_kwh) {
          counts[d.energy_type] = (counts[d.energy_type] || 0) + d.demand_kwh
        }
      })

      const formatted: BreakdownData[] = Object.keys(counts).map((key) => ({
        name: key,
        value: counts[key],
      }))

      setData(formatted)
    })

    return () => unsubscribe()
  }, [])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}
