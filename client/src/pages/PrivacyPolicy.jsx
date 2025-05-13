import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <section className="mb-8">
        <p>
          This Privacy Policy outlines how we collect, use, and protect your
          personal information when you use our website or services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          1. Information We Collect
        </h2>
        <ul className="list-disc pl-6">
          <li>Personal Information (e.g., full name, email, phone number)</li>
          <li>Device and browser data</li>
          <li>Usage data and cookies for analytics and personalization</li>
          <li>Location data </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6">
          <li>To provide and improve our services</li>
          <li>To personalize content and user experience</li>
          <li>To show relevant advertisements</li>
          <li>To send emails or notifications (with your consent)</li>
          <li>To ensure website security and performance</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Google AdSense</h2>
        <p>
          We use Google AdSense to display advertisements. Google may use
          cookies and device identifiers to personalize ads based on your
          interests.
        </p>
        <p className="mt-2">
          You can manage your ad preferences or opt out of personalized
          advertising by visiting:{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            https://www.google.com/settings/ads
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Cookie Usage</h2>
        <p>Cookies help us:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Analyze website traffic and user behavior</li>
          <li>Remember user preferences and settings</li>
          <li>Display relevant advertisements</li>
        </ul>
        <p className="mt-2">
          You can control cookie settings through your browser or device
          preferences.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
        <p>
          If you are located in the European Economic Area (EEA) or California,
          you have the right to:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>Access, correct, or delete your personal data</li>
          <li>Request data portability</li>
          <li>Object to certain data uses, including marketing</li>
          <li>Withdraw consent at any time</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy,
          please contact us at:{" "}
          <a
            href="support@triphub.pawansuthar.in"
            className="text-blue-500 underline"
          >
            support@triphub.pawansuthar.in
          </a>
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
