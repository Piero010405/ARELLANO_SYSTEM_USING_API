"use client";
import { useEffect, useState } from "react";
import { Store } from "@/lib/api/types";
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
import ResetButton from "./BtnReset";
import { useModal } from "@/hooks/useModal";
import ModalEditStore from "./ModalEditStore";
import { useLoading } from "@/context/loading/LoadingContext";
import StoreFilterInput from "./StoreFilterInput";

interface StoresTableProps {
  pageSize?: number;
}

export default function StoresTable({ pageSize = 10 }: StoresTableProps) {
  const [allStores, setAllStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const { show, hide } = useLoading();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/stores?pageSize=10000&offset=0");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Error desconocido");

        setAllStores(data.stores || []);
        setFilteredStores(data.stores || []);
        setTotalEntries(data.total || data.stores?.length || 0);
      } catch (error) {
        console.error("Error al cargar tiendas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = allStores.filter((store) =>
        String(store.CODIGO).toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStores(filtered);
      setCurrentPage(1); // reset paginación
      setTotalEntries(filtered.length);
    } else {
      setFilteredStores(allStores);
      setTotalEntries(allStores.length);
    }
  }, [searchQuery, allStores]);


  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedStores = filteredStores.slice(startIndex, endIndex);
  
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
    setCurrentPage(1);
    setFilteredStores(allStores);
    setTotalEntries(allStores.length);
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
              <StoreFilterInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
          </div>
        
        {!loading && filteredStores.length === 0 && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                <p>No se encontraron resultados.</p>
            </div>
        )}

    {filteredStores.length > 0 && (
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
                {paginatedStores.map((store, index) => (
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

    <ModalEditStore isOpen={isOpen} closeModal={closeModal} selectedStoreCode={selectedStore?.CODIGO ?? null} />
    </div>

  );
}