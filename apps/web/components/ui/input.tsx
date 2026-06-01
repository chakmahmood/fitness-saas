import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: Props) {
  return (
    <input
      className={`
        bg-zinc-800
        rounded-xl
        px-4
        py-3
        outline-none
        text-white
        w-full
        ${className}
      `}
      {...props}
    />
  );
}
