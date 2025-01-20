import React from "react";
const IFrameComponent = ({ url, title, description }) => {
  return (
    <section className="">
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
    <div className="p-8 my-20  container mx-auto">
      <div className="flex flex-wrap md:flex-nowrap gap-8">
        {/* Text Section */}
        <div className="w-full md:w-2/3 self-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Featured Project: <span className="text-blue-600">Content Locker</span>
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Content Locker simplifies content management with its headless CMS approach. Manage, integrate, and enhance your content workflow seamlessly. Empower your team to focus on creativity while ensuring an efficient content delivery pipeline.
          </p>
          <div className="mb-6">
            <a
              href="https://webmanager-client.vercel.app/landing-page"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
            >
              Visit Content Locker
            </a>
          </div>
        </div>

        {/* IFrame Section */}
        <div className="w-full md:w-full">
          <div className="aspect-w-16 aspect-h-9">
            <IFrameComponent
              url="https://webmanager-client.vercel.app/landing-page"
              title="Content Locker - Your Content, Your Way"
              description="Content-Locker simplifies content management with its headless CMS approach. Manage, integrate, and enhance your content workflow seamlessly."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightProject;

