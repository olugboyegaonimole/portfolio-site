"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { energyDb } from "@/lib/firebaseEnergy";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type EnergyDoc = {
  demand_kwh: number;
  ts: string;
  region: string;
};

export default function EnergyLineChart() {
  const [data, setData] = useState<EnergyDoc[]>([]);

  useEffect(() => {
    const q = query(
      collection(energyDb, "raw_consumption"),
      orderBy("ts", "desc"),
      limit(50)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => doc.data() as EnergyDoc);
      setData(docs.reverse()); // Reverse so earliest is first
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
        <Line type="monotone" dataKey="demand_kwh" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
