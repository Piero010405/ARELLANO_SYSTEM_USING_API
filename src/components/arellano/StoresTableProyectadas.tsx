"use client";
import { useEffect, useState } from "react";
import { Store } from "@/lib/api/types";
import BtnEditProyeccion from "./BtnEditProyeccion";
import SearchBar from "./SearchBar";
import ModalEditStore from "./ModalEditStore";
import { useModal } from "@/hooks/useModal";
import { useStoresProyectadas } from "@/features/stores/hooks";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Badge from "../ui/badge/Badge";
import { StoresTablesFaltantesSkeleton } from "./skeletons";
  
export default function StoresTablesProyectadas() {
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStoreCode, setSelectedStoreCode] = useState<number | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  
  const { data: stores = [], isLoading } = useStoresProyectadas();

  useEffect(() => {
    const filtered = stores.filter(store =>
      String(store.CODIGO).includes(searchQuery.toLowerCase())
    );
    setFilteredStores(filtered);
  }, [searchQuery, stores]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleEditClick = (codigo: number) => {
    setSelectedStoreCode(codigo);
    openModal();
  };

  if (isLoading) return <StoresTablesFaltantesSkeleton />;

  return (
    <>
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Mis Tiendas Proyectadas
          </h3>
        </div>

        <SearchBar onSearch={handleSearch} />

      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto custom-scrollbar-x">
          <div className="min-w-[1102px] px-4 py-2">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 px-3"
                    >
                    Código
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 px-3"
                    >
                    AS
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 px-3"
                  >
                    Status E2E
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 px-3"
                  >
                    Status Proyectado
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 px-3"
                    >
                    FDT
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 px-3"
                    >
                    Razón
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 px-3"
                    >
                    Comentario
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 px-3"
                    >
                    Territorio
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 px-3"
                    >
                    Editar
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredStores.map((store, index) => (
                  <TableRow key={index} className="">
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400 px-3">
                      {store.CODIGO}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400 px-3">
                      {store.AS}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400 px-3">
                      <Badge
                        size="sm"
                        color={
                          store.STATUS_ACTUAL_EFECTIVO_E2E === "FULLAUDIT"
                          ? "success"
                          : store.STATUS_ACTUAL_EFECTIVO_E2E === "NOTAUDITED"
                          ? "warning"
                          : store.STATUS_ACTUAL_EFECTIVO_E2E === "UNKNOWN"
                          ? "dark"
                          : store.STATUS_ACTUAL_EFECTIVO_E2E === "CANS"
                          ? "info"
                          : store.STATUS_ACTUAL_EFECTIVO_E2E === "PARTIAL"
                          ? "primary"
                          : "error"
                        }
                        >
                        {store.STATUS_ACTUAL_EFECTIVO_E2E}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400 px-3">
                      <Badge
                        size="sm"
                        color={
                          store.STATUS_PROYECTADO === "FULLAUDIT"
                          ? "success"
                          : store.STATUS_PROYECTADO === "NOTAUDITED"
                          ? "warning"
                          : store.STATUS_PROYECTADO === "UNKNOWN"
                          ? "dark"
                          : store.STATUS_PROYECTADO === "CANS"
                          ? "info"
                          : store.STATUS_PROYECTADO === "PARTIAL"
                          ? "primary"
                          : store.STATUS_PROYECTADO === null
                          ? "dark"
                          : "error"
                        }
                        >
                        {(store.STATUS_PROYECTADO == null ? '-' : store.STATUS_PROYECTADO)}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400 px-3">
                      <Badge
                        size="sm"
                        color={
                          store.DT_A_REPORTAR === "REGULAR"
                          ? "success"
                          : "error"
                        }
                        >
                        {(store.DT_A_REPORTAR)}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400 px-3">
                      {(store.RAZON_OOEE == null ? store.RAZON_DT : store.RAZON_OOEE)}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400 px-3">
                      {(store.COMENTARIO_OOEE == null ? store.COMENTARIO_DT : store.COMENTARIO_OOEE)}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400 px-3">
                      {store.TERRITORIO}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400 px-3">
                      <BtnEditProyeccion  codigo={store.CODIGO} onEdit={handleEditClick}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      {!isLoading && stores.length === 0 && (
        <div className="text-center text-sm text-gray-500 pt-3">No hay tiendas proyectadas.</div>
      )}
    </div>
     <ModalEditStore isOpen={isOpen} closeModal={closeModal} selectedStoreCode={selectedStoreCode} />
    </>
  );
}