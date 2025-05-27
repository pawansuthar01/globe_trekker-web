import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className=" mx-auto p-8 rounded-md mt-10 mb-2 font-sans text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-bold mb-4 text-center">Privacy Policy</h1>
      <p className="mb-4 text-sm text-gray-500 text-center">
        Last updated: May 27, 2025
      </p>

      <p className="mb-4">
        This Privacy Policy describes our policies and procedures on the
        collection, use, and disclosure of your information when you use our
        service, and informs you about your privacy rights and how the law
        protects you.
      </p>

      <p className="mb-4">
        We use your personal data to provide and improve our services. By using
        our services, you agree to the collection and use of information in
        accordance with this Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Interpretation and Definitions
      </h2>
      <h3 className="text-xl font-medium mb-2">Interpretation</h3>
      <p className="mb-4">
        Words with capitalized initial letters have defined meanings under the
        following conditions. The definitions shall apply regardless of whether
        they appear in singular or plural form.
      </p>

      <h3 className="text-xl font-medium mb-2">Definitions</h3>
      <p className="mb-4">For the purposes of this Privacy Policy:</p>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>
          <strong>Account:</strong> A unique account created for you to access
          our Service.
        </li>
        <li>
          <strong>Affiliate:</strong> An entity under common control with a
          party.
        </li>
        <li>
          <strong>Company:</strong> Referred to as "the Company", "We", "Us", or
          "Our" in this policy. It refers to Globe Trekker.
        </li>
        <li>
          <strong>Cookies:</strong> Small files placed on your device to track
          and store data.
        </li>
        <li>
          <strong>Country:</strong> Refers to Rajasthan, India.
        </li>
        <li>
          <strong>Device:</strong> Any device that can access the service such
          as a computer or smartphone.
        </li>
        <li>
          <strong>Personal Data:</strong> Any information related to an
          identifiable individual.
        </li>
        <li>
          <strong>Service:</strong> Refers to the Globe Trekker website.
        </li>
        <li>
          <strong>Service Provider:</strong> Any third-party who processes data
          on behalf of the company.
        </li>
        <li>
          <strong>Usage Data:</strong> Data collected automatically when using
          the service.
        </li>
        <li>
          <strong>Website:</strong> Globe Trekker, accessible from
          https://globetrekker.site
        </li>
        <li>
          <strong>You:</strong> The individual using the service.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Collecting and Using Your Personal Data
      </h2>
      <h3 className="text-xl font-medium mb-2">Types of Data Collected</h3>

      <h4 className="text-lg font-semibold mb-2">Personal Data</h4>
      <p className="mb-4">
        While using our service, we may ask you to provide certain personally
        identifiable information including:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>Email address</li>
        <li>First and last name</li>
        <li>Usage Data</li>
      </ul>

      <h4 className="text-lg font-semibold mb-2">Usage Data</h4>
      <p className="mb-4">
        Usage Data may include IP address, browser type/version, pages visited,
        time/date of visit, time spent on pages, device identifiers and
        diagnostics data.
      </p>
      <p className="mb-4">
        When using a mobile device, additional data such as device type, OS,
        mobile IP, browser, and unique identifiers may be collected
        automatically.
      </p>

      <h4 className="text-lg font-semibold mb-2">
        Tracking Technologies and Cookies
      </h4>
      <p className="mb-4">
        We use Cookies and tracking technologies like beacons, tags, and scripts
        to enhance service experience and analysis. You may disable cookies via
        browser settings.
      </p>

      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>
          <strong>Session Cookies:</strong> Essential for service functionality
          and expire when you close your browser.
        </li>
        <li>
          <strong>Persistent Cookies:</strong> Remain on your device to remember
          settings and login info.
        </li>
        <li>
          <strong>Web Beacons:</strong> Help track user engagement and ensure
          system integrity.
        </li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Use of Your Personal Data</h3>
      <p className="mb-4">We may use personal data to:</p>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>Provide and maintain the service</li>
        <li>Manage your account</li>
        <li>Process transactions and contracts</li>
        <li>Contact you via email or notifications</li>
        <li>Send offers, updates, and promotional content</li>
        <li>Respond to inquiries and support requests</li>
        <li>Analyze usage trends and improve service quality</li>
        <li>Comply with legal obligations</li>
      </ul>

      <p className="mt-10 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} Globe Trekker. All rights reserved.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
