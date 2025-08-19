import { Input } from "../ui/input";

interface StoreFilterInputProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function StoreFilterInput({ searchQuery, setSearchQuery }: StoreFilterInputProps) {
  return (
    <Input
      placeholder="Buscar tienda por código..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}
