const SkeletonBannerPage = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 lg:ml-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="md:w-1/2 lg:pr-8 animate-pulse">
            <div className="h-10 md:h-12 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-5 bg-gray-300 rounded w-full max-w-lg mb-2"></div>
            <div className="h-5 bg-gray-300 rounded w-5/6 max-w-lg mb-6"></div>
            <div className="flex flex-wrap gap-4">
              <div className="h-12 w-36 rounded-full bg-gray-300"></div>
              <div className="h-12 w-36 rounded-full bg-gray-200 border"></div>
            </div>
          </div>

          <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0 flex justify-center md:justify-end animate-pulse">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="h-60 bg-gray-300 rounded-lg w-full"></div>
              <div className="flex flex-col gap-4 w-full">
                <div className="h-48 bg-gray-300 rounded-lg w-full"></div>
                <div className="h-48 bg-gray-300 rounded-lg w-full"></div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg max-w-[200px]">
              <div className="h-4 w-24 bg-gray-300 mb-1 rounded"></div>
              <div className="h-3 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SkeletonBannerPage;
