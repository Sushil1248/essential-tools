import React, { useState } from "react";
import axios from "axios";

const PDFConverter = () => {
    const [htmlContent, setHtmlContent] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleInputChange = (e) => {
        setHtmlContent(e.target.value);
    };

    const generatePdf = async () => {
        setIsGenerating(true);
        const formData = new FormData();
        formData.append("htmlContent", htmlContent);

        try {
            const response = await axios.post(
                "http://localhost:3000/convert-html-to-pdf",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    responseType: "arraybuffer", // Binary response for the PDF
                }
            );

            const pdfBlob = new Blob([response.data], { type: "application/pdf" });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, "_blank");
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("An error occurred while generating the PDF.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg max-w-4xl">
            <h2 className="text-2xl font-semibold text-center mb-6">
                HTML to PDF Converter
            </h2>

            <textarea
                value={htmlContent}
                onChange={handleInputChange}
                placeholder="Enter your HTML content here"
                rows="8"
                className="w-full p-4 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
            />

            <button
                type="button"
                onClick={generatePdf}
                disabled={isGenerating}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
            >
                {isGenerating ? "Generating PDF..." : "Generate PDF"}
            </button>
        </div>
    );
};

export default PDFConverter;