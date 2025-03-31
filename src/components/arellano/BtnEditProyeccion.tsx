"use client";
import { Edit } from "@/icons";

interface BtnEditProyeccionProps {
  codigo: number;
  onEdit: (codigo: number) => void;
}

export default function BtnEditProyeccion({ codigo, onEdit }: BtnEditProyeccionProps) {
  return (
    <button
      className="p-2 rounded-full bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500 hover:text-error-800 hover:bg-error-100 dark:hover:bg-error-500/20 dark:hover:text-error-500 transition-all"
      onClick={() => onEdit(codigo)}
    >
      <Edit className="w-4 h-4" />
    </button>
  );
}