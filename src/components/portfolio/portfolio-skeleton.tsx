export function PortfolioSkeleton() {
  return (
    <div className="masonry-grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="masonry-item">
          <div
            className="rounded-2xl bg-muted animate-pulse"
            style={{ paddingBottom: i % 3 === 0 ? "133%" : "75%" }}
          />
        </div>
      ))}
    </div>
  );
}
