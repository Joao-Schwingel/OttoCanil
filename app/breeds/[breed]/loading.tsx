export default function BreedLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-brand-cream-dark border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column skeleton */}
          <div className="space-y-8">
            <div className="aspect-square rounded-xl bg-gray-200 animate-pulse" />
            <div className="bg-white rounded-xl p-5 shadow-sm border border-border">
              <div className="text-center mb-4">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mx-auto" />
                <div className="h-4 w-28 bg-gray-100 rounded animate-pulse mx-auto mt-2" />
              </div>
              <div className="aspect-video rounded-lg bg-gray-100 animate-pulse" />
            </div>
          </div>

          {/* Right Column skeleton */}
          <div className="space-y-6">
            <div>
              <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
              <div className="w-12 h-1 bg-brand-gold rounded-full mt-3" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="bg-brand-cream-dark rounded-xl p-5">
              <div className="h-5 w-36 bg-gray-200 rounded animate-pulse mb-3" />
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i}>
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-1" />
                    <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
