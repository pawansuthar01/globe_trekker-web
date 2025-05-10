const ContactSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <div className="lg:w-1/3">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 animate-pulse">
          <h2 className="text-xl font-semibold mb-6 bg-gray-300 h-6 w-1/2 rounded"></h2>

          <div className="flex items-start mb-6">
            <div className="bg-primary-100 p-2 rounded-full mr-4 animate-pulse">
              <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-medium text-neutral-800 bg-gray-300 h-4 w-3/4 rounded"></h3>
              <p className="text-neutral-600 mt-1 bg-gray-200 h-4 w-3/4 rounded"></p>
              <p className="text-neutral-600 mt-1 bg-gray-200 h-4 w-3/4 rounded"></p>
            </div>
          </div>

          <div className="flex items-start mb-6">
            <div className="bg-primary-100 p-2 rounded-full mr-4 animate-pulse">
              <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-medium text-neutral-800 bg-gray-300 h-4 w-3/4 rounded"></h3>
              <p className="text-neutral-600 mt-1 bg-gray-200 h-4 w-3/4 rounded"></p>
              <p className="text-neutral-600 mt-1 bg-gray-200 h-4 w-3/4 rounded"></p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-primary-100 p-2 rounded-full mr-4 animate-pulse">
              <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-medium text-neutral-800 bg-gray-300 h-4 w-3/4 rounded"></h3>
              <p className="text-neutral-600 mt-1 bg-gray-200 h-4 w-3/4 rounded"></p>
              <p className="text-neutral-600 mt-1 bg-gray-200 h-4 w-3/4 rounded"></p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
          <h2 className="text-xl font-semibold mb-6 bg-gray-300 h-6 w-1/2 rounded"></h2>
          <div className="flex space-x-4">
            <div className="bg-neutral-100 p-3 rounded-full animate-pulse">
              <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            </div>
            <div className="bg-neutral-100 p-3 rounded-full animate-pulse">
              <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            </div>
            <div className="bg-neutral-100 p-3 rounded-full animate-pulse">
              <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSkeleton;
