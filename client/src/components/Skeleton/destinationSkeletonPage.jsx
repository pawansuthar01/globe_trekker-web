const SkeletonCard = () => (
  <div className="w-[350px] h-64 bg-neutral-200 animate-pulse rounded-lg shadow-md" />
);

const TopDestinationsSkeleton = () => {
  return (
    <section className="py-12 sm:py-16 bg-neutral-50 px-2 sm:px-4 lg:ml-3">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
          <div className="w-40 sm:w-60 h-6 sm:h-8 bg-neutral-200 animate-pulse rounded"></div>
        </div>

        {/* Category Pills */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 sm:space-x-4 min-w-max pb-2">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="px-4 py-2 bg-neutral-200 rounded-full w-20 sm:w-24 h-8 animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Skeleton Cards */}
        <div className="flex flex-nowrap overflow-x-auto gap-4 sm:gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="min-w-[200px] sm:min-w-[240px]">
              <SkeletonCard />
            </div>
          ))}
        </div>

        {/* Footer Loader */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center space-x-2 text-neutral-400">
            <div className="h-4 w-32 sm:w-40 bg-neutral-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopDestinationsSkeleton;
