export function PortfolioSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <div
            className="rounded-2xl bg-muted animate-shimmer bg-[length:1000px_100%] bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{ 
              aspectRatio: i % 2 === 0 ? "4/3" : "1/1",
              height: "auto"
            }}
          />
          <div className="h-6 w-2/3 bg-muted animate-shimmer bg-[length:1000px_100%] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg" />
          <div className="h-4 w-1/3 bg-muted animate-shimmer bg-[length:1000px_100%] bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg" />
        </div>
      ))}
    </div>
  );
}
