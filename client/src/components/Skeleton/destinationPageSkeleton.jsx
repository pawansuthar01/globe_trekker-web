const DestinationSkeleton = () => {
  return (
    <div className="animate-pulse bg-white  rounded-xl shadow-md overflow-hidden max-w-md w-full mx-auto mb-6">
      <div className="h-48 bg-gray-300  w-full" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300  rounded w-3/4" />
        <div className="h-4 bg-gray-300  rounded w-1/2" />
        <div className="h-3 bg-gray-300  rounded w-full" />
        <div className="h-3 bg-gray-300  rounded w-5/6" />
      </div>
    </div>
  );
};

export default DestinationSkeleton;
