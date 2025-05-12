export const AboutPageSkeleton = () => {
  return (
    <div className="overflow-hidden p-6 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="page-header mb-6 flex justify-between items-center">
        <div>
          <div className="h-6 w-40 mb-2 bg-gray-200 rounded" />
          <div className="h-4 w-56 bg-gray-200 rounded" />
        </div>
        <div className="flex space-x-3">
          <div className="h-10 w-32 rounded-md bg-gray-200" />
          <div className="h-10 w-36 rounded-md bg-gray-200" />
        </div>
      </div>

      <div className="space-y-6">
        {/* General Info Card Skeleton */}
        <div className="card space-y-4">
          <div className="h-5 w-48 bg-gray-300 rounded" />
          <div className="space-y-3">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-100 rounded" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-24 w-full bg-gray-100 rounded" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-32 w-full bg-gray-100 rounded" />
          </div>
        </div>

        {/* Mission Section Skeleton */}
        <div className="card space-y-4">
          <div className="h-5 w-32 bg-gray-300 rounded" />
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <div className="h-10 w-full bg-gray-100 rounded" />
              <div className="h-10 w-10 bg-gray-200 rounded" />
            </div>
          ))}
          <div className="h-10 w-40 bg-gray-200 rounded" />
        </div>

        {/* Core Values Section Skeleton */}
        <div className="card space-y-4">
          <div className="h-5 w-36 bg-gray-300 rounded" />
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="space-y-4 border p-4 rounded-lg">
              <div className="flex justify-between">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-6 w-6 bg-gray-200 rounded" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="h-10 bg-gray-100 rounded" />
                <div className="h-10 bg-gray-100 rounded" />
                <div className="h-10 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
          <div className="h-10 w-40 bg-gray-200 rounded" />
        </div>

        {/* Join Section Skeleton */}
        <div className="card space-y-4">
          <div className="h-5 w-32 bg-gray-300 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-10 w-full bg-gray-100 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-20 w-full bg-gray-100 rounded" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <div className="h-10 w-36 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
};
