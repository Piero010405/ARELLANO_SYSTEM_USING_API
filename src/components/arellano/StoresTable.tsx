"use client";
import { useEffect, useState } from "react";
import { Store } from "@/lib/types/global";
import BtnEditProyeccion from "./BtnEditProyeccion";
import Pagination from "../tables/Pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import SearchBarStore from "./SearchBarStore";
import ResetButton from "./BtnReset";
import { useModal } from "@/hooks/useModal";
import ModalEditStore from "./ModalEditStore";
import { useLoading } from "@/context/loading/LoadingContext";

interface StoresTableProps {
  pageSize?: number;
}

export default function StoresTable({ pageSize = 10 }: StoresTableProps) {
  const [stores, setStores] = useState<Store[]>([]);
  const [originalStores, setOriginalStores] = useState<{ stores: Store[]; total: number }>({stores: [], total: 0});
  const [loading, setLoading] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const { show, hide } = useLoading();

  useEffect(() => {
    const fetchAllStores = async () => {
      try {
        const res = await fetch("/api/stores");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error desconocido");

        setOriginalStores(data);
        setTotalEntries(data.total);
      } catch (error) {
        console.error("Error al cargar todas las tiendas:", error);
      }
    };

    fetchAllStores();
  }, []);
  
  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
  
        const res = await fetch(`/api/stores?page=${currentPage}&pageSize=${pageSize}`);
        const data = await res.json();
  
        if (!res.ok) throw new Error(data.error || "Error desconocido");
  
        setStores(data.stores || []);
        setTotalEntries(data.total || 0);
        setSearchActive(false);
      } catch (error) {
        console.error("Error al cargar tiendas:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchStores();
  }, [currentPage, pageSize]);

  const totalPages = Math.ceil(totalEntries / pageSize);

  const handleEditClick = async (codigo: number) => {
    try {
      show();
      const res = await fetch(`/api/stores/${codigo}`);
      const data = await res.json();
      if (!res.ok) throw new Error("Error al obtener los datos de la tienda");

      setSelectedStore(data);
      openModal();
    } catch (error) {
      console.error("Error al cargar tienda:", error);
    } finally {
      hide();
    }
  };

  const handleReset = () => {
      setSearchQuery("");
      setSearchActive(false);
      setCurrentPage(1);

      setTotalEntries(originalStores.total);

      // Aplicar paginación sobre los datos originales
      const startIndex = 0;
      const endIndex = pageSize;
      setStores(originalStores.stores.slice(startIndex, endIndex));
  };

  if (loading) return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <p className="text-lg font-semibold text-gray-800 dark:text-white/90">Cargando...</p>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
          <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Mis Tiendas
              </h3>
            </div>

            <div className="flex items-center gap-x-3">
              <ResetButton onReset={handleReset} />
              <SearchBarStore 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              onSearch={(storeData) => {
                setSearchActive(true);
                if (storeData) {
                  setStores([storeData]); // Mostrar solo la tienda encontrada
                  setTotalEntries(1);
                } else {
                  setStores([]); // Si no hay datos, limpiar la tabla
                  setTotalEntries(0);
                }
              }} />
            </div>
          </div>
        
        {searchActive && stores.length === 0 && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                <p>No se encontraron resultados.</p>
            </div>
        )}

    {stores.length > 0 && (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto custom-scrollbar-x">
          <div className="min-w-[1102px] px-4 py-2">
            <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                        <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                            Código
                        </TableCell>
                        <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                            AMP
                        </TableCell>
                        <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                            Cluster
                        </TableCell>
                        <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                            AS
                        </TableCell>
                        <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                            Status
                        </TableCell>
                        <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                            Razón
                        </TableCell>
                        <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                            Editar
                        </TableCell>
                    </TableRow>
                </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {stores.map((store, index) => (
                  <TableRow key={index}>
                     <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400">
                        {store.CODIGO}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400">
                        {store.AMP}
                    </TableCell>
                     <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400">
                        {store.CLUSTER}
                    </TableCell>
                     <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400">
                        {store.AS}
                    </TableCell>
                    <TableCell>
                      <Badge
                        size="sm"
                        color={
                          store.OOEE_A_REPORTAR === "FULLAUDIT" ? "success" :
                          store.OOEE_A_REPORTAR === "NOTAUDITED" ? "warning" :
                          store.OOEE_A_REPORTAR === "0" ? "dark" :
                          store.OOEE_A_REPORTAR === "CANS" ? "info" :
                          store.OOEE_A_REPORTAR === "PARTIAL" ? "primary" : "error"
                        }
                      >
                        {store.OOEE_A_REPORTAR === '0' ? "UNKNOWN" : store.OOEE_A_REPORTAR}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400">
                        {store.RAZON_OOEE}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-xs dark:text-gray-400">
                      <BtnEditProyeccion codigo={store.CODIGO} onEdit={handleEditClick} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    )}

    {totalEntries > 1 && (
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalEntries={totalEntries} 
        pageSize={pageSize} 
        onPageChange={setCurrentPage} />
    )}

    <ModalEditStore isOpen={isOpen} closeModal={closeModal} selectedStore={selectedStore} />
    </div>

  );
}