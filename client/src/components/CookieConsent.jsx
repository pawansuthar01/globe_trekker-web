import React, { useState, useEffect } from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";

const CookieConsentBanner = () => {
  const [showSettings, setShowSettings] = useState(false);

  const loadGoogleAnalytics = () => {
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-6XCRD0TSGY";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-6XCRD0TSGY");
    };
  };

  const handleAccept = () => {
    Cookies.set("analytics", "true");
    Cookies.set("ads", "true");
    loadGoogleAnalytics(); // Load GA when accepted
  };

  const handleDecline = () => {
    Cookies.set("analytics", "false");
    Cookies.set("ads", "false");
  };

  const handleSaveSettings = (analytics, ads) => {
    Cookies.set("analytics", String(analytics));
    Cookies.set("ads", String(ads));
    setShowSettings(false);

    // Load GA only if analytics consent is given
    if (analytics) {
      loadGoogleAnalytics();
    }
  };

  useEffect(() => {
    const isAnalyticsAllowed = Cookies.get("analytics") === "true";
    if (isAnalyticsAllowed) {
      loadGoogleAnalytics(); // Load GA if already accepted
    }
  }, []);

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Accept All"
        containerClasses="!fixed !bottom-20 md:!bottom-0 !left-0 !right-0 z-50"
        declineButtonText="Decline"
        enableDeclineButton
        onAccept={handleAccept}
        onDecline={handleDecline}
        cookieName="site_cookie_consent"
        style={{
          background: "#2B373B",
          bottom: "20px",
          position: "fixed",
          left: "0px",
          right: "0px",
          zIndex: "9999",
        }}
        buttonStyle={{
          background: "#14b8a6",
          color: "#fff",
          fontSize: "13px",
        }}
        declineButtonStyle={{
          background: "#f43f5e",
          color: "#fff",
          fontSize: "13px",
        }}
      >
        We use cookies to enhance your experience, analyze traffic, and serve
        personalized ads.{" "}
        <button
          onClick={() => setShowSettings(true)}
          className="ml-4 underline text-blue-300"
        >
          Cookie Settings
        </button>
      </CookieConsent>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-6 rounded shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Cookie Settings</h2>
            <p className="mb-2">Select which cookies you allow:</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const analytics = e.currentTarget.analytics.checked;
                const ads = e.currentTarget.ads.checked;
                handleSaveSettings(analytics, ads);
              }}
            >
              <div className="mb-2">
                <label>
                  <input type="checkbox" name="analytics" defaultChecked />{" "}
                  Analytics Cookies
                </label>
              </div>
              <div className="mb-4">
                <label>
                  <input type="checkbox" name="ads" defaultChecked />{" "}
                  Advertising Cookies
                </label>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-1 rounded bg-gray-300 dark:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 rounded bg-emerald-600 text-white"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsentBanner;
