// src/components/arellano/LastUpdateE2E.tsx

import { useLastUpdateE2e } from "@/features/last-update/hooks";
import LastUpdateBox from "./LastUpdateBox";

export default function LastUpdateE2e() {
  const { data: file, isLoading } = useLastUpdateE2e();
  console.log("FILA:",file);
  return (
    <LastUpdateBox file={file} />
  );
};