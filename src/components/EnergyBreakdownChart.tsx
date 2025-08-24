"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query, limit } from "firebase/firestore"
import { db } from "../lib/firebase"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

type ConsumptionEntry = {
  region: string
  demand_kwh: number
}

const COLORS = ["#fbbf24", "#60a5fa", "#ef4444", "#34d399", "#a78bfa"]

export default function EnergyBreakdownChart() {
  const [data, setData] = useState<{ name: string; value: number }[]>([])

  useEffect(() => {
    const q = query(collection(db, "raw_consumption"), orderBy("ts", "desc"), limit(50))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const regionTotals: Record<string, number> = {}

      snapshot.docs.forEach((doc) => {
        const d = doc.data() as ConsumptionEntry
        regionTotals[d.region] = (regionTotals[d.region] || 0) + d.demand_kwh
      })

      setData(Object.entries(regionTotals).map(([region, total]) => ({
        name: region,
        value: total,
      })))
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "0.5rem" }} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
