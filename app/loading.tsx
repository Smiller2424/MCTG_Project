// app/loading.tsx
// Route-transition skeleton shown automatically by Next.js while a page
// (e.g. a trader profile) is loading, instead of a blank flash.
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-3xl animate-pulse space-y-4">
        <div className="h-8 w-1/3 rounded bg-slate-800" />
        <div className="h-4 w-2/3 rounded bg-slate-800" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="h-20 rounded-xl bg-slate-800" />
          <div className="h-20 rounded-xl bg-slate-800" />
          <div className="h-20 rounded-xl bg-slate-800" />
          <div className="h-20 rounded-xl bg-slate-800" />
        </div>
        <div className="h-40 rounded-xl bg-slate-800" />
      </div>
    </div>
  );
}
