"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { energyDb } from "@/lib/firebaseEnergy"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

type Entry = {
  energy_type: string
  demand_kwh: number
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"]

export default function EnergyBreakdownChart() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(energyDb, "raw_consumption"), (snapshot) => {
      const docs = snapshot.docs.map((doc) => doc.data() as Entry)

      // Aggregate demand by energy_type
      const grouped: { [key: string]: number } = {}
      docs.forEach((d) => {
        grouped[d.energy_type] = (grouped[d.energy_type] || 0) + d.demand_kwh
      })

      const chartData = Object.entries(grouped).map(([type, total]) => ({
        name: type,
        value: total
      }))

      setData(chartData)
    })

    return () => unsubscribe()
  }, [])

  return (
    <ResponsiveContainer width="100%" height={350}>
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
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
