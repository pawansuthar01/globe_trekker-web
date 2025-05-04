import React from "react";
import { Users, Globe, Award, Camera } from "lucide-react";
import image_bg from "../assets/about_page_image.jpg";

const values = [
  {
    id: 1,
    icon: <Globe className="h-7 w-7 text-primary-600" />,
    title: "Authentic Exploration",
    description:
      "We seek out genuine experiences that provide true insights into local cultures and environments.",
  },
  {
    id: 2,
    icon: <Users className="h-7 w-7 text-primary-600" />,
    title: "Community Connection",
    description:
      "We believe in fostering meaningful connections with local communities and fellow travelers.",
  },
  {
    id: 3,
    icon: <Award className="h-7 w-7 text-primary-600" />,
    title: "Sustainable Travel",
    description:
      "We advocate for responsible tourism that protects and preserves our planet's natural and cultural treasures.",
  },
  {
    id: 4,
    icon: <Camera className="h-7 w-7 text-primary-600" />,
    title: "Storytelling",
    description:
      "We share immersive stories that transport readers and inspire them to embark on their own adventures.",
  },
];

const team = [
  {
    id: 1,
    name: "Michael Chen",
    role: "Founder & Lead Explorer",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "After backpacking across 50 countries, Michael founded Globe Trekker to share his passion for off-the-beaten-path adventures.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Head of Content",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "A former travel journalist with a knack for discovering hidden gems in even the most visited destinations.",
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Photography Director",
    image:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "An award-winning photographer who captures the essence and spirit of destinations around the world.",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            About Globe Trekker
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            We're a community of passionate travelers sharing authentic
            experiences and hidden gems from around the world.
          </p>
        </header>

        {/* Mission */}
        <section className="mb-16 flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-neutral-700 mb-4">
              At Globe Trekker, we believe that travel is about more than just
              checking destinations off a list. It's about authentic
              connections, cultural understanding, and discovering the
              extraordinary in everyday places.
            </p>
            <p className="text-neutral-700 mb-4">
              Our mission is to inspire and empower travelers to venture beyond
              the typical tourist routes, to discover hidden wonders that aren't
              in the guidebooks, and to connect with local cultures in
              meaningful ways.
            </p>
            <p className="text-neutral-700">
              We're committed to promoting sustainable and responsible travel
              that respects local communities and preserves the natural beauty
              of our planet for future generations of adventurers.
            </p>
          </div>
          <div className="md:w-1/2 w-full">
            <img
              src={image_bg}
              alt="Globe Trekker Mission"
              className="rounded-lg shadow-lg w-full h-64"
            />
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <div
                key={val.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  {val.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{val.title}</h3>
                <p className="text-neutral-600">{val.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-neutral-500 text-sm mb-3">{member.role}</p>
                  <p className="text-neutral-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary-50 p-8 md:p-12 rounded-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="text-neutral-700 mb-6">
              Become part of a global network of passionate travelers. Share
              your stories, get insider tips, and connect with like-minded
              adventurers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/signup"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                Sign Up Now
              </a>
              <a
                href="/contact"
                className="border border-primary-600 text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-full font-medium transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
