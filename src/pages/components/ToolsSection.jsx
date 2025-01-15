import React from "react";
import { Link } from "react-router-dom";

const ToolsSection = () => {
    return (
        <section id="projects" className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                        Explore Tools
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Enhance your productivity with our innovative tools, designed for developers and creators.
                    </p>
                </div>
               

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Tool 1: Email Template Tester */}
                    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
                        <div className="flex items-center space-x-4">
                            <div className="bg-yellow-500 text-white p-4 rounded-lg">
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
                                        d="M16.5 10.5L21 6m0 0l-4.5-4.5M21 6v12.75A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V5.25A2.25 2.25 0 015.25 3H18.75a2.25 2.25 0 012.25 2.25V6z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">
                                Email Template Tester
                            </h3>
                        </div>
                        <p className="mt-4 text-gray-600">
                            Test your email templates by sending actual emails and preview them side by side.
                        </p>
                        <div className="mt-6 flex justify-between items-center">
                            <Link
                                to="/email-template-sender"
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

                    {/* Tool 2: HTML to PDF Viewer */}
                    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
                        <div className="flex items-center space-x-4">
                            <div className="bg-blue-500 text-white p-4 rounded-lg">
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
                                        d="M12 4.75v14.5m7.25-7.25h-14.5"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">
                                HTML to PDF Viewer
                            </h3>
                        </div>
                        <p className="mt-4 text-gray-600">
                            Convert HTML to a downloadable PDF and preview it in real-time.
                        </p>
                        <div className="mt-6 flex justify-between items-center">
                            <Link
                                to="/html-to-pdf-converter"
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
                </div>
            </div>
        </section>
    );
};

export default ToolsSection;
