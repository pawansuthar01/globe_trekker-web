import React, { useState } from "react";
import { Send } from "lucide-react";
import bg_image from "../../assets/about_page_image.jpg";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would connect to a backend API
    // For now, just simulate a successful subscription
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <section className="py-16 relative overflow-hidden lg:ml-2">
      <div
        className="absolute inset-0 z-0 bg-black opacity-70"
        style={{
          backgroundImage: `url(${bg_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Get Your Travel Inspiration Straight to Your Inbox
          </h2>
          <p className="text-accent-500 mb-8">
            Subscribe to our newsletter for exclusive travel tips, hidden gems,
            and special offers.
          </p>

          {isSubmitted ? (
            <div className="bg-accent-500 text-white py-3 px-6 rounded-lg inline-block">
              Thanks for subscribing! Check your inbox soon.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-3 rounded-lg text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button
                type="submit"
                className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                Subscribe
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}

          <p className="text-accent-100 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
