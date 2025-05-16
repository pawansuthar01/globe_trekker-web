import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Calendar, MapPin, Star, Clock, Heart } from "lucide-react";
import ImageWithLoaderPercentage from "../../components/Skeleton/imageLoder";
import { useDispatch } from "react-redux";
import { fetchDestinationById } from "../../Redux/Slice/detinationSlice";
import ImageCarousel from "../../components/images";

const DestinationDetailPage = () => {
  const { id } = useParams();
  const DataDestination = useLocation().state?.destination;
  const dispatch = useDispatch();
  const [destination, setDestination] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!DataDestination) {
      const fetchDestination = async () => {
        try {
          const res = await dispatch(fetchDestinationById(id));

          if (res?.payload?.success) {
            setDestination(res?.payload.data);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching destination:", error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };
      fetchDestination();
    } else {
      setDestination(DataDestination);

      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-1/3 mb-8"></div>
            <div className="aspect-video bg-neutral-200 rounded-lg mb-8"></div>
            <div className="h-4 bg-neutral-200 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-neutral-200 rounded w-1/2 mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {destination && (
        <div className="min-h-screen ">
          <div className="container mx-auto px-4 py-8">
            {/* Top Ad Space */}
            {/* <div className="mb-8 p-4 bg-gray-100 rounded-lg text-center">
            <div className="h-[90px] flex items-center justify-center text-gray-400">
              Advertisement Space (728x90)
            </div>
          </div> */}

            {/* Header */}
            <header className="mb-8 animate-fade-in">
              <p className="text-sm font-medium text-gray-500">
                Posted on:{" "}
                <span className="text-blue-500">
                  {new Date(destination.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4 leading-tight">
                {destination.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center bg-white/80 backdrop-blur-sm shadow-sm px-3 py-1.5 rounded-full">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="font-medium">
                    {destination.location.country},{" "}
                    {destination.location.region}
                  </span>
                </div>

                <div className="flex items-center bg-white/80 backdrop-blur-sm shadow-sm px-3 py-1.5 rounded-full">
                  <Star className="h-5 w-5 mr-2 text-amber-500 fill-amber-500" />
                  <span>
                    <span className="font-medium">
                      {destination.rating.value}
                    </span>{" "}
                    ({destination.rating.count} reviews)
                  </span>
                </div>
              </div>
            </header>
            <ImageCarousel images={destination.images} />

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* About Section */}
                <section className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md border border-gray-100 mb-8">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex flex-wrap gap-2">
                      {destination.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                      About
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {destination.description}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {destination.longDescription}
                    </p>
                  </div>
                </section>

                {/* Travel Tips Section */}
                <section className="bg-white rounded-xl shadow-sm p-6 mb-8 transition-all hover:shadow-md border border-gray-100">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    Travel Tips
                  </h2>
                  <div className="grid gap-4">
                    {destination.travelTips.map((tip, index) => (
                      <div
                        key={index}
                        className="flex items-start group p-4 rounded-lg hover:bg-gray-50"
                      >
                        <span className="inline-flex h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex-shrink-0 items-center justify-center mr-4 transition-all group-hover:bg-blue-600 group-hover:text-white font-medium">
                          {index + 1}
                        </span>
                        <p className="text-gray-600 leading-relaxed pt-1">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Itinerary Section */}
                <section className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md border border-gray-100">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    Detailed Itinerary
                  </h2>
                  <div className="space-y-8">
                    {destination.itinerary.map((day) => (
                      <div
                        key={day._id}
                        className="relative pl-8 pb-8 last:pb-0"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-blue-200" />
                        <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white" />

                        <h3 className="text-xl font-semibold text-blue-600 mb-4">
                          Day {day.day}: {day.title}
                        </h3>

                        <ul className="space-y-3">
                          {day.activities.map((activity, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-gray-600"
                            >
                              <span className="inline-flex h-6 w-6 bg-blue-100 text-blue-600 rounded-full items-center justify-center text-sm flex-shrink-0">
                                {idx + 1}
                              </span>
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Bottom Ad Space */}
                {/* <div className="mt-8 p-4 bg-gray-100 rounded-lg text-center">
                <div className="h-[250px] flex items-center justify-center text-gray-400">
                  Advertisement Space (728x250)
                </div>
              </div> */}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  {/* Sidebar Ad Space */}
                  {/* <div className="mb-8 p-4 bg-gray-100 rounded-lg text-center">
                  <div className="h-[600px] flex items-center justify-center text-gray-400">
                    Advertisement Space (300x600)
                  </div>
                </div> */}
                  {/* Quick Info */}
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">Quick Info</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <div className="font-medium">Best Time to Visit</div>
                          <div className="text-gray-600">
                            {destination.bestTimeToVisit}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <div className="font-medium">Suggested Duration</div>
                          <div className="text-gray-600">
                            {destination.SuggestedDuration}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Popular For Section */}
                  <section className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">Popular For</h2>
                    <div className="flex flex-wrap gap-2">
                      {destination.popularFor.map((item, index) => (
                        <span
                          key={index}
                          className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </section>
                  {/* Action Button */}
                  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all hover:shadow-lg flex items-center justify-center gap-2">
                      <Heart className="h-5 w-5" />
                      Save to Favorites
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!loading && !destination && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Destination not found
          </h2>
          <p className="text-gray-500 mb-6">
            The destination you're looking for doesn't exist or has been
            removed.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            Go Back
          </button>
        </div>
      )}
    </>
  );
};

export default DestinationDetailPage;
