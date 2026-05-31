type Props = {
  title: string;
  value: string;
};

export function StatCard({ title, value }: Props) {
  return (
    <div className="bg-zinc-900 rounded-3xl p-6">
      <div className="text-zinc-400">{title}</div>

      <div className="text-5xl font-bold mt-2 text-white">{value}</div>
    </div>
  );
}
