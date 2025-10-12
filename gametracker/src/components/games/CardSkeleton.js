export default function CardSkeleton() {
  return (
    <div className="h-96 w-64 rounded-xl bg-slate-800 p-4 animate-pulse">
      <div className="flex flex-col justify-end h-full">
        
        <div className="space-y-3">
          <div className="h-5 bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}