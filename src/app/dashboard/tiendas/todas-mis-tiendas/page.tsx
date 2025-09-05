// app/dashboard/tiendas/todas-mis-tiendas/page.tsx
import { buildMetadata } from "@/app/lib/metadata";
import PageTodasMisTiendas from "@/components/arellano/PageTodasMisTiendas";

export const metadata = buildMetadata("Mis Tiendas");

export default function TodasMisTiendas() {
  return <PageTodasMisTiendas />;
}