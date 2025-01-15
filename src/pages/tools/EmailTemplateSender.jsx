import React, { useState } from "react";
import axios from 'axios';

const EmailTemplateSender = () => {
    const [emails, setEmails] = useState([{ email: "" }]); // Repeater for emails
    const [emailContent, setEmailContent] = useState(""); // Content from textarea
    const [contentType, setContentType] = useState("text"); // Text or file
    const [htmlPreview, setHtmlPreview] = useState(""); // HTML preview
    const fileInput = React.createRef(); // 
    const [isSending, setIsSending] = useState(false); // Loading state

    const handleEmailChange = (index, value) => {
        const updatedEmails = [...emails];
        updatedEmails[index].email = value;
        setEmails(updatedEmails);
    };

    const handleAddEmail = () => {
        setEmails([...emails, { email: "" }]);
    };

    const handleRemoveEmail = (index) => {
        const updatedEmails = emails.filter((_, i) => i !== index);
        setEmails(updatedEmails);
    };

    const handleEmailContentChange = (e) => {
        setEmailContent(e.target.value);
        setHtmlPreview(e.target.value); // Update the preview when textarea content changes
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "text/html") {
            const reader = new FileReader();
            reader.onload = () => {
                setEmailContent(reader.result);
                setHtmlPreview(reader.result); // Update preview with the file content
            };
            reader.readAsText(file);
        } else {
            alert("Please select a valid HTML file.");
        }
    };

    const generatePdf = async () => {
        const formData = new FormData();
        formData.append('htmlContent', '<h1>Hello, World!</h1>');
        formData.append('library', 'puppeteer'); // Optional
    
        try {
            const response = await axios.post('http://localhost:3000/convert-html-to-pdf', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'arraybuffer', // Ensure binary response
            });
    
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            console.log(pdfUrl, "PDF ")
            window.open(pdfUrl, '_blank');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    const handleSendEmail = async () => {
        setIsSending(true);
        const toEmails = emails.map(email => email.email); // Assuming `emails` is an array of email objects
        const formData = new FormData();
    
        formData.append('toEmails', JSON.stringify(toEmails));
    
        if (contentType === "text") {
            formData.append('htmlContent', emailContent);
        } else if (contentType === "file" && fileInput.current.files[0]) {
            formData.append('file', fileInput.current.files[0]);
        }
        // formData.append('library', 'html-pdf'); // Optional

    
        try {
            const response = await axios.post('http://localhost:3000/convert-html-to-pdf', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            window.open(response.data.pdfUrl); // Open the PDF in a new tab
        } catch (error) {
            console.error('Error sending emails:', error.response?.data || error.message);
            alert('An error occurred while sending emails.');
            setIsSending(false);
        }
    };

    const handleContentTypeChange = (e) => {
        setContentType(e.target.value);
        setEmailContent(""); // Clear content when switching content type
        setHtmlPreview(""); // Clear preview when switching content type
    };

    return (
        <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg border-t-8 border-indigo-600 max-w-4xl">
            <h2 className="text-3xl font-semibold text-indigo-900 mb-8 text-center ">Email Template Sender</h2>

            <div className="">
                {/* Left Side - Email Repeater & Content Type Selection */}
                <div className="space-y-8 bg-indigo-200 px-4 py-4 rounded-md">
                    {/* Email Repeater */}
                    <div>
                        <label className="block text-indigo-800 text-lg font-bold mb-2">Recipient Emails</label>
                        {emails.map((email, index) => (
                            <div className="flex items-center space-x-4 mb-4" key={index}>
                                <input
                                    type="email"
                                    value={email.email}
                                    onChange={(e) => handleEmailChange(index, e.target.value)}
                                    placeholder="Enter email address"
                                    className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                                {emails.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveEmail(index)}
                                        className="text-red-500 hover:text-red-700 text-xl"
                                    >
                                        &#10005;
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddEmail}
                            className="text-indigo-800 font-medium hover:underline text-lg text-left w-full"
                        >
                             + Add Another Email
                        </button>
                    </div>

                    {/* Content Type Selection */}
                    <div>
                        <label className="block text-indigo-800  text-lg font-bold mb-2">Content Type</label>
                        <div className="flex items-center space-x-8">
                            <label className="flex items-center text-indigo-800 text-md font-bold">
                                <input
                                    type="radio"
                                    value="text"
                                    checked={contentType === "text"}
                                    onChange={handleContentTypeChange}
                                    className="mr-2"
                                />
                                Text
                            </label>
                            <label className="flex items-center text-indigo-800 text-md font-bold">
                                <input
                                    type="radio"
                                    value="file"
                                    checked={contentType === "file"}
                                    onChange={handleContentTypeChange}
                                    className="mr-2"
                                />
                                File (HTML)
                            </label>
                        </div>
                    </div>

                    {/* Textarea or File Input */}
                    {contentType === "text" ? (
                        <div>
                            <label className="block 0 text-lg font-bold mb-2 text-indigo-800 ">Email Content</label>
                            <textarea
                                value={emailContent}
                                onChange={handleEmailContentChange}
                                placeholder="Enter your HTML content here"
                                rows="8"
                                className="p-4 border border-indigo-800 rounded-md w-full mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    ) : (
                        <div>
                            <label className="block  text-lg font-medium mb-2">Upload HTML File</label>
                            <input
                                ref={fileInput}
                                type="file"
                                accept="text/html"
                                onChange={handleFileChange}
                                className="p-4 border border-gray-300 rounded-md mt-2 w-full"
                            />
                        </div>
                    )}
                </div>

                {/* Right Side - Preview Container */}
                <div className="p-6 mt-4  bg-gray-50 border border-indigo-800 rounded-lg space-y-4">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Preview</h3>
                    <div
                        className="border p-4 h-full overflow-auto rounded-md bg-white shadow-sm"
                        dangerouslySetInnerHTML={{ __html: htmlPreview }}
                    />
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
                <button
                    type="button"
                    disabled={isSending}
                    onClick={handleSendEmail}
                    className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none transition"
                >
                    Send Email
                </button>
            </div>
        </div>
    );
};

export default EmailTemplateSender;