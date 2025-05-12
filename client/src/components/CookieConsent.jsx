import { useEffect, useState } from "react";
import { Cookies } from "react-cookie-consent";

const CustomCookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookieConsent", "true", { expires: 150 });
    setShowBanner(false);
    console.log("✅ Cookies accepted");

    // Optional: Load Google Ads/Analytics here
  };

  const handleDecline = () => {
    Cookies.set("cookieConsent", "false", { expires: 150 });
    setShowBanner(false);
    console.log("❌ Cookies declined");
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 w-full z-50 bg-gray-900 text-white p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300">
          We use cookies to improve your experience and show relevant ads. By
          accepting, you consent to our cookies.
        </p>
        <div className="flex gap-3 mt-2 md:mt-0">
          <button
            onClick={handleDecline}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomCookieBanner;
