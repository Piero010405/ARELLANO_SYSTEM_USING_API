// app/dashboard/tiendas/tiendas-faltantes/page.tsx
import { buildMetadata } from "@/app/lib/metadata";
import PageMisTiendasFaltantes from "@/components/arellano/PageMisTiendasFaltantes";

export const metadata = buildMetadata("Mis Faltantes");

export default function RegistrarProyeccion() {
  return <PageMisTiendasFaltantes />;
}