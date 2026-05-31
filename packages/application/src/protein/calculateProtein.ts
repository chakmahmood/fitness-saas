import { FoodEntry } from "@repo/domain";

export function calculateProtein(entries: FoodEntry[]) {
  return entries.reduce((total, item) => total + item.protein, 0);
}
