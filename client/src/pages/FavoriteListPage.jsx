import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDestinationById } from "../Redux/Slice/detinationSlice";
import { fetchStoryById } from "../Redux/Slice/storiesSlice";
import ImageWithLoaderPercentage from "../components/Skeleton/imageLoder";
import { useNavigate } from "react-router-dom";

export default function SavedPage() {
  const dispatch = useDispatch();
  const { favoriteDestinations, favoriteStories } = useSelector(
    (state) => state?.auth || {}
  );
  const [activeTab, setActiveTab] = useState("destinations");

  const [destinationData, setDestinationData] = useState([]);
  const [storyData, setStoryData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [destinationLoaded, setDestinationLoaded] = useState(false);
  const [storyLoaded, setStoryLoaded] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      try {
        if (activeTab === "destinations" && !destinationLoaded) {
          const destinationResults = await Promise.all(
            favoriteDestinations.map(async (id) => {
              const result = await dispatch(fetchDestinationById(id));
              return result.payload?.data;
            })
          );
          setDestinationData(destinationResults);
          setDestinationLoaded(true);
        } else if (activeTab === "stories" && !storyLoaded) {
          const storyResults = await Promise.all(
            favoriteStories.map(async (id) => {
              const result = await dispatch(fetchStoryById(id));
              return result.payload?.data;
            })
          );

          setStoryData(storyResults);
          setStoryLoaded(true);
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
      setLoading(false);
    };

    loadFavorites();
  }, [activeTab, favoriteDestinations, favoriteStories]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
        Your Saved Items
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-full bg-gray-300 p-1">
          {["destinations", "stories"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 max-sm:text-sm text-md font-semibold rounded-full transition-all duration-300 ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading...</p>
      ) : (
        <div className=" items-stretch flex flex-wrap  justify-evenly gap-8">
          {activeTab === "destinations" ? (
            destinationData.length > 0 ? (
              destinationData.map((item) => (
                <DestinationCard key={item._id} item={item} />
              ))
            ) : (
              <EmptyMessage type="Destination" />
            )
          ) : storyData.length > 0 ? (
            storyData.map((item) => <StoryCard key={item._id} item={item} />)
          ) : (
            <EmptyMessage type="Story" />
          )}
        </div>
      )}
    </div>
  );
}

const DestinationCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(`/destinations/${item._id}`, {
          state: { item },
        })
      }
      className="  cursor-pointer bg-white rounded-xl md:max-w-[320px] shadow-md hover:shadow-xl transition-shadow overflow-hidden"
    >
      <ImageWithLoaderPercentage
        alt={item?.name}
        src={item?.thumbnail?.url}
        className={"h-48 w-full object-cover"}
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900">{item?.name}</h3>
        <p className="text-gray-600 mt-2 line-clamp-3">
          {item?.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

const StoryCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(`/stories/${item?._id}`, {
          state: { story: item },
        })
      }
      className="bg-white  cursor-pointer  rounded-xl md:max-w-[320px]  shadow-md hover:shadow-xl transition-shadow overflow-hidden"
    >
      <ImageWithLoaderPercentage
        alt={item?.title}
        src={item?.coverImage?.url}
        className={"h-48 w-full object-cover"}
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900">{item?.title}</h3>
        <p className="text-gray-600  max-sm:text-sm  mt-2 line-clamp-3">
          {item?.excerpt || "No description available."}
        </p>
      </div>
    </div>
  );
};

const EmptyMessage = ({ type }) => (
  <div className="col-span-full text-center py-20">
    <p className="text-2xl font-medium text-gray-400">
      No saved {type}s found.
    </p>
  </div>
);
