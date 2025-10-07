// src/components/arellano/LastUpdateE2E.tsx

import { useLastUpdateE2e } from "@/features/last-update/hooks";
import LastUpdateBox from "./LastUpdateBox";
import { LastUpdateBoxSkeleton } from "./skeletons";

export default function LastUpdateE2e() {
  const { data: file, isLoading } = useLastUpdateE2e();
  
  if (isLoading) return <LastUpdateBoxSkeleton />;

  return (
    <LastUpdateBox file={file} />
  );
};