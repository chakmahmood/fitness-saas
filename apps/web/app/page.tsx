"use client";

import { useEffect, useState } from "react";

import {
  calculateProtein,
  addFoodEntry,
  calculateGoalProgress,
} from "@repo/application";

import { FoodEntry } from "@repo/domain";

import { saveToStorage, loadFromStorage } from "@repo/infrastructure";

import { AppLayout } from "../components/layout/app-layout";

import { StatCard } from "../components/dashboard/stat-card";

import { ProteinChart } from "../components/charts/protein-chart";

import { Card } from "../components/ui/card";

import { Button } from "../components/ui/button";

import { Input } from "../components/ui/input";

const DAILY_GOAL = 180;

const STORAGE_KEY = "protein-tracker-foods";

export default function Page() {
  const [hydrated, setHydrated] = useState(false);

  const [foods, setFoods] = useState<FoodEntry[]>([]);

  const [foodName, setFoodName] = useState("");

  const [protein, setProtein] = useState("");

  // Hydrate from localStorage
  useEffect(() => {
    const stored = loadFromStorage<FoodEntry[]>(STORAGE_KEY, []);

    const parsed = stored.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    }));

    setFoods(parsed);

    setHydrated(true);
  }, []);

  // Persist data
  useEffect(() => {
    if (!hydrated) return;

    saveToStorage(STORAGE_KEY, foods);
  }, [foods, hydrated]);

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

  // Prevent hydration mismatch
  if (!hydrated) {
    return null;
  }

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold text-white">🥩 Protein Tracker</h1>

          <p className="text-zinc-400 mt-3">Track your daily protein intake</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <StatCard title="Total Protein" value={`${totalProtein}g`} />

          <StatCard title="Daily Goal" value={`${DAILY_GOAL}g`} />
        </div>

        {/* Progress */}
        <Card className="mt-8">
          <div className="flex justify-between mb-3 text-white">
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
        </Card>

        {/* Add Food */}
        <Card className="mt-10">
          <h2 className="text-2xl font-bold text-white">Add Food</h2>

          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <Input
              placeholder="Chicken breast..."
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />

            <Input
              type="number"
              placeholder="Protein"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              className="md:w-32"
            />

            <Button onClick={handleAddFood}>Add</Button>
          </div>
        </Card>

        {/* Analytics */}
        <Card className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Analytics</h2>

              <p className="text-zinc-400 mt-1">Protein intake trends</p>
            </div>
          </div>

          <div className="mt-8">
            <ProteinChart foods={foods} />
          </div>
        </Card>

        {/* Entries */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white">Food Entries</h2>

          <div className="mt-5 space-y-4">
            {foods.length === 0 && (
              <div className="text-zinc-500">No food entries yet.</div>
            )}

            {foods.map((food) => (
              <Card key={food.id} className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-lg text-white">
                    {food.name}
                  </div>

                  <div className="text-zinc-400 text-sm mt-1">
                    {food.createdAt.toLocaleTimeString()}
                  </div>
                </div>

                <div className="text-2xl font-bold text-white">
                  {food.protein}g
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
