"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { energyDb } from "@/lib/firebaseEnergy";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type EnergyDoc = {
  demand_kwh: number;
  ts: string;
  region: string;
};

export default function EnergyLineChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(energyDb, "raw_consumption"),
      orderBy("ts", "desc"),
      limit(50)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => doc.data() as EnergyDoc);

      // ✅ Add a mocked forecasted_kwh for each doc
      const enriched = docs.map((d) => ({
        ...d,
        actual_kwh: d.demand_kwh,
        forecasted_kwh: d.demand_kwh + (Math.random() * 100 - 50), // +/- 50 kWh variation
      }));

      setData(enriched.reverse()); // earliest first
    });

    return () => unsub();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ts" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="actual_kwh" stroke="#82ca9d" name="Actual Consumption" />
        <Line type="monotone" dataKey="forecasted_kwh" stroke="#8884d8" name="Forecasted Consumption" />
      </LineChart>
    </ResponsiveContainer>
  );
}
