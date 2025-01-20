import React, { useState, useEffect } from 'react';
import socketIO from 'socket.io-client';
import ScoreCard from '../components/ScoreCard.jsx';

const SitemapGenerator = () => {
    const [url, setUrl] = useState('');
    const [sitemapData, setSitemapData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [socketEventOn, setSocketEventOn] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null); // Store selected report for ScoreCard

    // Initialize socket connection once
    const socket = socketIO(import.meta.env.VITE_API_URL, { autoConnect: false });

    // Use effect to handle socket events
    useEffect(() => {
        if (socketEventOn) {
            socket.connect();
            console.log("Socket connected:", socket.connected, loading);
            socket.emit('fetchSitemap', { url });
            socket.on('sitemapUrls', (data) => {
                console.log(data)
                setSitemapData(data);
            });

            socket.on('updateTitle', ({ loc, title }) => {
                setSitemapData((prevData) =>
                    prevData.map((item) =>
                        item.loc === loc ? { ...item, title } : item
                    )
                );
            });

            socket.on('updatePageSpeed', ({ loc, pageSpeed }) => {
               
                setSitemapData((prevData) =>
                    prevData.map((item) =>
                        item.loc === loc ? { ...item, pageSpeed } : item
                    )
                );
                console.log(sitemapData, "SITEMPA")
            });

            socket.on('complete', (data) => {
                setLoading(false);
                setSitemapData(data);
            });
        }

        // Cleanup socket on component unmount
        return () => {
            socket.disconnect();
        };

    }, [socketEventOn]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSitemapData([]);
        setSocketEventOn(true);

        socket.on('error', (error) => {
            console.log(error);
            setError("Error fetching sitemap");
            setLoading(false);
        });
    };

    const generateNewReport = (e) => {
        event.preventDefault();
        socket.connect();
        socket.emit('fetchPageSpeedReport', { url });
        socket.on('reportData', ({ loc, pageSpeed }) => {
            console.log(loc, "LOC")
            setSitemapData((prevData) =>
                prevData.map((item) =>
                    item.loc === loc ? { ...item, pageSpeed } : item
                )
            );
        });
    }

    const handleViewReport = (reportData) => {
        setSelectedReport(reportData); // Set the selected report to open in ScoreCard
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white py-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-2xl font-bold">Sitemap Generator Tool</h1>
                </div>
            </header>
            <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-8 max-h-fit">
                    <h2 className="text-lg font-bold mb-6 text-gray-700">Generate Sitemap</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                                Website URL
                            </label>
                            <input
                                type="text"
                                id="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter website URL"
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
                                }`}
                            disabled={loading}
                        >
                            {loading ? 'Generating...' : 'Generate Sitemap'}
                        </button>
                    </form>

                    {error && <p className="mt-4 text-red-500">{error}</p>}
                </div>

                {sitemapData.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-gray-700">Sitemap Results</h2>
                        <div className="grid gap-4">
                            {sitemapData.map(({ loc, last_modified, title, pageSpeed }, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-md relative">
                                    <h3 className="text-blue-600 text-lg font-semibold">
                                        <a href={loc} target="_blank" rel="noopener noreferrer">
                                            {title || 'No Title'}
                                        </a>
                                    </h3>
                                    <p className="text-gray-500 text-sm">Last Modified: {last_modified || 'Unknown'}</p>
                                    <p className="text-gray-500 text-sm">URL: {loc}</p>

                                    {/* View Report Button */}

                                    <button
                                        disabled={!pageSpeed}
                                        onClick={() => handleViewReport({ loc, pageSpeed })}
                                        className="mt-4 bg-blue-600 text-white py-1 px-4 rounded-md text-sm absolute top-0 right-2 disabled:bg-gray-400"
                                    >
                                        View Pagespeed Insight Report
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ScoreCard Modal */}
            {selectedReport && (
                <ScoreCard
                    data={selectedReport}
                    open={Boolean(selectedReport)}
                    onClose={() => setSelectedReport(null)} // Close ScoreCard
                />
            )}
        </div>
    );
};

export default SitemapGenerator;