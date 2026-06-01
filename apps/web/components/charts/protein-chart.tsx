"use client";

import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

import { FoodEntry } from "@repo/domain";

type Props = {
  foods: FoodEntry[];
};

export function ProteinChart({ foods }: Props) {
  const data = foods.map((food, index) => {
    const total = foods
      .slice(0, index + 1)
      .reduce((sum, item) => sum + item.protein, 0);

    return {
      name: food.name,
      protein: total,
    };
  });

  if (foods.length === 0) {
    return <div className="text-zinc-500">No analytics data yet.</div>;
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="protein"
            stroke="#22c55e"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
