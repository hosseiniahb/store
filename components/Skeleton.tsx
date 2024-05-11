export function ProductItemSkeleton() {
  return (
    <div className="animate-pulse w-[237px] h-[310px] flex flex-col items-center justify-between bg-accent rounded-lg p-2">
      <div className="relative w-[220px] h-[150px] rounded-lg bg-slate-200 dark:bg-slate-900">
        <div className="w-8 h-8 absolute top-3 left-3 rounded-lg bg-slate-300 dark:bg-slate-800"></div>
      </div>
      <div className="w-full flex items-center justify-between px-2">
        <div className="w-24 h-6 rounded-lg bg-slate-200 dark:bg-slate-900"></div>
        <div className="w-16 h-6 rounded-lg bg-slate-200 dark:bg-slate-900"></div>
      </div>
      <div className="w-full flex items-center justify-between py-3">
        <div className="w-28 h-11 flex items-start rounded-lg bg-slate-200 dark:bg-slate-900"></div>
        <div className="w-20 h-8 flex items-start gap-2 rounded-lg bg-slate-200 dark:bg-slate-900"></div>
      </div>
    </div>
  );
}

export function CategoryItemSkeleton() {
  return (
    <div className="w-36 h-52 rounded-lg bg-slate-300 dark:bg-slate-800 flex flex-col items-center justify-center gap-4">
      <div className="w-28 h-28 rounded-full bg-slate-300 dark:bg-slate-800"></div>
      <div className="w-20 h-7 rounded-lg bg-slate-300 dark:bg-slate-800"></div>
    </div>
  );
}

export function OrderBillSkeleton() {
  return (
    <div className="w-72 h-auto p-3 shadow-md rounded-lg flex flex-col items-center dark:shadow-slate-800">
      <div className="w-14 h-14 rounded-full bg-slate-300 dark:bg-slate-800 animate-pulse" />
      <div className="w-48 h-5 mt-5 rounded-lg bg-slate-300 dark:bg-slate-800  animate-pulse" />
      <div className="w-full flex flex-col gap-3 mt-10">
        <div className="w-full flex items-center justify-between">
          <div className="w-24 h-5 rounded-lg bg-slate-300 dark:bg-slate-800  animate-pulse" />
          <div className="w-20 h-5 rounded-lg bg-slate-300 dark:bg-slate-800  animate-pulse" />
        </div>
      </div>
      <div className="w-full h-10 rounded-lg bg-slate-300 dark:bg-slate-800  animate-pulse mt-5" />
    </div>
  );
}

export function DataTableSkeleton() {
  return (
    <div className="w-full animate-pulse flex flex-col rounded-lg p-2">
      <div className="w-full h-12 rounded-lg bg-slate-300 dark:bg-slate-800 mb-3" />
      <div className="w-full h-16 rounded-lg bg-slate-300 dark:bg-slate-800 mb-2" />
      <div className="w-full h-16 rounded-lg bg-slate-300 dark:bg-slate-800 mb-2" />
    </div>
  );
}

export function OrderUserInformationSkeleton() {
  return (
    <div className="w-9/12 flex flex-col gap-2 rounded-lg p-2 mt-5">
      <div className="w-56 h-8 animate-pulse rounded-lg bg-slate-300 dark:bg-slate-800" />
      <div className="w-56 h-8 animate-pulse rounded-lg bg-slate-300 dark:bg-slate-800" />
      <div className="w-56 h-8 animate-pulse rounded-lg bg-slate-300 dark:bg-slate-800" />
      <div className="w-56 h-8 animate-pulse rounded-lg bg-slate-300 dark:bg-slate-800" />
      <div className="w-56 h-8 animate-pulse rounded-lg bg-slate-300 dark:bg-slate-800" />
    </div>
  );
}

export function ProductItemsSkeleton() {
  return (
    <div className="w-full flex flex-wrap gap-2">
      <ProductItemSkeleton />
      <ProductItemSkeleton />
      <ProductItemSkeleton />
      <ProductItemSkeleton />
    </div>
  );
}

export function CategoryItemsSkeleton() {
  return (
    <div className="flex items-center justify-center flex-wrap gap-5">
      <CategoryItemSkeleton />
      <CategoryItemSkeleton />
      <CategoryItemSkeleton />
      <CategoryItemSkeleton />
      <CategoryItemSkeleton />
    </div>
  );
}

export function ProductItemDetailsSkeleton() {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full my-10 flex flex-col items-start gap-3 md:flex-row md:justify-center md:h-[550px]">
        <div className="flex flex-col w-full md:w-3/6 md:h-full min-h-[430px] gap-2">
          <div className="w-full h-[270px] rounded-lg bg-slate-300 dark:bg-slate-800"></div>
          <div className="w-full flex flex-row min-h-2/4 gap-2">
            <div className="w-36 h-28 rounded-lg bg-slate-300 dark:bg-slate-800"></div>
            <div className="w-36 h-28 rounded-lg bg-slate-300 dark:bg-slate-800"></div>
            <div className="w-36 h-28 rounded-lg bg-slate-300 dark:bg-slate-800"></div>
            <div className="w-36 h-28 rounded-lg bg-slate-300 dark:bg-slate-800"></div>
          </div>
        </div>

        <div className="w-full mt-3 flex flex-col items-start justify-between md:w-2/6 md:h-[390px] md:mt-0">
          <div className="w-full flex items-center justify-between">
            <div className="w-80 h-11 rounded-lg bg-slate-300 dark:bg-slate-800"></div>
            <div className="w-20 h-7 rounded-lg bg-slate-300 dark:bg-slate-800"></div>
          </div>
          <div className="w-full flex flex-col mt-10 gap-2">
            <div className="w-20 h-7 rounded-lg bg-slate-300 dark:bg-slate-800"></div>
            <div className="w-20 h-7 rounded-lg bg-slate-300 dark:bg-slate-800"></div>
            <div className="w-full h-24 mt-10 rounded-lg bg-slate-300 dark:bg-slate-800"></div>
          </div>
          <div className="w-full h-11 mt-6 rounded-lg bg-slate-300 dark:bg-slate-800"></div>
        </div>
      </div>
    </div>
  );
}
