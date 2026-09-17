"use client";

import { useState } from "react";

import { exportStoresExcel } from "@/features/stores/api";


export default function BtnExportStores() {

  const [exporting, setExporting] =
    useState(false);

  const handleExport = async () => {
    if (exporting) return;
    try {
      setExporting(true);
      await exportStoresExcel();
    } catch (error) {
      console.error(
        "Error exportando tiendas:",
        error
      );
      window.alert(
        error instanceof Error
          ? error.message
          : "No se pudo generar el archivo Excel"
      );
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={exporting}
      className="
        inline-flex
        h-11
        items-center
        justify-center
        gap-2
        rounded-lg
        bg-[#8CBB34]
        px-2
        text-sm
        font-medium
        text-white
        transition
        hover:bg-[#7da72e]
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {exporting ? (
        <>
          <span
            className="
              h-4
              w-4
              animate-spin
              rounded-full
              border-2
              border-white
              border-t-transparent
            "
          />
          Exportando...
        </>
      ) : (
        <>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
          Exportar
        </>
      )}
    </button>
  );
}