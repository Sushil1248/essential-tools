import { CodeBracketIcon, DocumentTextIcon, InboxIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const ToolsSection = () => {
const tools = [
    {
        title: "Email Template Tester",
        description:
            "Test your email templates by sending actual emails and preview them side by side.",
        link: "/email-template-sender",
        icon: <InboxIcon className="w-6 h-6 text-white" />,
    },
    {
        title: "HTML to PDF Viewer",
        description:
            "Convert HTML to a downloadable PDF and preview it in real-time using PDF libraries like puppeteer and HTML-to-PDF.",
        link: "/html-to-pdf-converter",
        icon: <DocumentTextIcon className="w-6 h-6 text-white" />,
    },
    {
        title: "JSON Visualizer",
        description:
            "Convert JSON data into a visual tree structure for better understanding and debugging.",
        link: "/json-converter",
        icon: <CodeBracketIcon className="w-6 h-6 text-white" />,
    },
    {
        title: "Site Map Generator",
        description: "Generate a sitemap for your website to improve SEO and navigation.",
        link: "/site-map-generator",
        icon: <MagnifyingGlassIcon className="w-6 h-6 text-white" />,
    },
    // Add more tools here if needed
];

  return (
    <section id="projects" className="bg-gray-50 py-16">
      <div className="max-w-full mx-auto px-6 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Explore Tools
          </h2>
          <p className="mt-4 text-gray-600">
            Enhance your productivity with our innovative tools, designed for developers and creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-500 text-white p-4 rounded-lg">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{tool.title}</h3>
              </div>
              <p className="mt-4 text-gray-600">{tool.description}</p>
              <div className="mt-6 flex justify-between items-center">
                <Link
                  to={tool.link}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Try Now
                </Link>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
