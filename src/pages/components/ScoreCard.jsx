import React from 'react';

const ScoreCard = ({ data, open, onClose }) => {
    if (!data) return null;
    const { url, fetchTime, scores, diagnostics, fullPageScreenshot } = data.pageSpeed;

    return (
        <div
            className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 ${open ? 'block' : 'hidden'}`}
        >
            <div className="bg-white rounded-2xl shadow-xl w-[80%] sm:w-[600px] p-8 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl bg-transparent border-2 border-gray-500 rounded-full w-8 h-8 flex justify-center items-center  focus:outline-none transition-all duration-300"
                >
                    <span className="text-xl font-bold">&times;</span>
                </button>

                {/* Card Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">URL: <a href={url}>{url}</a></h2>
                    <p className="text-gray-600 text-sm mt-1">Fetched on: {fetchTime}</p>
                </div>

                {/* Full Page Screenshot */}
                <div className="mb-6 w-full">
                    <div className="relative w-full h-72 overflow-hidden rounded-lg shadow-md">
                        <img
                            src={fullPageScreenshot}
                            alt="Page Screenshot"
                            className="w-full h-full object-cover transition-transform transform hover:scale-105"
                        />
                    </div>
                </div>

                {/* Scores */}
                <div className="mb-6 grid grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-800">Accessibility</h3>
                        <p className="text-xl font-semibold text-green-600">{scores?.accessibility}%</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-800">Performance</h3>
                        <p className="text-xl font-semibold text-yellow-500">{scores?.performance}%</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-800">Best Practices</h3>
                        <p className="text-xl font-semibold text-blue-500">{scores?.bestPractices}%</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-800">SEO</h3>
                        <p className="text-xl font-semibold text-red-500">{scores?.seo}%</p>
                    </div>
                </div>

                {/* Diagnostics */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Diagnostics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">First Contentful Paint: <span className="font-semibold">{diagnostics?.firstContentfulPaint}</span></p>
                        </div>
                        <div>
                            <p className="text-gray-600">Speed Index: <span className="font-semibold">{diagnostics?.speedIndex}</span></p>
                        </div>
                        <div>
                            <p className="text-gray-600">Largest Contentful Paint: <span className="font-semibold">{diagnostics?.largestContentfulPaint}</span></p>
                        </div>
                        <div>
                            <p className="text-gray-600">Interactive: <span className="font-semibold">{diagnostics?.interactive}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScoreCard;