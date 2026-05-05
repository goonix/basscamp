import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ hover = false, className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`
        bg-gray-900 border border-gray-800 rounded-lg
        ${hover ? "hover:border-gray-700 hover:bg-gray-850 transition-colors cursor-pointer" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
