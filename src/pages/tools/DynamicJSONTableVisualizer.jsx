import React, { useState } from "react";
import ReactJson from "react-json-view";

const DynamicJSONFlowchartVisualizer = () => {
  const [jsonInput, setJsonInput] = useState(""); // Raw JSON input
  const [parsedJson, setParsedJson] = useState(null); // Parsed JSON data
  const [error, setError] = useState(""); // Error message for invalid JSON

  // Handle JSON input change
  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
    setError(""); // Clear error message when input is changed
  };

  // Autosize textarea height based on content
  const handleAutoSize = (e) => {
    e.target.style.height = "auto"; // Reset height before adjusting
    e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scroll height
  };

  // Parse JSON and generate the tree view
  const parseJsonToTree = () => {
    if (!jsonInput.trim()) {
      setError("JSON input is empty. Please provide valid JSON.");
      setParsedJson(null);
      return;
    }

    try {
      const parsedData = JSON.parse(jsonInput.trim());
      setParsedJson(parsedData);
    } catch (err) {
      console.error("Error parsing JSON:", err);
      setError(`Invalid JSON format: ${err.message}`);
      setParsedJson(null);
    }
  };

  return (
    <div className="container mx-auto px-8 py-12 bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-xl rounded-3xl border-t-8 border-indigo-600 w-full">
      <h2 className="text-4xl font-semibold text-indigo-900 mb-12 text-center">
        Visualize Your JSON Structure
      </h2>

      <div className="flex flex-col lg:flex-row justify-between gap-12">

        {/* Input Section */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-lg p-10 transition-transform transform hover:scale-105">
          <label className="block text-xl font-medium text-indigo-800 mb-4">
            Paste your JSON data below
          </label>
          <textarea
            value={jsonInput}
            onChange={handleJsonChange}
            onInput={handleAutoSize} // Call auto resize function on input
            placeholder='{"key1": {...}, "key2": {...}}'
            rows="12"
            className="w-full p-4 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
          />

          {/* Error Message */}
          {error && (
            <div className="mt-4 text-red-600 font-semibold text-lg bg-red-100 p-4 rounded-lg shadow-md">
              {error}
            </div>
          )}

          {/* Parse Button */}
          <div className="text-center mt-8">
            <button
              onClick={parseJsonToTree}
              className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-2xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            >
              Visualize JSON Tree
            </button>
          </div>
        </div>

        {/* JSON Tree View Section */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-lg p-10 mt-8 lg:mt-0 transition-transform transform hover:scale-105">
          {parsedJson ? (
            <div className="border border-indigo-300 rounded-xl p-6 bg-gray-100 shadow-md">
              <ReactJson
                src={parsedJson}
                theme="monokai"
                iconStyle="circle"
                displayDataTypes={false} // Hide data type labels for a cleaner view
                collapsed={2} // Start with 2 levels collapsed by default
              />
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No JSON data to display. Please parse valid JSON.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicJSONFlowchartVisualizer;
