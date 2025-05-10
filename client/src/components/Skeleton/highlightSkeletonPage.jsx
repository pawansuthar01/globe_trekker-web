const SkeletonHighlight = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group h-full flex flex-col animate-pulse">
    <div className="relative h-48 overflow-hidden bg-gray-300">
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div className="flex items-center text-white">
          <div className="h-4 w-24 bg-gray-500 rounded"></div>
        </div>
      </div>
    </div>

    <div className="p-5 flex-grow flex flex-col">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <div className="w-full h-full bg-gray-500 animate-pulse"></div>
        </div>
        <div>
          <div className="h-4 w-32 bg-gray-500 rounded mb-1"></div>
          <div className="h-3 w-24 bg-gray-500 rounded"></div>
        </div>
      </div>

      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 w-4 bg-gray-500 rounded-full mr-1"></div>
        ))}
      </div>

      <div className="italic text-gray-700 text-sm mb-3 flex-grow">
        <div className="h-4 w-full bg-gray-500 rounded"></div>
      </div>

      <div className="h-4 w-24 bg-gray-500 rounded mt-2"></div>
    </div>
  </div>
);
export default SkeletonHighlight;
