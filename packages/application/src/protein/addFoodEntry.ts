import { FoodEntry } from "@repo/domain";

export function addFoodEntry(list: FoodEntry[], entry: FoodEntry): FoodEntry[] {
  return [...list, entry];
}
