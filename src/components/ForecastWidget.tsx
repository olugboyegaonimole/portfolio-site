"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query, limit } from "firebase/firestore"
import { energyDb } from "@/lib/firebaseEnergy" // ✅ use energy project

type ConsumptionEntry = {
  demand_kwh: number
  ts: string
  region: string
  energy_type: string
}

export default function ForecastWidget() {
  const [forecast, setForecast] = useState({
    trend: "Loading...",
    risk: "Loading...",
    recommendation: "Loading...",
    date: "",
    region: "",
    energyType: ""
  })

  useEffect(() => {
    const q = query(collection(energyDb, "raw_consumption"), orderBy("ts", "desc"), limit(5))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => doc.data() as ConsumptionEntry)

      if (docs.length > 1) {
        const latest = docs[0]
        const prev = docs[1]

        const trend = latest.demand_kwh > prev.demand_kwh ? "increasing 📈" : "decreasing 📉"
        const diff = latest.demand_kwh - prev.demand_kwh

        setForecast({
          trend: `Demand is ${trend}`,
          risk: diff > 100 ? "⚠️ Risk of sudden spike in demand" : "✅ Stable demand",
          recommendation: diff > 100 ? "Consider load balancing or reserve capacity" : "Maintain current allocation",
          date: new Date(latest.ts).toLocaleString(), // current date from Firestore timestamp
          region: latest.region,
          energyType: latest.energy_type
        })
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">🔮 Forecast Insights</h2>
      <div className="bg-indigo-900 rounded-lg p-6 space-y-3 shadow-lg">
        <div><strong className="text-indigo-300">Date:</strong> {forecast.date}</div>
        <div><strong className="text-indigo-300">Region:</strong> {forecast.region}</div>
        <div><strong className="text-indigo-300">Energy Type:</strong> {forecast.energyType}</div>
        <div><strong className="text-indigo-300">Trend:</strong> {forecast.trend}</div>
        <div><strong className="text-indigo-300">Risk:</strong> {forecast.risk}</div>
        <div><strong className="text-indigo-300">Recommendation:</strong> {forecast.recommendation}</div>
      </div>
    </div>
  )
}
