"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, limit } from "firebase/firestore";
import { energyDb } from "@/lib/firebaseEnergy"; // ✅ use energy project

type ConsumptionEntry = {
  demand_kwh: number;
  ts: string | Date; // Firestore timestamp
};

export default function ForecastWidget() {
  const [forecast, setForecast] = useState({
    trend: "Loading...",
    risk: "Loading...",
    recommendation: "Loading...",
  });

  useEffect(() => {
    const q = query(
      collection(energyDb, "raw_consumption"),
      orderBy("ts", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => doc.data() as ConsumptionEntry);

      if (docs.length > 1) {
        const latest = docs[0];
        const prev = docs[1];

        const trend =
          latest.demand_kwh > prev.demand_kwh ? "increasing 📈" : "decreasing 📉";
        const diff = latest.demand_kwh - prev.demand_kwh;

        // Simple moving average forecast
        const avgDemand =
          docs.reduce((acc, d) => acc + d.demand_kwh, 0) / docs.length;
        // const forecastDemand = Math.round(avgDemand + diff * 0.5); // weighted by momentum

        setForecast({
          trend: `Demand is ${trend}`,
          risk:
            diff > 100
              ? "⚠️ Risk of sudden spike in demand"
              : diff < -100
              ? "⚠️ Risk of sudden drop in demand"
              : "✅ Stable demand",
          recommendation:
            diff > 100
              ? "Consider load balancing or reserve capacity"
              : diff < -100
              ? "Reduce standby generation, monitor fluctuations"
              : "Maintain current allocation",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">🔮 Forecast Insights</h2>
      <div className="bg-indigo-900 rounded-lg p-6 space-y-3 shadow-lg">
        <div>
          <strong className="text-indigo-300">Trend:</strong> {forecast.trend}
        </div>
        <div>
          <strong className="text-indigo-300">Risk:</strong> {forecast.risk}
        </div>
        <div>
          <strong className="text-indigo-300">Recommendation:</strong>{" "}
          {forecast.recommendation}
        </div>
      </div>
    </div>
  );
}
