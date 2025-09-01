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
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
        <div className="h-5 w-28 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="flex gap-3 items-center">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </>
  );
}
