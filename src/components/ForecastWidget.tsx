"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query, limit, where } from "firebase/firestore"
import { energyDb } from "@/lib/firebaseEnergy" // ✅ energy project

type ConsumptionEntry = {
  demand_kwh: number
  ts: string
  region: string
  energy_type: string
}

export default function ForecastWidget() {
  const [forecast, setForecast] = useState({
    date: "Loading...",
    region: "Loading...",
    energyType: "Loading...",
    trend: "Loading...",
    risk: "Loading...",
    recommendation: "Loading..."
  })

  const [region, setRegion] = useState("region-a")
  const [energyType, setEnergyType] = useState("solar")

  useEffect(() => {
    const q = query(
      collection(energyDb, "raw_consumption"),
      where("region", "==", region),
      where("energy_type", "==", energyType),
      orderBy("ts", "desc"),
      limit(5)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => doc.data() as ConsumptionEntry)

      if (docs.length > 1) {
        const latest = docs[0]
        const prev = docs[1]

        const trend = latest.demand_kwh > prev.demand_kwh ? "increasing 📈" : "decreasing 📉"
        const diff = latest.demand_kwh - prev.demand_kwh

        setForecast({
          date: new Date(latest.ts).toLocaleString(),
          region: latest.region,
          energyType: latest.energy_type,
          trend: `Demand is ${trend}`,
          risk: diff > 100 ? "⚠️ Risk of sudden spike in demand" : "✅ Stable demand",
          recommendation: diff > 100
            ? "Consider load balancing or reserve capacity"
            : "Maintain current allocation"
        })
      } else {
        setForecast({
          date: "No data",
          region,
          energyType,
          trend: "No trend available",
          risk: "No data",
          recommendation: "No recommendation"
        })
      }
    })

    return () => unsubscribe()
  }, [region, energyType])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">🔮 Forecast Insights</h2>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          className="bg-gray-800 text-white px-3 py-2 rounded-md"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="region-a">Region A</option>
          <option value="region-b">Region B</option>
          <option value="region-c">Region C</option>
        </select>

        <select
          className="bg-gray-800 text-white px-3 py-2 rounded-md"
          value={energyType}
          onChange={(e) => setEnergyType(e.target.value)}
        >
          <option value="solar">Solar</option>
          <option value="wind">Wind</option>
          <option value="coal">Coal</option>
        </select>
      </div>

      {/* Results */}
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
