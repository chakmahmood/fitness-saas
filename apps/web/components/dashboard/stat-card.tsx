import { Card } from "../ui/card";

type Props = {
  title: string;
  value: string;
};

export function StatCard({ title, value }: Props) {
  return (
    <Card>
      <div className="text-zinc-400">{title}</div>

      <div className="text-5xl font-bold mt-2 text-white">{value}</div>
    </Card>
  );
}
