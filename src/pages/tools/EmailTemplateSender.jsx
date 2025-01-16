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

    const handleSendEmail = async () => {
        setIsSending(true);
        if(emails.length === 0) {
            alert("Please enter at least one email address.");
            setIsSending(false);
            return;
        }

        const toEmails = emails.map(email => email.email); // Assuming `emails` is an array of email objects
        const formData = new FormData();
    
        formData.append('toEmails', JSON.stringify(toEmails));
    
        if (contentType === "text") {
            formData.append('htmlContent', emailContent);
        } else if (contentType === "file" && fileInput.current.files[0]) {
            formData.append('file', fileInput.current.files[0]);
        }
    
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/send-email`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setIsSending(false);
            alert(response.data); // Notify the user about the response
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
        <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg border-t-8 border-indigo-600 ">
            <h2 className="text-3xl font-bold text-indigo-900 mb-6 text-center">
                Email Template Sender
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-indigo-50 p-6 rounded-md space-y-6">
                    <div>
                        <label className="block text-indigo-900 text-lg font-bold mb-2">
                            Recipient Emails
                        </label>
                        {emails.map((email, index) => (
                            <div className="flex items-center gap-4 mb-4" key={index}>
                                <input
                                    type="email"
                                    value={email.email}
                                    onChange={(e) => handleEmailChange(index, e.target.value)}
                                    placeholder="Enter email address"
                                    className="flex-grow p-3 border rounded-md focus:ring focus:ring-indigo-300"
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
                            className="text-indigo-800 hover:underline font-medium"
                        >
                            + Add Another Email
                        </button>
                    </div>

                    <div>
                        <label className="block text-indigo-900 text-lg font-bold mb-2">
                            Content Type
                        </label>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="text"
                                    checked={contentType === "text"}
                                    onChange={handleContentTypeChange}
                                    className="mr-2"
                                />
                                Text
                            </label>
                            <label className="flex items-center">
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

                    {contentType === "text" ? (
                        <div>
                            <label className="block text-indigo-900 text-lg font-bold mb-2">
                                Email Content
                            </label>
                            <textarea
                                value={emailContent}
                                onChange={handleEmailContentChange}
                                placeholder="Enter your HTML content here"
                                rows="8"
                                className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-300"
                            />
                        </div>
                    ) : (
                        <div>
                            <label className="block text-indigo-900 text-lg font-bold mb-2">
                                Upload HTML File
                            </label>
                            <input
                                ref={fileInput}
                                type="file"
                                accept="text/html"
                                onChange={handleFileChange}
                                className="w-full p-3 border rounded-md"
                            />
                        </div>
                    )}
                </div>

                <div className="p-6 bg-gray-50 border rounded-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Preview</h3>
                    <div
                        className="border p-4 overflow-auto rounded-md bg-white shadow-sm"
                        dangerouslySetInnerHTML={{ __html: htmlPreview }}
                    />
                </div>
            </div>

            <div className="mt-8 text-center">
                <button
                    type="button"
                    disabled={isSending}
                    onClick={handleSendEmail}
                    className={`px-6 py-3 font-semibold rounded-md focus:outline-none transition-colors ${
                        isSending
                            ? "bg-indigo-300 text-white cursor-not-allowed"
                            : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                >
                    {isSending ? "Sending..." : "Send Email"}
                </button>
            </div>
        </div>
    );
};

export default EmailTemplateSender;