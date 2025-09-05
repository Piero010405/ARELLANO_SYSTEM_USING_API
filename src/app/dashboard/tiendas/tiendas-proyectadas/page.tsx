// app/dashboard/tiendas/tiendas-proyectadas/page.tsx
import { buildMetadata } from "@/app/lib/metadata";
import PageMisTiendasProyectadas from "@/components/arellano/PageMisTiendasProyectadas";

export const metadata = buildMetadata("Mis Proyectadas");

export default function RegistrarProyeccion() {
  return <PageMisTiendasProyectadas />;
}