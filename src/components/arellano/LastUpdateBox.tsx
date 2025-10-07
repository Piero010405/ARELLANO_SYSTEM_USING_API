import { LastUpdateFile } from "@/lib/api/types";

interface LastUpdateBoxProps {
  file: LastUpdateFile | undefined;
}

export default function LastUpdateBox({file}: LastUpdateBoxProps) {
  
  if (!file) {
    return (
      <div className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full h-11 w-11 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
        <span className="text-xs font-medium">Sin datos</span>
      </div>
    );
  }

  // * Formatear la fecha y hora
  const updateDate = new Date(file.fecha_actual);
  const day = updateDate.getDate().toString().padStart(2, '0');
  const month = (updateDate.getMonth() + 1).toString().padStart(2, '0');
  const year = (updateDate.getFullYear()).toString();
  const hour = file.hora.toString().padStart(2, '0');
  const minutes = file.minutos.toString().padStart(2, '0');
  const filename = file.ARCHIVO;

  return (
    <div
      className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-2xl hover:text-dark-900 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white py-2 px-4 text-xs"
    >
      <div className="flex flex-col items-center justify-center">
        <span className="text-xs font-medium">Última Actualización {filename}</span>
        <span className="text-sm font-normal">{day}/{month}/{year} {hour}:{minutes}</span>
      </div>
    </div>
  );
};
