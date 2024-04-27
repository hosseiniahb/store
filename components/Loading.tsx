export default function Loading() {
  return (
    <div className="w-full animate-pulse space-y-5">
      <div className="w-full flex flex-col items-center gap-2 my-4">
        <div className="w-full h-10 rounded-lg bg-slate-200 dark:bg-slate-800"></div>
        <div className="w-full h-10 rounded-lg bg-slate-200 dark:bg-slate-800"></div>
        <div className="w-full h-10 rounded-lg bg-slate-200 dark:bg-slate-800"></div>
        <div className="w-full h-10 rounded-lg bg-slate-200 dark:bg-slate-800"></div>
      </div>
    </div>
  );
}
