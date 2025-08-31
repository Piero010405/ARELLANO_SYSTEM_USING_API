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
