"use client";

import { useEffect, useState } from "react";

import {
  calculateProtein,
  addFoodEntry,
  calculateGoalProgress,
} from "@repo/application";

import { FoodEntry } from "@repo/domain";

import { saveToStorage, loadFromStorage } from "@repo/infrastructure";

const DAILY_GOAL = 180;

const STORAGE_KEY = "protein-tracker-foods";

export default function Page() {
  const [foods, setFoods] = useState<FoodEntry[]>([]);

  const [foodName, setFoodName] = useState("");

  const [protein, setProtein] = useState("");

  // Load persisted data
  useEffect(() => {
    const stored = loadFromStorage<FoodEntry[]>(STORAGE_KEY, []);

    const parsed = stored.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    }));

    setFoods(parsed);
  }, []);

  // Auto save
  useEffect(() => {
    saveToStorage(STORAGE_KEY, foods);
  }, [foods]);

  const totalProtein = calculateProtein(foods);

  const goal = calculateGoalProgress(totalProtein, DAILY_GOAL);

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
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold">🥩 Protein Tracker</h1>

        <p className="text-zinc-400 mt-3">Track your daily protein intake</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 mt-10">
          <div className="bg-zinc-900 rounded-3xl p-6">
            <div className="text-zinc-400">Total Protein</div>

            <div className="text-6xl font-bold mt-2">{totalProtein}g</div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6">
            <div className="text-zinc-400">Daily Goal</div>

            <div className="text-6xl font-bold mt-2">{DAILY_GOAL}g</div>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-8 bg-zinc-900 rounded-3xl p-6">
          <div className="flex justify-between mb-3">
            <span>Goal Progress</span>

            <span>{Math.round(goal.percentage)}%</span>
          </div>

          <div className="w-full h-5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{
                width: `${goal.percentage}%`,
              }}
            />
          </div>

          <div className="mt-3 text-zinc-400">
            {goal.completed
              ? "Daily goal achieved 🎉"
              : `${goal.remaining}g remaining`}
          </div>
        </div>

        {/* Add food */}
        <div className="mt-10 bg-zinc-900 rounded-3xl p-6">
          <h2 className="text-2xl font-bold">Add Food</h2>

          <div className="flex gap-4 mt-6">
            <input
              placeholder="Chicken breast..."
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="flex-1 bg-zinc-800 rounded-xl px-4 py-3 outline-none"
            />

            <input
              type="number"
              placeholder="Protein"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              className="w-32 bg-zinc-800 rounded-xl px-4 py-3 outline-none"
            />

            <button
              onClick={handleAddFood}
              className="bg-white text-black px-6 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Entries */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold">Food Entries</h2>

          <div className="mt-5 space-y-4">
            {foods.length === 0 && (
              <div className="text-zinc-500">No food entries yet.</div>
            )}

            {foods.map((food) => (
              <div
                key={food.id}
                className="bg-zinc-900 rounded-2xl p-5 flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold text-lg">{food.name}</div>

                  <div className="text-zinc-400 text-sm mt-1">
                    {food.createdAt.toLocaleTimeString()}
                  </div>
                </div>

                <div className="text-2xl font-bold">{food.protein}g</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
