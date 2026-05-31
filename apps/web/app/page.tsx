"use client";

import { useState } from "react";

import { calculateProtein, addFoodEntry } from "@repo/application";

import { FoodEntry } from "@repo/domain";

export default function Page() {
  const [foods, setFoods] = useState<FoodEntry[]>([]);
  const [foodName, setFoodName] = useState("");
  const [protein, setProtein] = useState("");

  const totalProtein = calculateProtein(foods);

  function handleAddFood() {
    if (!foodName || !protein) return;

    const entry: FoodEntry = {
      id: crypto.randomUUID(),
      name: foodName,
      protein: Number(protein),
      createdAt: new Date(),
    };

    const updated = addFoodEntry(foods, entry);

    setFoods(updated);

    setFoodName("");
    setProtein("");
  }

  return (
    <main
      style={{
        padding: 40,
        maxWidth: 600,
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: 40 }}>🥩 Protein Tracker</h1>

      <div
        style={{
          marginTop: 24,
          padding: 24,
          border: "1px solid #ddd",
          borderRadius: 16,
        }}
      >
        <h2>Total Protein</h2>

        <div
          style={{
            fontSize: 48,
            fontWeight: "bold",
          }}
        >
          {totalProtein}g
        </div>
      </div>

      <div
        style={{
          marginTop: 32,
          display: "flex",
          gap: 12,
        }}
      >
        <input
          placeholder="Food name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          style={{
            padding: 12,
            flex: 1,
          }}
        />

        <input
          type="number"
          placeholder="Protein"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          style={{
            padding: 12,
            width: 120,
          }}
        />

        <button
          onClick={handleAddFood}
          style={{
            padding: "12px 20px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <div style={{ marginTop: 32 }}>
        {foods.map((food) => (
          <div
            key={food.id}
            style={{
              padding: 16,
              border: "1px solid #eee",
              borderRadius: 12,
              marginBottom: 12,
            }}
          >
            <strong>{food.name}</strong>

            <div>Protein: {food.protein}g</div>
          </div>
        ))}
      </div>
    </main>
  );
}
