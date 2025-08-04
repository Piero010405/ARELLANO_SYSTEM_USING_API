"use client";
import { useEffect, useState } from "react";
import { Store } from "@/lib/types/global";
import BtnEditProyeccion from "./BtnEditProyeccion";
import SearchBar from "./SearchBar";
import ModalEditStore from "./ModalEditStore";
import { useModal } from "@/hooks/useModal";

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
  } from "../ui/table";
  import Badge from "../ui/badge/Badge";
  
export default function StoresTablesFaltantes() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);
    const { isOpen, openModal, closeModal } = useModal();
  
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await fetch("/api/stores/stores_faltantes");
        if (!res.ok) throw new Error("Error al obtener los datos");
          
        const data = await res.json();
        setStores(data);
      } catch (error) {
        console.error("Error al cargar tiendas:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchStores();
  }, []);

  useEffect(() => {
    const filtered = stores.filter(store =>
      String(store.CODIGO).includes(searchQuery.toLowerCase())
    );
    setFilteredStores(filtered);
  }, [searchQuery, stores]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleEditClick = async (codigo: number) => {
    try {
      const res = await fetch(`/api/stores/${codigo}`);
      const data = await res.json();
      if (!res.ok) throw new Error("Error al obtener los datos de la tienda");

      setSelectedStore(data); // Guardamos la tienda en el estado
      openModal();
    } catch (error) {
      console.error("Error al cargar tienda:", error);
    }
  };

  if (loading) return (
  <>
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <p className="text-lg font-semibold text-gray-800 dark:text-white/90">Cargando...</p>
    </div>
  </>
  );

  return (
    <>
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Mis Tiendas Faltantes
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
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                    Código
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                    AMP
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status E2E
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                    Status A Reportar
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                    Razón
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                    Cluster
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                    AS
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                    Territorio
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                    Editar
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredStores.map((store, index) => (
                  <TableRow key={index} className="">
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400">
                      {store.CODIGO}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400">
                      {store.AMP}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400">
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
                        {(store.STATUS_ACTUAL_EFECTIVO_E2E)}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400">
                      <Badge
                          size="sm"
                          color={
                            store.OOEE_A_REPORTAR === "FULLAUDIT"
                            ? "info"
                            : store.OOEE_A_REPORTAR === "NOTAUDITED"
                            ? "warning"
                            : store.OOEE_A_REPORTAR === "UNKNOWN"
                            ? "dark"
                            : store.OOEE_A_REPORTAR === "CANS"
                            ? "primary"
                            : store.OOEE_A_REPORTAR === "CANCELLED"
                            ? "error"
                            : "info"
                          }
                          >
                          {(store.OOEE_A_REPORTAR == 'NOTAUDITED' || store.OOEE_A_REPORTAR == 'CANCELLED') ? store.OOEE_A_REPORTAR : store.DT_A_REPORTAR}
                        </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400">
                      {(store.RAZON_OOEE == null ? store.RAZON_DT : store.RAZON_OOEE)}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400">
                      {store.CLUSTER}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400">
                      {store.AS}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400">
                      {store.TERRITORIO}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400">
                      <BtnEditProyeccion  codigo={store.CODIGO} onEdit={handleEditClick}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
     <ModalEditStore isOpen={isOpen} closeModal={closeModal} selectedStore={selectedStore} />
    </>
  );
}

  