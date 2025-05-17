import React, { useState } from "react";
import image_bg from "../assets/about_page_image.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAbout } from "../Redux/Slice/aboutSlice";

const SkeletonBox = ({ className = "" }) => (
  <div className={`bg-gray-200 animate-pulse ${className}`} />
);
const AboutPage = () => {
  const { aboutData } = useSelector((state) => state?.about);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const loadData = async () => {
    setLoading(true);
    await dispatch(fetchAbout());
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="mb-12 text-center">
          {loading ? (
            <>
              <SkeletonBox className="h-8 w-2/3 mx-auto mb-4 rounded" />
              <SkeletonBox className="h-5 w-1/2 mx-auto rounded" />
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {aboutData?.title || "About Globe Trekker"}
              </h1>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                {aboutData?.intro ||
                  `We're a community of passionate travelers sharing authentic
            experiences and hidden gems from around the world.`}
              </p>
            </>
          )}
        </header>

        {/* Mission */}
        <section className="mb-16 flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <SkeletonBox key={i} className="h-4 w-full mb-3 rounded" />
                  ))
              : aboutData?.mission.map((p, i) => {
                  return (
                    <p className="text-neutral-700 mb-4" key={i}>
                      {p}
                    </p>
                  );
                })}
          </div>
          <div className="md:w-1/2 w-full">
            <img
              src={aboutData?.introImage || image_bg}
              alt="Globe Trekker Mission"
              className="rounded-lg shadow-lg w-full h-64"
            />
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="bg-white p-6 rounded-lg shadow-md animate-pulse"
                    >
                      <SkeletonBox className="w-14 h-14 rounded-full mb-4" />
                      <SkeletonBox className="h-4 w-2/3 mb-2 rounded" />
                      <SkeletonBox className="h-3 w-full rounded" />
                    </div>
                  ))
              : aboutData?.values.map((val) => (
                  <div
                    key={val._id}
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
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse"
                    >
                      <SkeletonBox className="w-full h-64" />
                      <div className="p-5">
                        <SkeletonBox className="h-4 w-1/2 mb-2 rounded" />
                        <SkeletonBox className="h-3 w-1/3 mb-3 rounded" />
                        <SkeletonBox className="h-3 w-full rounded" />
                      </div>
                    </div>
                  ))
              : aboutData?.team.map((member) => (
                  <div
                    key={member._id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-5">
                      <h3 className="text-lg font-semibold mb-1">
                        {member.name}
                      </h3>
                      <p className="text-neutral-500 text-sm mb-3">
                        {member.role}
                      </p>
                      <p className="text-neutral-600 text-sm">
                        {member.description}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary-50 p-8 md:p-12 rounded-2xl">
          <div className="max-w-3xl mx-auto text-center">
            {loading ? (
              <>
                <SkeletonBox className="h-5 w-1/2 mx-auto mb-4 rounded" />
                <SkeletonBox className="h-4 w-full mb-6 rounded" />
                <div className="flex flex-wrap justify-center gap-4">
                  <SkeletonBox className="h-10 w-32 rounded-full" />
                  <SkeletonBox className="h-10 w-32 rounded-full" />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  {" "}
                  {aboutData?.join?.title || ` Join Our Community`}
                </h2>
                <p className="text-neutral-700 mb-6">
                  {aboutData?.join?.description ||
                    ` Become part of a global network of passionate travelers. Share
              your stories, get insider tips, and connect with like-minded
              adventurers.`}
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
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
