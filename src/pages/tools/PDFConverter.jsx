import React, { useState } from "react";
import axios from 'axios';

const PDFConverter = () => {
    const [emailContent, setEmailContent] = useState("");
    const [contentType, setContentType] = useState("text");
    const [htmlPreview, setHtmlPreview] = useState("");
    const [library, setLibrary] = useState("puppeteer"); // New state for library selection
    const fileInput = React.createRef();
    const [isSending, setIsSending] = useState(false);

    const handleEmailContentChange = (e) => {
        setEmailContent(e.target.value);
        setHtmlPreview(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "text/html") {
            const reader = new FileReader();
            reader.onload = () => {
                setEmailContent(reader.result);
                setHtmlPreview(reader.result);
            };
            reader.readAsText(file);
        } else {
            alert("Please select a valid HTML file.");
        }
    };

    const handleSendEmail = async () => {
        setIsSending(true);
        const formData = new FormData();

        if (contentType === "text") {
            formData.append('htmlContent', emailContent);
        } else if (contentType === "file" && fileInput.current.files[0]) {
            formData.append('file', fileInput.current.files[0]);
        }

        formData.append('library', library); // Append the selected library to the payload

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/convert-html-to-pdf`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data.pdfUrl);
            window.open(response.data.pdfUrl);
        } catch (error) {
            console.error('Error sending emails:', error.response?.data || error.message);
            alert('An error occurred while sending emails.');
        } finally {
            setIsSending(false);
        }
    };

    const handleContentTypeChange = (e) => {
        setContentType(e.target.value);
        setEmailContent("");
        setHtmlPreview("");
    };

    const handleLibraryChange = (e) => {
        setLibrary(e.target.value);
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg border-t-4 border-indigo-600 ">
            <h1 className="text-4xl font-bold text-indigo-900 text-center mb-8">HTML to PDF Converter</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-medium text-gray-800">Select Content Type</h2>
                        <div className="flex items-center mt-2 space-x-4">
                            <label className="flex items-center text-gray-700">
                                <input
                                    type="radio"
                                    value="text"
                                    checked={contentType === "text"}
                                    onChange={handleContentTypeChange}
                                    className="mr-2"
                                />
                                Text
                            </label>
                            <label className="flex items-center text-gray-700">
                                <input
                                    type="radio"
                                    value="file"
                                    checked={contentType === "file"}
                                    onChange={handleContentTypeChange}
                                    className="mr-2"
                                />
                                HTML File
                            </label>
                        </div>
                    </div>

                    {contentType === "text" ? (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                HTML Content
                            </label>
                            <textarea
                                value={emailContent}
                                onChange={handleEmailContentChange}
                                placeholder="Enter your HTML content here..."
                                rows="8"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                            />
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload HTML File
                            </label>
                            <input
                                ref={fileInput}
                                type="file"
                                accept="text/html"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    )}

                    <div>
                        <h2 className="text-lg font-medium text-gray-800">Select Library</h2>
                        <div className="flex items-center mt-2 space-x-4">
                            <label className="flex items-center text-gray-700">
                                <input
                                    type="radio"
                                    value="puppeteer"
                                    checked={library === "puppeteer"}
                                    onChange={handleLibraryChange}
                                    className="mr-2"
                                />
                                Puppeteer
                            </label>
                            <label className="flex items-center text-gray-700">
                                <input
                                    type="radio"
                                    value="html-pdf"
                                    checked={library === "html-pdf"}
                                    onChange={handleLibraryChange}
                                    className="mr-2"
                                />
                                HTML-PDF
                            </label>
                        </div>
                    </div>
                </div>

                {/* Preview Section */}
                <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">HTML Preview</h2>
                    <div
                        className="border border-gray-300 rounded-lg shadow-sm p-4 bg-gray-50 overflow-auto"
                        dangerouslySetInnerHTML={{ __html: htmlPreview }}
                    />
                </div>
            </div>

            <div className="text-center mt-8">
                <button
                    onClick={handleSendEmail}
                    disabled={isSending}
                    className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md focus:outline-none ${
                        isSending
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500"
                    }`}
                >
                    {isSending ? "Processing..." : "Convert to PDF"}
                </button>
            </div>
        </div>
    );
};

export default PDFConverter;
