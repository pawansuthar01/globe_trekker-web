import { Send, Camera, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeedback } from "../../Redux/Slice/feedbackSlice";
import { useEffect } from "react";

const FeedbackForm = () => {
  const { isLoggedIn, data } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [ratting, setRatting] = useState(5);
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData;
    if (isLoggedIn) {
      formData = {
        name: data?.fullName,
        email: data?.email,
        message,
        ratting,
        location,
      };
    } else {
      formData = { name, email, message, ratting, location };
    }
    setLoading(true);
    const res = await dispatch(addFeedback(formData));
    setLoading(false);
    if (res?.payload?.success) {
      setError("SuccessFully Submit Feedback...");
    } else {
      setError("someThing wont wrong try next time...");
    }

    setName("");
    setEmail("");
    setMessage("");
    setRatting(5);
    setLocation("");
  };

  const handleRatingClick = (newRating) => {
    setRatting(newRating);
  };
  useEffect(() => {
    if (!error) return;
    setInterval(() => {
      setError(null);
    }, 2000);
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-5">
      <div className="bg-gradient-to-r from-teal-500 to-green-600 p-6 text-white">
        <h2 className="text-3xl font-bold">Share Your Experience</h2>
        <p className="mt-2 text-teal-100">
          Your feedback helps future travelers make better decisions
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {!isLoggedIn && (
            <>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="john@example.com"
                />
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 ">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <MapPin className="inline-block mr-1" size={16} /> Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Yosemite National Park"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Rating
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                className="focus:outline-none"
              >
                {[...Array(1)].map((_, index) => (
                  <Star
                    key={index}
                    size={32}
                    className={`transition-all duration-300 ${
                      index < (ratting >= star ? 1 : 0)
                        ? "fill-current text-amber-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Experience
          </label>
          <textarea
            id="feedback"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Tell us about your experience with Treker..."
          />
        </div>

        <div className="flex justify-end">
          {error ? (
            <div className="bg-accent-500 text-white py-3 px-6 rounded-lg inline-block">
              {error}
            </div>
          ) : (
            <button
              disabled={loading}
              type="submit"
              className={`px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center ${
                !loading ? "cursor-pointer" : " cursor-not-allowed"
              }`}
            >
              <Send size={18} className="mr-2" />
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
