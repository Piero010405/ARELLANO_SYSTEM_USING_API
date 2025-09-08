import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalEntries: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalEntries,
  pageSize,
  onPageChange,
}) => {
  const maxPageNumbers = 6; // Cuántos números de página se muestran a la vez
  const pageGroup = Math.floor((currentPage - 1) / maxPageNumbers); // Grupo actual

  const startPage = pageGroup * maxPageNumbers + 1;
  const endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);

  return (
    <div className="flex flex-col items-center gap-1 mt-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Mostrando {Math.min(pageSize, totalEntries - (currentPage - 1) * pageSize)} de {totalEntries} tiendas
      </p>

      <div className="flex items-center justify-center gap-2 mt-4">
        {/* Botón para ir a la primera página */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded-lg text-gray-700 dark:text-gray-400 hover:bg-blue-500/[0.2]"
        >
          {"<<"}
        </button>

        {/* Botón para retroceder en grupos */}
        <button
          onClick={() => onPageChange(Math.max(1, startPage - maxPageNumbers))}
          disabled={startPage === 1}
          className="px-2 py-1 rounded-lg text-gray-700 dark:text-gray-400 hover:bg-blue-500/[0.2]"
        >
          {"<"}
        </button>

        
        {/* Números de página */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 rounded-full ${currentPage === page ? "bg-brand-500 text-white" : "text-gray-700 dark:text-gray-400 hover:bg-blue-500/[0.2]"}`}
          >
            {page}
          </button>
        ))}

        {/* Botón para avanzar en grupos */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, startPage + maxPageNumbers))}
          disabled={endPage === totalPages}
          className="px-2 py-1 rounded-lg text-gray-700 dark:text-gray-400 hover:bg-blue-500/[0.2]"
        >
          {">"}
        </button>

        {/* Botón para ir a la última página */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded-lg text-gray-700 dark:text-gray-400 hover:bg-blue-500/[0.2]"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
