import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Calendar, Clock, User, Heart, Share2 } from "lucide-react";

const StoryDetailPage = () => {
  const { id } = useParams();
  const DataStory = useLocation().state?.story;
  const [story, setStory] = useState(DataStory);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (DataStory) {
      // Simulated API call - replace with actual API integration
      const fetchStory = async () => {
        try {
          //   const response = await fetch(`/api/stories/${id}`);
          //   const data = await response.json();
          //   setStory(data);
        } catch (error) {
          console.error("Error fetching story:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchStory();
    } else {
      setLoading(false);

      setStory(DataStory);
    }
  }, [id]);

  if (story == null || loading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-1/3 mb-8"></div>
            <div className="aspect-video bg-neutral-200 rounded-lg mb-8"></div>
            <div className="h-4 bg-neutral-200 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-neutral-200 rounded w-1/2 mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-4 text-neutral-600 mb-6">
            <span className="bg-accent-500 text-white text-sm font-medium px-3 py-1 rounded-full">
              {story.category}
            </span>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                {new Date(story.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{story.readTime}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            {story.title}
          </h1>

          <div className="flex items-center gap-4">
            <img
              src={story.author.avatar}
              alt={story.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-medium text-neutral-900">
                {story.author.name}
              </div>
              <div className="text-sm text-neutral-600">{story.author.bio}</div>
            </div>
          </div>
        </header>

        {/* Cover image */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative aspect-[2/1] rounded-lg overflow-hidden">
            <img
              src={story.coverImage.url}
              alt={story.coverImage.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Sidebar */}
          <div className="lg:col-span-2 lg:order-1">
            <div className="sticky top-24 space-y-4">
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Heart className="h-5 w-5" />
                <span className="sr-only md:not-sr-only">Save</span>
              </button>
              <button className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 p-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Share2 className="h-5 w-5" />
                <span className="sr-only md:not-sr-only">Share</span>
              </button>
            </div>
          </div>

          {/* Main content */}
          <article className="lg:col-span-8 prose prose-lg max-w-none">
            <p className="text-xl text-neutral-600 mb-8">{story.excerpt}</p>
            {story.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-neutral-700 mb-6">
                {paragraph}
              </p>
            ))}
          </article>

          {/* Tags sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {story.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/tags/${tag}`}
                    className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Image gallery */}
        <div className="max-w-5xl mx-auto mt-12">
          <h2 className="text-2xl font-semibold mb-6">Photo Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {story.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden"
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 text-sm">
                  {image.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailPage;
