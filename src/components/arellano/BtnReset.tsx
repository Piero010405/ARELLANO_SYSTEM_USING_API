"use client";
import { Reset } from "@/icons";

interface ResetButtonProps {
  onReset: () => void;
}

export default function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <button
      onClick={onReset}
      className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 dark:text-gray-200 dark:bg-white/[0.03] bg-transparent transition hover:text-dark-900  hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-white"
      title="Restablecer filtros"
    >
      <Reset className="w-5 h-5 text-gray-600 dark:text-gray-300" />
    </button>
  );
}
