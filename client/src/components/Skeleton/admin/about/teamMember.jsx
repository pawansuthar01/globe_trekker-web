export const MemberSkeleton = () => {
  return (
    <div className="card-grid">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="card overflow-hidden animate-pulse">
          <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg bg-gray-200"></div>

          <div className="mb-1 h-5 w-3/4 rounded bg-gray-200"></div>
          <div className="mb-2 h-4 w-1/2 rounded bg-blue-200"></div>
          <div className="mb-4 h-10 w-full rounded bg-gray-200"></div>

          <div className="flex space-x-2">
            <div className="flex-1 h-10 rounded-md bg-gray-300"></div>
            <div className="flex-1 h-10 rounded-md bg-red-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
