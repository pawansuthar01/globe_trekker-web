const StoryCardSkeleton = () => (
  <div className="rounded-xl border p-4 shadow-sm bg-white w-full max-w-md mx-auto">
    <div className="h-48 w-full rounded-md mb-4 bg-gray-200  animate-pulse" />
    <div className="h-5 w-3/4 mb-2 bg-gray-200  animate-pulse" />
    <div className="h-4 w-1/2 mb-3 bg-gray-200  animate-pulse" />
    <div className="h-4 w-full mb-1 bg-gray-200  animate-pulse" />
    <div className="h-4 w-full mb-1 bg-gray-200  animate-pulse" />
    <div className="h-4 w-2/3 bg-gray-200  animate-pulse" />
    <div className="flex items-center gap-3 mt-4">
      <div className="h-10 w-10 rounded-full bg-gray-200  animate-pulse" />
      <div className="space-y-1">
        <div className="h-4 w-24 bg-gray-200  animate-pulse" />
        <div className="h-3 w-16 bg-gray-200  animate-pulse" />
      </div>
    </div>
  </div>
);

const StoryListSkeleton = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-8">
      {Array.from({ length: count }).map((_, i) => (
        <StoryCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default StoryListSkeleton;
