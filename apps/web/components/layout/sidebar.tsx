type Props = {
  mobile?: boolean;
};

export function Sidebar({ mobile = false }: Props) {
  return (
    <aside
      className={`
        ${mobile ? "w-full" : "w-72 hidden md:flex"}
        bg-zinc-950
        border-r
        border-zinc-800
        p-6
        flex-col
      `}
    >
      <div>
        <h1 className="text-2xl font-bold text-white">Fitness SaaS</h1>

        <p className="text-zinc-500 text-sm mt-1">Health tracking platform</p>
      </div>

      <nav className="mt-10 space-y-2">
        <button className="w-full text-left px-4 py-3 rounded-xl bg-zinc-900 text-white">
          🥩 Protein Tracker
        </button>

        <button className="w-full text-left px-4 py-3 rounded-xl text-zinc-400 hover:bg-zinc-900 transition">
          💧 Water Tracker
        </button>

        <button className="w-full text-left px-4 py-3 rounded-xl text-zinc-400 hover:bg-zinc-900 transition">
          ⚖️ Weigh-In Log
        </button>

        <button className="w-full text-left px-4 py-3 rounded-xl text-zinc-400 hover:bg-zinc-900 transition">
          ✅ Habit Scorecard
        </button>
      </nav>

      <div className="mt-auto pt-10">
        <div className="bg-zinc-900 rounded-2xl p-4">
          <div className="text-sm text-zinc-400">Daily Goal</div>

          <div className="text-3xl font-bold mt-2 text-white">180g</div>
        </div>
      </div>
    </aside>
  );
}
