import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`
        bg-zinc-900
        rounded-3xl
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}
