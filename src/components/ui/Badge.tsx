type BadgeVariant = "default" | "violet" | "green" | "yellow" | "red" | "blue";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-gray-800 text-gray-300",
  violet: "bg-violet-900/50 text-violet-300 border border-violet-700/50",
  green: "bg-green-900/50 text-green-300 border border-green-700/50",
  yellow: "bg-yellow-900/50 text-yellow-300 border border-yellow-700/50",
  red: "bg-red-900/50 text-red-300 border border-red-700/50",
  blue: "bg-blue-900/50 text-blue-300 border border-blue-700/50",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
