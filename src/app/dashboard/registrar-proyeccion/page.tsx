// app/dashboard/registrar-proyeccion/page.tsx
import { buildMetadata } from "@/app/lib/metadata";
import PageRegistrarProyeccion from "@/components/arellano/PageRegistrarProyeccion";

export const metadata = buildMetadata("Registrar Proyección");

export default function RegistrarProyeccion() {
  return <PageRegistrarProyeccion />;
}