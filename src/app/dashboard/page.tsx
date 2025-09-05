// app/dashboard/page.tsx
import { buildMetadata } from "../lib/metadata";
import ArelanoDashboard from "@/components/arellano/ArellanoDashboard";

export const metadata = buildMetadata("Inicio");

export default function DashboardPage() {
  return <ArelanoDashboard />;
}
