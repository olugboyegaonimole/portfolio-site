"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { energyDb } from "@/lib/firebaseEnergy"; // ✅ use energy project
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type EnergyDoc = {
  region: string;
  demand_kwh: number;
};

export default function EnergyBreakdownChart() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(energyDb, "raw_consumption"), (snapshot) => {
      const regionTotals: Record<string, number> = {};

      snapshot.docs.forEach((doc) => {
        const d = doc.data() as EnergyDoc;
        regionTotals[d.region] = (regionTotals[d.region] || 0) + d.demand_kwh;
      });

      setData(
        Object.entries(regionTotals).map(([region, value]) => ({
          name: region,
          value,
        }))
      );
    });

    return () => unsub();
  }, []);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
          {data.map((_, idx) => (
            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
