"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

export default function WinRateChart({ data }: Props) {
  return (
    <div className="h-72 w-full rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="mb-4 text-lg font-semibold text-white">
        Trader Win Rate
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid stroke="#1e293b" />
          <XAxis
          dataKey="name"
          stroke="#94a3b8"
          angle={-25}
          textAnchor="end"
          interval={0}
          height={60}
          padding={{ left: 20, right: 20 }}
          />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Bar dataKey="value" fill="#06b6d4" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}