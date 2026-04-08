export default function VendorsLoading() {
  return (
    <div className="ks-vs-grid">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="ks-vs-card animate-pulse">
          <div className="ks-vs-card-header">
            <div className="w-12 h-12 rounded-full bg-stone-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-stone-200 rounded w-3/4" />
              <div className="h-3 bg-stone-100 rounded w-1/2" />
            </div>
          </div>
          <div className="space-y-2 mt-3">
            <div className="h-3 bg-stone-100 rounded w-full" />
            <div className="h-3 bg-stone-100 rounded w-2/3" />
          </div>
          <div className="h-9 bg-stone-100 rounded-lg mt-4" />
        </div>
      ))}
    </div>
  );
}
