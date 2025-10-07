// src/components/skeletons.tsx
"use client";

export function StoreMetricsSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6 animate-pulse-no-scale">
      <div className="flex items-center justify-between">
        <div className="h-5 w-32 bg-gray-200 rounded dark:bg-gray-700" />
      </div>

      <div className="mt-6 max-w-full overflow-x-auto custom-scrollbar mb-6">
        <div className="min-w-[650px] xl:min-w-full flex items-end space-x-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className="h-24 w-10 bg-gray-200 rounded-md dark:bg-gray-700" />
              <div className="h-3 w-10 bg-gray-200 rounded dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StoreComplianceSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03] animate-pulse-no-scale">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <div className="h-5 w-32 bg-gray-200 rounded dark:bg-gray-700" />
            <div className="mt-2 h-4 w-52 bg-gray-200 rounded dark:bg-gray-700" />
          </div>
          <div className="h-6 w-6 bg-gray-200 rounded-full dark:bg-gray-700" />
        </div>

        <div className="relative mt-6 flex justify-center">
          <div className="h-52 w-52 rounded-full bg-gray-200 dark:bg-gray-700" />
          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] h-6 w-20 bg-gray-200 rounded-full dark:bg-gray-700" />
        </div>

        <div className="mx-auto mt-10 h-4 w-64 bg-gray-200 rounded dark:bg-gray-700" />
      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex flex-col items-center space-y-2">
            <div className="h-3 w-16 bg-gray-200 rounded dark:bg-gray-700" />
            <div className="h-5 w-10 bg-gray-200 rounded dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function StoresTablesFaltantesSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-700 animate-pulse-no-scale" />
        <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-700 animate-pulse-no-scale" />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto custom-scrollbar-x">
          <div className="min-w-[1102px] px-4 py-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 animate-pulse-no-scale"
              >
                {[...Array(9)].map((__, j) => (
                  <div
                    key={j}
                    className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StoresTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700 animate-pulse-no-scale" />
        <div className="flex gap-3">
          <div className="h-8 w-20 rounded bg-gray-200 dark:bg-gray-700 animate-pulse-no-scale" />
          <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-700 animate-pulse-no-scale" />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto custom-scrollbar-x">
          <div className="min-w-[1102px] px-4 py-2">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 animate-pulse-no-scale"
              >
                {[...Array(7)].map((__, j) => (
                  <div
                    key={j}
                    className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse-no-scale"
          />
        ))}
      </div>
    </div>
  );
}

export default function NotificationDropdownSkeleton() {
  return (
    <>
      <div className="flex items-center justify-between mt-1 pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
        <div className="h-5 w-28 rounded bg-gray-200 dark:bg-gray-700 animate-pulse-no-scale" />
        <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse-no-scale" />
      </div>

      <div className="flex gap-3 items-start mt-4">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse-no-scale" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700 animate-pulse-no-scale" />
          <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700 animate-pulse-no-scale" />
          <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400 mt-1">
            <div className="h-2 w-10 rounded bg-gray-200 dark:bg-gray-700 animate-pulse-no-scale"/>
              <span className="w-1 h-1 g-gray-200 dark:bg-gray-700 animate-pulse-no-scale rounded-full"></span>
              <div className="h-2 w-10 rounded bg-gray-200 dark:bg-gray-700 animate-pulse-no-scale"/>
          </span>
        </div>
      </div>
    </>
  );
}

export function UserDropdownSkeleton() {
  return (
    <div className="relative">
      {/* Botón simulando el avatar y nombre */}
      <button
        disabled
        className="flex items-center text-gray-400 cursor-not-allowed"
      >
        {/* Avatar */}
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11 bg-gray-200 dark:bg-gray-700 animate-pulse-no-scale" />

        {/* Nombre */}
        <span className="block mr-1 h-4 w-27 rounded bg-gray-200 dark:bg-gray-700 animate-pulse-no-scale"></span>

        {/* Icono dropdown */}
        <svg
          className="stroke-gray-300 dark:stroke-gray-600"
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export function LastUpdateBoxSkeleton() {
  return (
    <div className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-gray-900 py-2 px-4 text-xs">
      <div className="flex flex-col items-center justify-center space-y-2 animate-pulse-no-scale">
        <div className="h-4 w-33 bg-gray-200 rounded dark:bg-gray-700 animate-pulse-no-scale" />
        <div className="h-4 w-25 bg-gray-200 rounded dark:bg-gray-700 animate-pulse-no-scale" />
      </div>
    </div>
  );
}
