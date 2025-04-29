import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Calendar, MapPin, Star, Clock, Heart } from "lucide-react";

const DestinationDetailPage = () => {
  const { id } = useParams();
  const DataDestination = useLocation().state.destination;

  const [destination, setDestination] = useState(DataDestination);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call - replace with actual API integration
    if (!DataDestination) {
      const fetchDestination = async () => {
        try {
          //   const response = await fetch(`/api/destinations/${id}`);
          //   const data = await response.json();
          setLoading(false);
          //   setDestination(data);
        } catch (error) {
          console.error("Error fetching destination:", error);
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
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {destination.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-neutral-600">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-primary-600" />
              <span>
                {destination.location.country}, {destination.location.region}
              </span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-accent-500" />
              <span>
                {destination.rating.value} ({destination.rating.count} reviews)
              </span>
            </div>
          </div>
        </header>
        {/* Main image gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {destination.images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-lg overflow-hidden"
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 text-sm">
                {image.caption}
              </div>
            </div>
          ))}
        </div>
        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">About</h2>
              <p className="text-neutral-600 mb-6">{destination.description}</p>
              <p className="text-neutral-600">{destination.longDescription}</p>
            </section>

            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Travel Tips</h2>
              <ul className="space-y-3">
                {destination.travelTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex-shrink-0  items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    <span className="text-neutral-600">{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary-600 mr-3" />
                  <div>
                    <div className="font-medium">Best Time to Visit</div>
                    <div className="text-neutral-600">
                      {destination.bestTimeToVisit}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary-600 mr-3" />
                  <div>
                    <div className="font-medium">Suggested Duration</div>
                    <div className="text-neutral-600">4-7 days</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Heart className="h-5 w-5" />
                Save to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPage;
