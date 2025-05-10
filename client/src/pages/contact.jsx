import React, { useEffect, useState } from "react";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import { useDispatch } from "react-redux";
import { getWebContacts } from "../Redux/Slice/web_contactSlice";
import ContactSkeleton from "../components/Skeleton/contactSekeleton";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would connect to a backend API
    // For now, just simulate a successful submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 500);
  };
  const fetchContactData = async () => {
    setLoading(true);
    const res = await dispatch(getWebContacts());
    if (res?.payload?.success) {
      setContact(res?.payload?.data);
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchContactData();
  }, []);
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Contact Us
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Have questions, feedback, or want to share your travel experiences?
            We'd love to hear from you!
          </p>
        </header>
        {loading ? (
          <ContactSkeleton />
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-6">Get In Touch</h2>

                <div className="flex items-start mb-6">
                  <div className="bg-primary-100 p-2 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-800">
                      Our Location
                    </h3>
                    <p className="text-neutral-600 mt-1">
                      {contact?.location?.address}
                      <br />
                      {contact?.location?.city}, {contact?.location?.postalCode}
                      <br />
                      {contact?.location?.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start mb-6">
                  <div className="bg-primary-100 p-2 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-800">Email Us</h3>
                    <p className="text-neutral-600 mt-1">
                      {contact?.email1 || `paw.kum.2111@gmail.com`}
                      <br />
                      {contact?.email2 || `support@pawansuthar.in`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 p-2 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-800">Call Us</h3>
                    <p className="text-neutral-600 mt-1">
                      {contact?.phone || `+91 9784740736`}
                      <br />
                      {contact?.workingHours}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-6">Follow Us</h2>
                <div className="flex space-x-4">
                  {contact?.followLinks.map((f, i) => (
                    <a
                      key={i}
                      href={f.url}
                      className="bg-neutral-100 p-3 rounded-full hover:bg-primary-100 transition-colors"
                      aria-label={f.platform}
                    >
                      {f.platform === "x" ? (
                        <svg
                          className="h-5 w-5 text-neutral-700"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.62 6.23a5.75 5.75 0 0 1-1.7.47 2.94 2.94 0 0 0 1.29-1.62c-.57.34-1.2.59-1.87.72a2.92 2.92 0 0 0-5 2.66 8.29 8.29 0 0 1-6-3.09c-.25.44-.4.95-.4 1.5a2.93 2.93 0 0 0 1.3 2.44 2.9 2.9 0 0 1-1.32-.37v.04c0 1.42 1 2.6 2.33 2.87a2.95 2.95 0 0 1-1.32.05 2.93 2.93 0 0 0 2.73 2.04 5.86 5.86 0 0 1-3.64 1.26 5.87 5.87 0 0 1-.7-.04 8.25 8.25 0 0 0 4.5 1.33c5.4 0 8.34-4.5 8.34-8.4 0-.13 0-.26-.01-.38a5.94 5.94 0 0 0 1.47-1.53z" />
                        </svg>
                      ) : f.platform === "Facebook" ? (
                        <svg
                          className="h-5 w-5 text-neutral-700"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.04c-5.5 0-10 4.5-10 10.01 0 5 3.66 9.15 8.44 9.9v-7h-2.54v-2.9h2.54V9.85c0-2.51 1.5-3.91 3.77-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.27c-1.24 0-1.63.78-1.63 1.57v1.9h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.5-4.5-10-10-10z" />
                        </svg>
                      ) : f.platform === "Instagram" ? (
                        <svg
                          className="h-5 w-5 text-neutral-700"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2c-2.716 0-3.056.012-4.123.06-1.064.049-1.791.218-2.427.465a4.88 4.88 0 0 0-1.77 1.153A4.897 4.897 0 0 0 2.525 5.45c-.248.636-.416 1.363-.465 2.427C2.011 8.944 2 9.284 2 12s.011 3.056.06 4.123c.049 1.064.217 1.791.465 2.427a4.89 4.89 0 0 0 1.153 1.77 4.9 4.9 0 0 0 1.77 1.154c.636.248 1.363.416 2.427.465 1.067.048 1.407.06 4.123.06s3.056-.012 4.123-.06c1.064-.049 1.791-.217 2.427-.465a4.89 4.89 0 0 0 1.77-1.153 4.9 4.9 0 0 0 1.154-1.77c.248-.636.416-1.363.465-2.427.048-1.067.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.049-1.064-.217-1.791-.465-2.427a4.89 4.89 0 0 0-1.153-1.77 4.9 4.9 0 0 0-1.77-1.154c-.636-.248-1.363-.416-2.427-.465C15.056 2.012 14.716 2 12 2zm0 1.802c2.67 0 2.986.01 4.04.058.976.045 1.505.207 1.858.344.466.182.8.399 1.15.748.35.35.566.684.748 1.15.137.353.3.882.344 1.857.048 1.055.058 1.37.058 4.041 0 2.67-.01 2.986-.058 4.04-.045.976-.207 1.505-.344 1.858a3.09 3.09 0 0 1-.748 1.15c-.35.35-.684.566-1.15.748-.353.137-.882.3-1.857.344-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-.976-.045-1.505-.207-1.858-.344a3.098 3.098 0 0 1-1.15-.748 3.098 3.098 0 0 1-.748-1.15c-.137-.353-.3-.882-.344-1.857-.048-1.055-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.045-.976.207-1.505.344-1.858.182-.466.399-.8.748-1.15.35-.35.684-.566 1.15-.748.353-.137.882-.3 1.857-.344 1.055-.048 1.37-.058 4.041-.058zm0 3.063a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
                        </svg>
                      ) : f.platform === "youtube" ? (
                        <svg
                          className="h-5 w-5 text-neutral-700"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.55 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.55-4.385-8.816zM9 16V8l8 3.993L9 16z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6"
                        >
                          <path d="M17 8l4 4-4 4M7 16l-4-4 4-4M14 4h7v7" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="lg:w-2/3">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-lg mb-2">Thank You!</h3>
                <p>
                  Your message has been sent successfully. We'll get back to you
                  as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-neutral-700 font-medium mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-neutral-700 font-medium mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block text-neutral-700 font-medium mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="support">Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-neutral-700 font-medium mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
