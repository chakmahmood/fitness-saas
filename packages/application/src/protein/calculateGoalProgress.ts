export function calculateGoalProgress(total: number, goal: number) {
  const percentage = goal === 0 ? 0 : (total / goal) * 100;

  return {
    percentage: Math.min(percentage, 100),
    remaining: Math.max(goal - total, 0),
    completed: total >= goal,
  };
}
