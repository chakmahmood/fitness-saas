import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const variants = {
    primary: "bg-white text-black hover:opacity-90",

    secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
  };

  return (
    <button
      className={`
        px-6
        py-3
        rounded-xl
        font-semibold
        transition
        ${variants[variant]}
        ${className}
      `}
      {...props}
    />
  );
}
