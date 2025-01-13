import React from "react";
const IFrameComponent = ({ url, title, description }) => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        {/* Highlight Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 hover:shadow-2xl transition">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-500 text-white px-4 py-2 rounded-full">
                1
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          </div>
          <p className="mt-4 text-gray-600 text-lg">{description}</p>
          <div className="mt-6 flex justify-between items-center">
            <a
              href={url}
              className="text-indigo-600 font-semibold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Tool
            </a>
            <div className="text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-12xl">
        {/* IFrame Showcase */}
        <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 ">
          <iframe
            src={url}
            title={title}
            className="w-full"
            style={{ height: "400px", width: "100%" }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

const HighlightProject = () => {
  return (
    <div>
      <IFrameComponent
        url="https://webmanager-client.vercel.app/landing-page" // Replace with your tool's URL
        title="Content Locker - Your Content, Your Way"
        description="Content-Locker simplifies content management with its headless CMS approach. Manage, integrate, and enhance your content workflow seamlessly."
      />
    </div>
  );
};

export default HighlightProject;
