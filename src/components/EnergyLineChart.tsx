"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query, limit } from "firebase/firestore"
import { db } from "../lib/firebase"
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

type ConsumptionEntry = {
  ts: any
  demand_kwh: number
}

export default function EnergyLineChart() {
  const [data, setData] = useState<{ time: string; demand: number }[]>([])

  useEffect(() => {
    const q = query(
      collection(db, "raw_consumption"),
      orderBy("ts", "desc"),
      limit(20)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const d = doc.data() as ConsumptionEntry
        return {
          time: new Date(d.ts.seconds * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          demand: d.demand_kwh,
        }
      })
      setData(docs.reverse()) // oldest → newest
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "0.5rem" }} />
          <Legend />
          <Line type="monotone" dataKey="demand" stroke="#34d399" strokeWidth={3} dot={false} name="Demand (kWh)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
