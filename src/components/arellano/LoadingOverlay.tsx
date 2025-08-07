// src/components/ui/LoadingOverlay.tsx
"use client";

import ArellanoLoader from "./ArellanoLoader";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <ArellanoLoader />
    </div>
  );
}
