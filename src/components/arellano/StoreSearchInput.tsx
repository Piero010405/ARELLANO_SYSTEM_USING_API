import React, { useState, useEffect } from "react";
import { Store } from "@/interfaces/store";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/app/lib/utils";

type StoreSearchProps = {
  onStoreSelect: (store: Store) => void;
};

export default function StoreSearch ({ onStoreSelect }: StoreSearchProps) {
  const [stores, setStores] = useState<Store[]>([]);
  const [query, setQuery] = useState("");
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch inicial para cargar todas las tiendas
  useEffect(() => {
    const fetchStores = async () => {
        const res = await fetch(`/api/stores?pageSize=1000&offset=0`);
        const data = await res.json();
        console.log("API RESPONSE:", data);
        setStores(data.stores);
    };
    fetchStores();
  }, []);

  // Filtrar tiendas en base al input
  useEffect(() => {
    if (query.length > 0) {
        const filtered = stores.filter((store) =>
            store.CODIGO.toString().toLowerCase().startsWith(query.toLowerCase())
        );
        setFilteredStores(filtered);
        setShowSuggestions(true);
    } else {
        setFilteredStores([]);
        setShowSuggestions(false);
    }
  }, [query, stores]);

  const handleSelectStore = (store: Store) => {
    setQuery(store.CODIGO.toString());
    setShowSuggestions(false);
    onStoreSelect(store); // Mandamos la tienda completa al padre
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storeFound = stores.find(
        (store) => store.CODIGO.toString().toLowerCase() === query.toLowerCase()
    );
    if (storeFound) {
      handleSelectStore(storeFound);
    } else {
      alert("Código no encontrado");
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Buscar tienda por código"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.length > 0) setShowSuggestions(true);
          }}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 150);
          }}
        />
      </form>

      {showSuggestions && filteredStores.length > 0 && (
        <ScrollArea className="absolute z-20 w-full mt-1 max-h-60 rounded-md border dark:bg-dark-900 border-gray-300 bg-white text-gray-800 shadow-theme-xs dark:border-gray-700 dark:bg-gray-900 dark:text-white/90">
          {filteredStores.map((store) => (
            <div
              key={store.CODIGO}
              className={cn(
                "cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition",
                "flex justify-between items-center"
              )}
              onClick={() => handleSelectStore(store)}
            >
              <span>{store.CODIGO}</span>
              <span className="text-xs text-gray-500">{store.NOMBRE_TIENDA}</span>
            </div>
          ))}
        </ScrollArea>
      )}
    </div>
  );
};