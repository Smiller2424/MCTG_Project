

import {
  ResponsiveContainer,
  LineChart,
  Line,
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

export default function PerformanceChart({ data }: Props) {
  return (
    <div className="h-72 w-full rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="mb-4 text-lg font-semibold text-white">
        Trader Performance
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid stroke="#1e293b" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#06b6d4"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}