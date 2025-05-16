import React from "react";

const CookiePolicy = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-md shadow-md mt-10 mb-20 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Cookie Policy</h1>

      <p className="mb-6 text-gray-700">
        At <span className="font-semibold">Globe Trekker</span>, we use cookies
        to enhance your experience while using our website. This Cookie Policy
        explains what cookies are, how we use them, and your choices regarding
        cookies.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        1. What Are Cookies?
      </h2>
      <p className="mb-6 text-gray-700">
        Cookies are small text files stored on your device (computer,
        smartphone, etc.) by your web browser. They help websites recognize your
        device and remember your preferences or actions over time.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        2. Types of Cookies We Use
      </h2>
      <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
        <li>
          <strong>Essential Cookies:</strong> These cookies are necessary for
          the website to function properly, such as maintaining your login
          session or saving items in your cart.
        </li>
        <li>
          <strong>Performance Cookies:</strong> These cookies collect anonymous
          data on how visitors use the site, helping us improve website
          performance and user experience.
        </li>
        <li>
          <strong>Functionality Cookies:</strong> These remember your
          preferences like language, region, or font size to provide a more
          personalized experience.
        </li>
        <li>
          <strong>Advertising and Targeting Cookies:</strong> These track your
          browsing habits to deliver relevant ads and measure the effectiveness
          of marketing campaigns.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        3. How We Use Cookies
      </h2>
      <p className="mb-6 text-gray-700">We use cookies to:</p>
      <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
        <li>Remember your login details and preferences.</li>
        <li>Analyze website traffic and improve functionality.</li>
        <li>Deliver personalized content and advertisements.</li>
        <li>Ensure security and prevent fraudulent activities.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        4. Third-Party Cookies
      </h2>
      <p className="mb-6 text-gray-700">
        We may allow third-party service providers like Google Analytics and
        advertising partners to set cookies on your device. These cookies are
        subject to the privacy policies of those third parties.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        5. Your Cookie Choices
      </h2>
      <p className="mb-6 text-gray-700">
        Most browsers automatically accept cookies, but you can usually modify
        your browser settings to decline cookies if you prefer. Please note that
        disabling cookies may affect the functionality and your experience on
        our website.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        6. Updates to This Cookie Policy
      </h2>
      <p className="mb-6 text-gray-700">
        We may update this Cookie Policy from time to time. Any changes will be
        posted on this page with an updated revision date.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        7. Contact Us
      </h2>
      <p className="mb-6 text-gray-700">
        If you have any questions or concerns about our Cookie Policy, please
        contact us at{" "}
        <a
          href="mailto:paw.kum.2111@gmail.com"
          className="text-blue-600 underline"
        >
          paw.kum.2111@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

export default CookiePolicy;
