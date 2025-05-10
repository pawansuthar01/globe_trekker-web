const SkeletonCard = () => (
  <div className="w-[350px] h-64 bg-neutral-200 animate-pulse rounded-lg shadow-md" />
);

const TopDestinationsSkeleton = () => {
  return (
    <section className="py-16 bg-neutral-50 px-1 lg:ml-3">
      <div className="container mx-auto">
        <div className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
          <div className="w-60 h-8 bg-neutral-200 animate-pulse rounded"></div>
        </div>

        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 md:space-x-4 min-w-max pb-2">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="px-4 py-2 bg-neutral-200 rounded-full w-24 h-8 animate-pulse"
              />
            ))}
          </div>
        </div>

        <div className="flex pl-1 overflow-x-auto gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center space-x-2 text-neutral-400">
            <div className="h-4 w-40 bg-neutral-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopDestinationsSkeleton;
